'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const links = [
  { href: '/',         label: 'Home'     },
  { href: '/projects', label: 'Projects' },
  { href: '/blog',     label: 'Blog'     },
  { href: '/contact',  label: 'Contact'  },
]

function NavLink({
  href,
  label,
  active,
  onClick,
}: {
  href: string
  label: string
  active: boolean
  onClick?: () => void
}) {
  return (
    <li>
      <Link
        href={href}
        onClick={onClick}
        className={
          active
            ? 'font-mono text-sm tracking-widest uppercase text-neon-green text-glow-green border-b border-neon-green pb-0.5'
            : 'font-mono text-sm tracking-widest uppercase text-phosphor hover:text-neon-cyan hover:text-glow-cyan transition-all duration-150'
        }
      >
        {active && <span className="mr-1 text-neon-green">{'>'}</span>}
        {label}
      </Link>
    </li>
  )
}

export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <nav className="sticky top-0 z-50 bg-terminal-dark border-b border-phosphor-dim">
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between h-14">
        <Link href="/" className="shrink-0">
          <span className="font-display text-2xl text-neon-green text-glow-green">
            ~/portfolio
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              active={isActive(link.href)}
            />
          ))}
        </ul>

        <button
          className="md:hidden font-mono text-xl text-neon-cyan hover:text-glow-cyan transition-all"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-terminal-panel border-b border-phosphor-dim px-6 py-4">
          <ul className="flex flex-col gap-4">
            {links.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                label={link.label}
                active={isActive(link.href)}
                onClick={() => setMenuOpen(false)}
              />
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}
