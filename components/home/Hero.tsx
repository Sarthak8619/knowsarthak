import Link from "next/link";

const quickLinks = [
  { label: "Blog", href: "/blog" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Hero() {
  return (
    <section className="py-16 md:py-24">
      {/* Two-column hero */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        {/* Left: text */}
        <div className="flex flex-col gap-6">
          <h1 className="brutal-heading">
            Hello.<br />I&rsquo;m Sarthak.
          </h1>
          <p
            style={{
              fontFamily: "Arial, sans-serif",
              fontWeight: 400,
              fontSize: "1.1rem",
              lineHeight: 1.6,
              maxWidth: "34ch",
            }}
          >
            AI/ML Engineer building intelligent systems, exploring the
            intersection of deep learning, language models, and real-world
            applications.
          </p>
          <Link href="/projects" className="brutal-button text-base w-fit px-6 py-3">
            View Projects
          </Link>
        </div>

        {/* Right: placeholder illustration */}
        <div className="brutal-box w-full aspect-square flex items-center justify-center">
          <svg
            viewBox="0 0 300 300"
            width="70%"
            height="70%"
            fill="none"
            stroke="black"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {/* Monitor body */}
            <rect x="60" y="80" width="180" height="130" rx="6" />
            {/* Screen bezel */}
            <rect x="78" y="95" width="144" height="100" rx="3" />
            {/* Monitor stand */}
            <line x1="150" y1="210" x2="150" y2="240" />
            <line x1="110" y1="240" x2="190" y2="240" />
            {/* Eye circles */}
            <circle cx="120" cy="145" r="18" />
            <circle cx="120" cy="145" r="8" fill="black" stroke="none" />
            <circle cx="180" cy="145" r="18" />
            <circle cx="180" cy="145" r="8" fill="black" stroke="none" />
            {/* Smile */}
            <path d="M 120 175 Q 150 195 180 175" />
            {/* Floating dots */}
            <circle cx="230" cy="55" r="5" fill="black" stroke="none" />
            <circle cx="255" cy="35" r="7" />
            <circle cx="210" cy="30" r="4" fill="black" stroke="none" />
            <circle cx="245" cy="75" r="3" fill="black" stroke="none" />
          </svg>
        </div>
      </div>

      {/* Quick links */}
      <div>
        <h2
          className="brutal-heading mb-6"
          style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
        >
          Quick links
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4">
          {quickLinks.map((link, i) => (
            <Link key={link.href} href={link.href}>
              <div
                className="brutal-box p-5 flex justify-between items-end cursor-pointer transition-colors duration-100 hover:bg-black hover:text-white"
                style={{
                  borderRight: i < quickLinks.length - 1 ? undefined : "3px solid black",
                  marginLeft: i > 0 ? "-3px" : 0,
                }}
              >
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
