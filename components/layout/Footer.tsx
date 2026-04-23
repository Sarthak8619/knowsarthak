const links = [
  { href: 'https://github.com/sarthak8619', label: 'GitHub' },
  { href: 'https://linkedin.com/in/sarthakhingrajiya', label: 'LinkedIn' },
  { href: 'mailto:sarthak.hingrajiya@gmail.com', label: 'Email' },
]

export default function Footer() {
  return (
    <footer className="bg-white border-t-4 border-black">
      <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-3">
        <span className="text-sm font-black text-black tracking-wide">
          © 2026 Sarthak Hingrajiya
        </span>
        <ul className="flex items-center gap-6">
          {links.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                className="text-sm font-black text-black tracking-widest uppercase hover:underline hover:decoration-2"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
