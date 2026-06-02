export function PageHero({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return <section className="page-hero"><small>{eyebrow}</small><h1>{title}</h1><p>{copy}</p></section>;
}
