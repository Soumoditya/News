import { notFound } from "next/navigation";
import politicians from "@/data/politicians.json";
import PoliticianDetailClient from "./PoliticianDetailClient";

export function generateStaticParams() {
  return politicians.map((p) => ({ slug: p.slug }));
}

export default function PoliticianPage({ params }: { params: { slug: string } }) {
  const p = politicians.find((x) => x.slug === params.slug);
  if (!p) notFound();
  return <PoliticianDetailClient p={p as any} />;
}
