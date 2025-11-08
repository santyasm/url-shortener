import { useEffect, useState } from "react";
import { api } from "./api";
import CreateForm from "./components/CreateForm";
import UrlList from "./components/UrlList";

type Link = {
  id: string;
  slug: string;
  destination: string;
  createdAt: string;
  clickCount: number;
  expiresAt?: string;
  lastAccessAt?: string;
};

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8787";

export default function App() {
  const [items, setItems] = useState<Link[]>([]);

  async function load() {
    const list = await api.get("api/links").json<Link[]>();
    setItems(list);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="container">
      <div className="header">
        <img src="/logo.png" alt="" className="logo" />
        <h1>URL Shortener</h1>
      </div>
      <CreateForm onCreated={() => load()} />
      <UrlList items={items} baseUrl={API_BASE} />
    </div>
  );
}
