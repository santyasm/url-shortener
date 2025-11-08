import { useState } from "react";
import { api } from "../api";

type CreateResp = {
  slug: string;
  shortUrl: string;
  destination: string;
  expiresAt?: string;
  maxClicks?: number;
};

export default function CreateForm({
  onCreated,
}: {
  onCreated: (r: CreateResp) => void;
}) {
  const [destination, setDestination] = useState("");
  const [slug, setSlug] = useState("");
  const [expiresAt, setExpiresAt] = useState<string>("");
  const [maxClicks, setMaxClicks] = useState<number | "">("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const body: Record<string, any> = { destination };
    if (slug) body.slug = slug;
    if (expiresAt) body.expiresAt = new Date(expiresAt).toISOString();
    if (maxClicks) body.maxClicks = Number(maxClicks);

    try {
      const r = await api.post("api/links", { json: body }).json<CreateResp>();
      onCreated(r);
      setDestination("");
      setSlug("");
      setExpiresAt("");
      setMaxClicks("");
    } catch (err: any) {
      alert("Error creating: " + (err.message || "unknown"));
    }
  }

  return (
    <form onSubmit={submit} className="form">
      <input
        placeholder="https://example.com"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        required
      />
      <input
        placeholder="custom slug (optional)"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
      />
      <div className="row">
        <label>Expires at</label>
        <input
          type="datetime-local"
          value={expiresAt}
          onChange={(e) => setExpiresAt(e.target.value)}
        />
      </div>
      <div className="row">
        <label>Max clicks</label>
        <input
          type="number"
          min={1}
          value={maxClicks}
          onChange={(e) =>
            setMaxClicks(e.target.value === "" ? "" : Number(e.target.value))
          }
        />
      </div>
      <button type="submit">Shorten</button>
    </form>
  );
}
