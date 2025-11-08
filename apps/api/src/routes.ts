import { Hono } from "hono";
import { z } from "zod";
import { prisma } from "./db";
import { nanoid, isValidUrl } from "./utils";
import QRCode from "qrcode";

const app = new Hono();

app.get("/", (c) => c.text("Url Shortener API"));
app.get("/health", (c) => c.json({ ok: true }));

const createSchema = z.object({
  destination: z.string().min(1),
  slug: z
    .string()
    .min(3)
    .max(32)
    .regex(/^[a-zA-Z0-9-_]+$/)
    .optional(),
  expiresAt: z.string().datetime().optional(),
  maxClicks: z.number().int().positive().optional(),
});

app.post("/api/links", async (c) => {
  const body = await c.req.json().catch(() => ({}));
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: parsed.error.flatten() }, 400);

  const { destination, slug, expiresAt, maxClicks } = parsed.data;

  if (!isValidUrl(destination)) {
    return c.json({ error: "Invalid destination URL" }, 400);
  }

  // slug
  let finalSlug = slug;
  if (!finalSlug) finalSlug = nanoid();

  if (slug) {
    const allowCustom = (Bun.env.ALLOW_CUSTOM_SLUGS ?? "true") === "true";
    if (!allowCustom) return c.json({ error: "Custom slugs disabled" }, 403);
  }

  // garantir unicidade
  const exists = await prisma.link.findUnique({ where: { slug: finalSlug } });
  if (exists) return c.json({ error: "Slug already in use" }, 409);

  const link = await prisma.link.create({
    data: {
      slug: finalSlug,
      destination,
      expiresAt: expiresAt ? new Date(expiresAt) : null,
      maxClicks: maxClicks ?? null,
    },
  });

  const base = Bun.env.BASE_URL!;
  return c.json({
    id: link.id,
    slug: link.slug,
    shortUrl: `${base}/${link.slug}`,
    destination: link.destination,
    expiresAt: link.expiresAt,
    maxClicks: link.maxClicks,
  });
});

// obter links
app.get("/api/links/:slug", async (c) => {
  const { slug } = c.req.param();
  const link = await prisma.link.findUnique({ where: { slug } });
  if (!link) return c.json({ error: "Not found" }, 404);
  return c.json(link);
});

// listar últimos (para o dashboard simples)
app.get("/api/links", async (c) => {
  const links = await prisma.link.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
  });
  return c.json(links);
});

// QR Code
app.get("/api/links/:slug/qr", async (c) => {
  const { slug } = c.req.param();
  const link = await prisma.link.findUnique({ where: { slug } });
  if (!link) return c.json({ error: "Not found" }, 404);

  const url = `${Bun.env.BASE_URL}/${slug}`;
  const svg = await QRCode.toString(url, { type: "svg", margin: 0 });
  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=86400",
    },
  });
});

// redirecionamento
app.get("/:slug", async (c) => {
  const { slug } = c.req.param();

  const link = await prisma.link.findUnique({ where: { slug } });
  if (!link) return c.text("Not found", 404);

  // expiração
  if (link.expiresAt && link.expiresAt.getTime() <= Date.now()) {
    return c.text("Link expired", 410);
  }
  // limite de cliques
  if (link.maxClicks && link.clickCount >= link.maxClicks) {
    return c.text("Click limit reached", 410);
  }

  // analytics
  await prisma.link.update({
    where: { id: link.id },
    data: { clickCount: { increment: 1 }, lastAccessAt: new Date() },
  });

  return c.redirect(link.destination, 302);
});

export default app;
