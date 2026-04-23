const contacts = [
  {
    label: "Email",
    href: "mailto:sarthak.hingrajiya@gmail.com",
    display: "sarthak.hingrajiya@gmail.com",
    external: false,
  },
  {
    label: "GitHub",
    href: "https://github.com/sarthak8619",
    display: "github.com/sarthak8619",
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/sarthak-hingrajiya-24bb1724a",
    display: "linkedin.com/in/sarthak-hingrajiya-24bb1724a",
    external: true,
  },
];

export default function ContactPage() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16 md:py-24">
      <h1 className="brutal-heading mb-12">Contact</h1>
      <div className="flex flex-col">
        {contacts.map(({ label, href, display, external }, i) => (
          <a
            key={label}
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noreferrer" : undefined}
            className={`flex items-center gap-8 border-[3px] border-black bg-white p-6 hover:bg-black hover:text-white transition-colors duration-100${i > 0 ? " border-t-0" : ""}`}
          >
            <span
              className="min-w-[7rem]"
              style={{ fontFamily: '"Arial Black", Arial, sans-serif', fontWeight: 900 }}
            >
              {label}
            </span>
            <span style={{ fontFamily: "Arial, sans-serif", fontWeight: 400 }}>
              {display}
            </span>
            {external && (
              <span className="ml-auto" aria-hidden="true">
                ↗
              </span>
            )}
          </a>
        ))}
      </div>
    </section>
  );
}
