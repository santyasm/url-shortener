import CopyButton from "./CopyButton";

type Link = {
  id: string;
  slug: string;
  destination: string;
  createdAt: string;
  clickCount: number;
  expiresAt?: string;
  lastAccessAt?: string;
};

export default function UrlList({
  items,
  baseUrl,
}: {
  items: Link[];
  baseUrl: string;
}) {
  return (
    <div className="list">
      {items.map((l) => {
        const shortUrl = `${baseUrl}/${l.slug}`;
        return (
          <div key={l.id} className="card">
            <div className="row">
              <strong>{shortUrl}</strong>
              <CopyButton text={shortUrl} />
            </div>
            <div className="dest">
              ↪{" "}
              <a href={l.destination} target="_blank">
                {l.destination}
              </a>
            </div>
            <div className="meta">
              clicks: {l.clickCount} • created:{" "}
              {new Date(l.createdAt).toLocaleString()}
              {l.expiresAt
                ? ` • expires: ${new Date(l.expiresAt).toLocaleString()}`
                : ""}
            </div>
            <div className="row">
              <a href={`${baseUrl}/api/links/${l.slug}/qr`} target="_blank">
                QR
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}
