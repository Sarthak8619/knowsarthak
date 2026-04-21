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
            ? 'text-sm font-black tracking-widest uppercase text-black border-b-2 border-black pb-0.5'
            : 'text-sm font-black tracking-widest uppercase text-black hover:underline hover:decoration-2'
        }
      >
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
    <nav className="sticky top-0 z-50 bg-white border-b-4 border-black">
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between h-14">
        <Link href="/" className="shrink-0">
          <span className="text-2xl font-black text-black">
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
          className="md:hidden text-xl font-black text-black hover:underline"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t-2 border-black px-6 py-4">
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
