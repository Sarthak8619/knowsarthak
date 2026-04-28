'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

interface Repo {
  name: string
  description: string | null
  stargazers_count: number
  html_url: string
  language: string | null
}

interface Post {
  slug: string
  title: string
  date: string
}

interface Props {
  repos: Repo[]
  posts: Post[]
}

// ── Update with your real experience ────────────────
const EXPERIENCE = [
  {
    role: 'AI/ML Engineer Intern',
    company: 'TechStartup',
    period: 'Jan 2026 – Present',
    desc: 'Built LLM-powered pipelines for document understanding and semantic search. Reduced inference latency 40% via model quantisation and batching.',
    dir: 'from-left',
    delay: 'd1',
  },
  {
    role: 'Research Assistant',
    company: 'University AI Lab',
    period: 'Aug – Dec 2025',
    desc: 'Fine-tuned vision-language models on medical imaging datasets. Published findings at internal research symposium.',
    dir: 'from-right',
    delay: 'd2',
  },
  {
    role: 'Software Dev Intern',
    company: 'SaaS Co.',
    period: 'May – Jul 2025',
    desc: 'Shipped REST APIs with FastAPI, integrated LLM APIs, and built a React analytics dashboard.',
    dir: 'from-left',
    delay: 'd3',
  },
]

const SKILL_GROUPS = [
  {
    label: 'Languages',
    delay: 'd1',
    skills: [{ name: 'Python', pct: 95 }, { name: 'TypeScript', pct: 80 }, { name: 'SQL', pct: 75 }],
  },
  {
    label: 'ML / AI',
    delay: 'd2',
    skills: [{ name: 'PyTorch', pct: 90 }, { name: 'HuggingFace', pct: 85 }, { name: 'LangChain', pct: 82 }],
  },
  {
    label: 'Backend',
    delay: 'd3',
    skills: [{ name: 'FastAPI', pct: 80 }, { name: 'Docker', pct: 75 }, { name: 'PostgreSQL', pct: 68 }],
  },
  {
    label: 'Frontend',
    delay: 'd4',
    skills: [{ name: 'React', pct: 78 }, { name: 'Next.js', pct: 75 }, { name: 'Tailwind', pct: 80 }],
  },
]

const TAGLINE_PHRASES = [
  'i_like_to_build.py',
  "When I'm not coding, I'm reading",
  'Coffee addiction is real',
  'pushing to main at 2am',
  'pip install everything',
]

// Fonts via CSS variables (set on <html> by layout.tsx)
const F_DISPLAY = 'var(--font-display), sans-serif'
const F_BODY    = 'var(--font-body), sans-serif'
const F_MONO    = 'var(--font-mono), monospace'

