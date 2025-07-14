import useScrollSpy from "@/lib/hooks/useScrollSpy";

const sectionIds = [
  "before-after",
  "documents",
  "audio-video",
  "corporate-videos",
  "creative-videos",
  "images",
];

export default function Nav() {
  const active = useScrollSpy(sectionIds);

  return (
    <nav>
      {sectionIds.map((id) => (
        <Link
          key={id}
          href={`#${id}`}
          className={active === id ? "text-primary font-bold" : ""}
        >
          {id.replace(/-/g, " ")}
        </Link>
      ))}
    </nav>
  );
}
