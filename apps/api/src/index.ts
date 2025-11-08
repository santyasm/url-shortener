import "dotenv/config";
import { Hono } from "hono";
import appRoutes from "./routes";
import { cors } from "hono/cors";

const app = new Hono();

app.use(
  "*",
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5171",
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  })
);

app.route("/", appRoutes);

const port = Number(process.env.PORT || 8787);

export default {
  port,
  fetch: app.fetch,
};

console.log(`API up on http://localhost:${port}`);