export default function PortfolioPage({ repos, posts }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    document.documentElement.style.height = '100%'
    document.body.style.height = '100%'

    const wrap = wrapRef.current
    if (!wrap) return

    // ─── Neural Globe with Heartbeat ────────────────────────────
    const canvas = document.getElementById('neural-canvas') as HTMLCanvasElement | null
    let rafId = 0
    const cleanupGlobe = (() => {
      if (!canvas) return () => {}
      const ctx = canvas.getContext('2d')!
      let W = 0, H = 0, R = 0
      const N = 80
      let rotY = 0
      const ROT_SPEED = 0.0028

      type GlobeNode = { phi: number; theta: number; pulse: number }
      let nodes: GlobeNode[] = []

      // Heartbeat state
      type Beat = { r: number; a: number }
      const beats: Beat[] = []
      let lastBeatTs = 0
      const BEAT_INTERVAL = 1450  // ms between heartbeats

      function build() {
        nodes = Array.from({ length: N }, (_, i) => ({
          phi: Math.acos(1 - 2 * (i + 0.5) / N),
          theta: Math.PI * (1 + Math.sqrt(5)) * i,
          pulse: Math.random() * Math.PI * 2,
        }))
      }

      function project(x3: number, y3: number, z3: number) {
        const TILT = 0.35
        const cosT = Math.cos(TILT), sinT = Math.sin(TILT)
        const y3t = y3 * cosT - z3 * sinT
        const z3t = y3 * sinT + z3 * cosT
        const fov = 900
        const scale = fov / (fov + z3t + R)
        return {
          sx: W / 2 + x3 * scale,
          sy: H / 2 + y3t * scale,
          depth: z3t,
          alpha: Math.max(0, (z3t + R) / (R * 2.2)),
        }
      }

      function draw(ts: number) {
        ctx.clearRect(0, 0, W, H)
        rotY += ROT_SPEED

        // ── Heartbeat pulse waves ──────────────────────────────
        if (ts - lastBeatTs > BEAT_INTERVAL) {
          beats.push({ r: R * 0.25, a: 0.32 })
          // lub-dub second beat
          setTimeout(() => {
            beats.push({ r: R * 0.25, a: 0.22 })
          }, 190)
          lastBeatTs = ts
        }

        const diagonal = Math.hypot(W, H) / 2 + 20
        for (let i = beats.length - 1; i >= 0; i--) {
          const b = beats[i]
          b.r += 2.8
          b.a *= 0.978
          if (b.a < 0.004 || b.r > diagonal) {
            beats.splice(i, 1)
            continue
          }
          ctx.beginPath()
          ctx.arc(W / 2, H / 2, b.r, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(170,170,170,${b.a})`
          ctx.lineWidth = 1.2
          ctx.stroke()
        }

        // ── Globe nodes & connections ──────────────────────────
        const pts = nodes.map(n => {
          n.pulse += 0.026
          const x3 = R * Math.sin(n.phi) * Math.cos(n.theta + rotY)
          const z3 = R * Math.sin(n.phi) * Math.sin(n.theta + rotY)
          const y3 = R * Math.cos(n.phi)
          return { ...project(x3, y3, z3), pulse: n.pulse }
        })

        const order = pts.map((_, i) => i).sort((a, b) => pts[a].depth - pts[b].depth)

        // Connections
        for (let ii = 0; ii < N; ii++) {
          const i = order[ii]
          if (pts[i].depth < -R * 0.15) continue
          for (let jj = ii + 1; jj < N; jj++) {
            const j = order[jj]
            if (pts[j].depth < -R * 0.15) continue
            const dx = pts[i].sx - pts[j].sx
            const dy = pts[i].sy - pts[j].sy
            const dist = Math.sqrt(dx * dx + dy * dy)
            const maxDist = R * 0.56
            if (dist < maxDist) {
              const dA = Math.min(pts[i].alpha, pts[j].alpha)
              const distA = 1 - dist / maxDist
              const a = dA * distA * 0.52
              ctx.beginPath()
              ctx.strokeStyle = `rgba(150,150,150,${a})`
              ctx.lineWidth = 0.8 + dA * 0.5
              ctx.moveTo(pts[i].sx, pts[i].sy)
              ctx.lineTo(pts[j].sx, pts[j].sy)
              ctx.stroke()
            }
          }
        }

        // Nodes — soft grey dots
        order.forEach(i => {
          const p = pts[i]
          if (p.depth < -R * 0.15) return
          const r = (1.6 + Math.sin(p.pulse) * 0.5) * (0.4 + p.alpha * 0.8)
          // Glow
          ctx.beginPath()
          ctx.arc(p.sx, p.sy, r * 2.5, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(160,160,160,${p.alpha * 0.04})`
          ctx.fill()
          // Core
          ctx.beginPath()
          ctx.arc(p.sx, p.sy, r, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(140,140,140,${p.alpha * 0.90})`
          ctx.fill()
        })

        // Soft fade in the center to keep text zone clean
        const vg = ctx.createRadialGradient(W / 2, H / 2, R * 0.18, W / 2, H / 2, R * 0.72)
        vg.addColorStop(0, 'rgba(255,255,255,0.62)')
        vg.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.fillStyle = vg
        ctx.fillRect(0, 0, W, H)

        rafId = requestAnimationFrame(draw)
      }

      function resize() {
        W = canvas!.width = canvas!.offsetWidth
        H = canvas!.height = canvas!.offsetHeight
        R = Math.min(W, H) * 0.44
        build()
      }

      resize()
      rafId = requestAnimationFrame(draw)
      window.addEventListener('resize', resize)
      return () => window.removeEventListener('resize', resize)
    })()

    // ── Tagline rotation ─────────────────────────────────────
    const taglineEl = document.getElementById('tagline-text')
    let tagIdx = 0
    const tagInterval = setInterval(() => {
      if (!taglineEl) return
      taglineEl.classList.add('swap')
      setTimeout(() => {
        tagIdx = (tagIdx + 1) % TAGLINE_PHRASES.length
        taglineEl.textContent = TAGLINE_PHRASES[tagIdx]
        taglineEl.classList.remove('swap')
      }, 320)
    }, 3200)

    // ── Landing text entrance ────────────────────────────────
    const landing = document.getElementById('landing')
    const landEntries = [
      { sel: '.land-pre',  delay: 180  },
      { sel: '.land-h1',   delay: 380  },
      { sel: '.land-desc', delay: 560  },
      { sel: '.land-tag',  delay: 740  },
      { sel: '.land-hint', delay: 920  },
    ]
    const landTimeouts: ReturnType<typeof setTimeout>[] = []
    if (landing) {
      landEntries.forEach(({ sel }) => {
        const el = landing.querySelector(sel) as HTMLElement | null
        if (!el) return
        el.style.opacity = '0'
        el.style.transform = 'translateY(28px)'
      })
      landEntries.forEach(({ sel, delay }) => {
        const t = setTimeout(() => {
          const el = landing?.querySelector(sel) as HTMLElement | null
          if (!el) return
          el.style.transition = 'opacity .7s cubic-bezier(.22,1,.36,1), transform .7s cubic-bezier(.22,1,.36,1)'
          el.style.opacity = '1'
          el.style.transform = 'none'
        }, delay)
        landTimeouts.push(t)
      })
    }

    // ── Combined scroll handler ──────────────────────────────
    let lastY = 0
    let dir = 'down'
    let curIdx = 0
    const sections = [...document.querySelectorAll<HTMLElement>('.section')]
    const IDS = sections.map(s => s.id)
    const navbar = document.getElementById('navbar')

    function onScroll() {
      const t = wrap!.scrollTop
      const H = wrap!.clientHeight

      // Landing fade-out on scroll
      if (landing) {
        const fade = Math.max(1 - (t / H) * 2.2, 0)
        landing.style.opacity = String(fade)
      }

      // Navbar fades in as user leaves landing section
      if (navbar) {
        // starts fading in at 8% scroll, fully visible at 35%
        const p = Math.max(0, Math.min((t / H - 0.08) / 0.27, 1))
        navbar.style.opacity = String(p)
        navbar.style.pointerEvents = p > 0.15 ? 'auto' : 'none'
      }

      // Scroll direction
      dir = t >= lastY ? 'down' : 'up'
      lastY = t

      // Active section index for keyboard nav
      const mid = t + H / 2
      sections.forEach((s, i) => { if (s.offsetTop <= mid) curIdx = i })
    }
    wrap.addEventListener('scroll', onScroll, { passive: true })
    // Run once on mount to set initial state
    onScroll()

    // ── scrollToSection ──────────────────────────────────────
    function scrollToSection(id: string) {
      const el = document.getElementById(id)
      if (el) wrap!.scrollTop = el.offsetTop
    }
    ;(window as any).__scrollToSection = scrollToSection

    // ── setActive ────────────────────────────────────────────
    function setActive(id: string) {
      document.querySelectorAll('.nav-item').forEach(el =>
        el.classList.toggle('active', (el as HTMLElement).dataset.nav === id)
      )
      document.querySelectorAll('.dot').forEach(el =>
        el.classList.toggle('active', (el as HTMLElement).dataset.dot === id)
      )
    }

    // ── IntersectionObserver ─────────────────────────────────
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        const s = e.target as HTMLElement
        if (e.isIntersecting) {
          s.classList.toggle('dir-up', dir === 'up')
          s.classList.toggle('dir-down', dir === 'down')
          s.classList.add('visible')
          setActive(s.id)
          s.querySelectorAll<HTMLElement>('.bar-fill').forEach(b => {
            b.style.width = (b.dataset.pct ?? '0') + '%'
          })
        } else {
          s.classList.remove('visible', 'dir-up', 'dir-down')
          s.querySelectorAll<HTMLElement>('.bar-fill').forEach(b => {
            b.style.transitionDuration = '0s'
            b.style.width = '0%'
            requestAnimationFrame(() => { b.style.transitionDuration = '' })
          })
        }
      })
    }, { root: wrap, threshold: 0.4 })

    sections.forEach(s => obs.observe(s))

    // ── Keyboard navigation ──────────────────────────────────
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'ArrowDown' && curIdx < IDS.length - 1) scrollToSection(IDS[++curIdx])
      if (e.key === 'ArrowUp' && curIdx > 0) scrollToSection(IDS[--curIdx])
    }
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.height = ''
      document.body.style.height = ''
      cancelAnimationFrame(rafId)
      cleanupGlobe()
      clearInterval(tagInterval)
      landTimeouts.forEach(clearTimeout)
      wrap.removeEventListener('scroll', onScroll)
      document.removeEventListener('keydown', onKeyDown)
      obs.disconnect()
      delete (window as any).__scrollToSection
    }
  }, [])

  const nav = (id: string) => () => {
    ;(window as any).__scrollToSection?.(id)
  }

  return (
    <>
      {/* ── NAVBAR (hidden on landing, fades in on scroll) ──── */}
      <nav id="navbar">
        <span className="logo" onClick={nav('hero')}>~/portfolio</span>
        <ul className="nav-links">
          <li className="nav-item active" data-nav="hero"       onClick={nav('hero')}>Home</li>
          <li className="nav-item"        data-nav="experience" onClick={nav('experience')}>Experience</li>
          <li className="nav-item"        data-nav="projects"   onClick={nav('projects')}>Projects</li>
          <li className="nav-item"        data-nav="skills"     onClick={nav('skills')}>Skills</li>
          <li className="nav-item"        data-nav="blog"       onClick={nav('blog')}>Blog</li>
        </ul>
      </nav>

      {/* ── DOT NAV ─────────────────────────────────────────── */}
      <div id="dot-nav">
        <div className="dot active" data-dot="landing"    onClick={nav('landing')}    title="Intro"></div>
        <div className="dot"        data-dot="hero"       onClick={nav('hero')}       title="Home"></div>
        <div className="dot"        data-dot="experience" onClick={nav('experience')} title="Experience"></div>
        <div className="dot"        data-dot="projects"   onClick={nav('projects')}   title="Projects"></div>
        <div className="dot"        data-dot="skills"     onClick={nav('skills')}     title="Skills"></div>
        <div className="dot"        data-dot="blog"       onClick={nav('blog')}       title="Blog"></div>
      </div>

      {/* ── SCROLL CONTAINER ────────────────────────────────── */}
      <div id="scroll-wrap" ref={wrapRef}>

        {/* 00 LANDING — full viewport, no navbar gap */}
        <section className="section" id="landing">
          <canvas id="neural-canvas"></canvas>

          <div className="land-inner">
            <div className="land-pre" style={{
              fontFamily: F_BODY,
              fontSize: '0.68rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: '#666',
              fontWeight: 600,
            }}>
              Welcome to my portfolio
            </div>

            <h1 className="land-h1" style={{
              fontFamily: F_DISPLAY,
              fontWeight: 700,
              fontSize: 'clamp(3.2rem, 7vw, 6rem)',
              lineHeight: 1,
              letterSpacing: '0.02em',
              color: '#0a0a0a',
            }}>
              Hola, I am Sarthak
            </h1>

            <p className="land-desc" style={{
              fontFamily: F_BODY,
              fontSize: '1rem',
              lineHeight: 1.75,
              maxWidth: '42ch',
              color: '#444',
              fontWeight: 400,
            }}>
              AI/ML Engineer building intelligent systems —<br />
              deep learning, language models, and real-world applications.
            </p>

            <div className="land-tag">
              <div className="tagline-wrap">
                <span className="tag-prefix">&gt;_</span>
                <span id="tagline-text">i_like_to_build.py</span>
              </div>
            </div>

            <div className="land-hint land-scroll-hint" style={{ marginTop: '0.25rem' }}>
              <span style={{ fontFamily: F_BODY, fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#888', fontWeight: 500 }}>
                scroll to explore
              </span>
              <span style={{ fontSize: '0.85rem', color: '#888' }}>↓</span>
            </div>
          </div>
        </section>

        {/* 01 HERO */}
        <section className="section visible" id="hero" style={{ paddingTop: '56px' }}>
          <span className="ghost">01</span>
          <div className="inner">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem' }}>
                <h1 style={{ fontFamily: F_DISPLAY, fontWeight: 700, fontSize: 'clamp(2.8rem,5vw,4.5rem)', lineHeight: 1.05, letterSpacing: '0.01em' }}>
                  <span className="from-left d0" style={{ display: 'block', color: '#0a0a0a' }}>Hello.</span>
                  <span className="from-left d1" style={{ display: 'block', color: '#0a0a0a' }}>I&apos;m Sarthak.</span>
                </h1>
                <p className="from-up d2" style={{ fontFamily: F_BODY, fontSize: '0.97rem', lineHeight: 1.8, maxWidth: '38ch', color: '#555', fontWeight: 400 }}>
                  AI/ML Engineer building intelligent systems — deep learning,
                  language models, and real-world applications.
                </p>
                <div className="from-up d3">
                  <button className="btn" onClick={nav('projects')}>View Projects ↓</button>
                </div>
              </div>

              <div className="from-right d1" style={{ border: '2.5px solid #111', background: '#fafafa', aspectRatio: '1/1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg viewBox="0 0 300 300" width="65%" height="65%"
                  fill="none" stroke="#222" strokeWidth="2.5"
                  strokeLinecap="round" strokeLinejoin="round">
                  <rect x="60" y="80" width="180" height="130" rx="6"/>
                  <rect x="78" y="95" width="144" height="100" rx="3"/>
                  <line x1="150" y1="210" x2="150" y2="240"/>
                  <line x1="110" y1="240" x2="190" y2="240"/>
                  <circle cx="120" cy="145" r="18"/>
                  <circle className="eye-l" cx="120" cy="145" r="9" fill="#222" stroke="none"/>
                  <circle cx="180" cy="145" r="18"/>
                  <circle className="eye-r" cx="180" cy="145" r="9" fill="#222" stroke="none"/>
                  <path d="M 120 175 Q 150 196 180 175"/>
                  <g className="da"><circle cx="228" cy="57" r="5" fill="#222" stroke="none"/></g>
                  <g className="db"><circle cx="254" cy="36" r="7"/></g>
                  <g className="dc"><circle cx="209" cy="31" r="4" fill="#222" stroke="none"/></g>
                  <g className="dd"><circle cx="244" cy="73" r="3" fill="#222" stroke="none"/></g>
                </svg>
              </div>
            </div>
          </div>

          <div className="scroll-hint from-up d5" style={{ position: 'absolute', bottom: '24px', left: '50%', textAlign: 'center' }}>
            <div style={{ fontFamily: F_BODY, fontSize: '0.58rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#ccc', marginBottom: '5px', fontWeight: 500 }}>scroll</div>
            <div style={{ color: '#ccc', fontSize: '0.9rem' }}>↓</div>
          </div>
        </section>

        {/* 02 EXPERIENCE */}
        <section className="section" id="experience" style={{ paddingTop: '56px' }}>
          <span className="ghost">02</span>
          <div className="inner">
            <h2 className="from-left d0" style={{
              fontFamily: F_DISPLAY,
              fontWeight: 700,
              fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
              lineHeight: 1,
              letterSpacing: '0.02em',
              color: '#0a0a0a',
              marginBottom: '2.5rem',
            }}>
              Experience
            </h2>

            <div style={{ display: 'flex', gap: '2.5rem' }}>
              {/* Timeline spine */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '4px', flexShrink: 0 }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#111', flexShrink: 0 }}></div>
                <div className="tl-spine"></div>
              </div>

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2.2rem' }}>
                {EXPERIENCE.map((exp, i) => (
                  <div key={i} className={`${exp.dir} ${exp.delay}`}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.4rem' }}>
                      <span style={{ fontFamily: F_DISPLAY, fontWeight: 700, fontSize: '1.25rem', letterSpacing: '0.02em', color: '#111' }}>
                        {exp.role}
                      </span>
                      <span style={{ fontFamily: F_BODY, fontWeight: 600, fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', background: '#111', color: '#fff', padding: '3px 9px' }}>
                        {exp.company}
                      </span>
                      <span style={{ fontFamily: F_BODY, fontSize: '0.82rem', color: '#999', marginLeft: 'auto', fontWeight: 400 }}>
                        {exp.period}
                      </span>
                    </div>
                    <p style={{ fontFamily: F_BODY, fontSize: '0.91rem', lineHeight: 1.75, color: '#555', maxWidth: '60ch', fontWeight: 400 }}>
                      {exp.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 03 PROJECTS */}
        <section className="section" id="projects" style={{ paddingTop: '56px' }}>
          <span className="ghost">03</span>
          <div className="inner">
            <h2 className="from-left d0" style={{
              fontFamily: F_DISPLAY,
              fontWeight: 700,
              fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
              lineHeight: 1,
              letterSpacing: '0.02em',
              color: '#0a0a0a',
              marginBottom: '2rem',
            }}>
              Projects
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
              {repos.length > 0 ? repos.map((repo, i) => {
                const delays = ['d1','d2','d3','d4','d5','d6']
                return (
                  <a key={repo.name} href={repo.html_url} target="_blank" rel="noopener noreferrer"
                    className={`card from-up ${delays[i] ?? 'd1'}`}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                      <h3 style={{ fontFamily: F_DISPLAY, fontWeight: 700, fontSize: '1.05rem', letterSpacing: '0.02em', lineHeight: 1.2 }}>
                        {repo.name}
                      </h3>
                      <span style={{ fontSize: '0.9rem', flexShrink: 0, opacity: 0.6 }}>↗</span>
                    </div>
                    <p style={{ fontFamily: F_BODY, fontSize: '0.82rem', lineHeight: 1.65, flex: 1, color: '#555', fontWeight: 400 }}>
                      {repo.description ?? 'View on GitHub'}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="lang">{repo.language ?? '—'}</span>
                      <span style={{ fontFamily: F_BODY, fontSize: '0.75rem', color: '#999', fontWeight: 500 }}>★ {repo.stargazers_count}</span>
                    </div>
                  </a>
                )
              }) : (
                ['Promptly', 'AI-video-category-classifier', 'contentdawg', 'skill-roadmap-generator', 'Customer-Churn-Prediction-E2E'].map((name, i) => {
                  const delays = ['d1','d2','d3','d4','d5']
                  return (
                    <div key={name} className={`card from-up ${delays[i]}`}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                        <h3 style={{ fontFamily: F_DISPLAY, fontWeight: 700, fontSize: '1.05rem', letterSpacing: '0.02em', lineHeight: 1.2 }}>
                          {name}
                        </h3>
                        <span style={{ fontSize: '0.9rem', flexShrink: 0, opacity: 0.6 }}>↗</span>
                      </div>
                      <p style={{ fontFamily: F_BODY, fontSize: '0.82rem', lineHeight: 1.65, flex: 1, color: '#555', fontWeight: 400 }}>
                        View on GitHub
                      </p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span className="lang">Python</span>
                        <span style={{ fontFamily: F_BODY, fontSize: '0.75rem', color: '#999', fontWeight: 500 }}>★ —</span>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        </section>

        {/* 04 SKILLS */}
        <section className="section" id="skills" style={{ paddingTop: '56px' }}>
          <span className="ghost">04</span>
          <div className="inner">
            <h2 className="from-left d0" style={{
              fontFamily: F_DISPLAY,
              fontWeight: 700,
              fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
              lineHeight: 1,
              letterSpacing: '0.02em',
              color: '#0a0a0a',
              marginBottom: '2.5rem',
            }}>
              Skills
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.2rem 6rem' }}>
              {SKILL_GROUPS.map(group => (
                <div key={group.label} className={`from-up ${group.delay}`}>
                  <div style={{ fontFamily: F_BODY, fontWeight: 600, fontSize: '0.65rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#aaa', marginBottom: '1rem' }}>
                    {group.label}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    {group.skills.map(skill => (
                      <div key={skill.name} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span style={{ fontFamily: F_BODY, fontWeight: 500, fontSize: '0.88rem', width: '110px', flexShrink: 0, color: '#222' }}>
                          {skill.name}
                        </span>
                        <div className="bar-track" style={{ flex: 1 }}>
                          <div className="bar-fill" data-pct={skill.pct}></div>
                        </div>
                        <span style={{ fontFamily: F_BODY, fontSize: '0.72rem', color: '#bbb', width: '30px', textAlign: 'right', fontWeight: 500 }}>
                          {skill.pct}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 05 QUOTES */}
        {/* 05 BLOG */}
        <section className="section" id="blog" style={{ paddingTop: '56px' }}>
          <span className="ghost">05</span>
          <div className="inner">
            <h2 className="from-left d0" style={{
              fontFamily: F_DISPLAY,
              fontWeight: 700,
              fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
              lineHeight: 1,
              letterSpacing: '0.02em',
              color: '#0a0a0a',
              marginBottom: '2rem',
            }}>
              Blog
            </h2>

            <div style={{ borderTop: '2px solid #e8e8e8' }}>
              {posts.map((post, i) => {
                const delays = ['d1','d2','d3','d4','d5']
                const label = new Date(post.date + 'T00:00:00').toLocaleDateString('en-US', {
                  year: 'numeric', month: 'short', day: 'numeric',
                })
                return (
                  <Link key={post.slug} href={`/blog/${post.slug}`}
                    className={`hrow from-up ${delays[i] ?? 'd1'}`}
                    style={{ borderBottom: '1.5px solid #eee', padding: '1.2rem 0.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '2rem' }}>
                    <span style={{ fontFamily: F_DISPLAY, fontWeight: 700, fontSize: '1.15rem', letterSpacing: '0.01em', color: '#111' }}>
                      {post.title}
                    </span>
                    <span style={{ fontFamily: F_BODY, fontSize: '0.78rem', color: '#999', flexShrink: 0, fontWeight: 400 }}>
                      {label}
                    </span>
                  </Link>
                )
              })}
              <div className="from-up d2" style={{ padding: '1rem 0.25rem', fontFamily: F_BODY, fontSize: '0.82rem', color: '#bbb', fontWeight: 400 }}>
                More posts coming soon…
              </div>
            </div>

            {/* Footer */}
            <div className="from-up d4" style={{
              marginTop: '2.5rem',
              paddingTop: '1.5rem',
              borderTop: '2px solid #e8e8e8',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
            }}>
              <span style={{ fontFamily: F_BODY, fontSize: '0.78rem', color: '#bbb', fontWeight: 400 }}>
                © 2026 Sarthak Hingrajiya
              </span>
              <div style={{ display: 'flex', gap: '2.5rem' }}>
                {[
                  { label: 'GitHub',   href: 'https://github.com/sarthak8619' },
                  { label: 'LinkedIn', href: 'https://linkedin.com/in/sarthak-hingrajiya-24bb1724a' },
                  { label: 'Email',    href: 'mailto:sarthak.hingrajiya@gmail.com' },
                ].map(({ label, href }) => (
                  <a key={label} href={href} target={href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer"
                    style={{ fontFamily: F_BODY, fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#666', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

      </div>{/* /scroll-wrap */}
    </>
  )
}
