import Link from "next/link";

const quickLinks = [
  { label: "Blog",     href: "/blog"     },
  { label: "Projects", href: "/projects" },
  { label: "About",    href: "/about"    },
  { label: "Contact",  href: "/contact"  },
];

function cellClasses(i: number) {
  const base =
    "p-6 flex justify-between items-end cursor-pointer transition-colors duration-100 hover:bg-black hover:text-white";
  const mobileBottom  = i < 3              ? "border-b-[3px] border-b-black"              : "";
  const desktopBottom = i >= 2             ? "md:border-b-0"                              : "";
  const desktopRight  = i % 2 === 0        ? "md:border-r-[3px] md:border-r-black"        : "";
  return [base, mobileBottom, desktopBottom, desktopRight].filter(Boolean).join(" ");
}

export default function QuickLinks() {
  return (
    <section className="pb-16 md:pb-24">
      <h2
        className="brutal-heading mb-6"
        style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
      >
        Quick links
      </h2>

      <div style={{ border: "3px solid black" }}>
        <div className="grid grid-cols-1 md:grid-cols-2">
          {quickLinks.map((link, i) => (
            <Link key={link.href} href={link.href}>
              <div className={cellClasses(i)}>
                <span
                  style={{
                    fontFamily: '"Arial Black", Arial, sans-serif',
                    fontWeight: 900,
                    fontSize: "1rem",
                  }}
                >
                  {link.label}
                </span>
                <span style={{ fontSize: "1.25rem", lineHeight: 1 }}>↗</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
