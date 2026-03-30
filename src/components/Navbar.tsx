'use client'
// src/components/Navbar.tsx

import { useState } from 'react'
import { C, NAV_LINKS } from '@/lib/constants'

const SECTION_IDS: Record<string, string> = {
  'Home':            'home',
  'About':           'about',
  'Services':        'services',
  'Skills':          'skills',
  'Success Stories': 'success-stories',
}

interface NavbarProps {
  activeNav: string
  setActiveNav: (nav: string) => void
}

export default function Navbar({ activeNav, setActiveNav }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleNav = (link: string) => {
    setActiveNav(link)
    setMenuOpen(false)
    const id = SECTION_IDS[link]
    if (!id) return
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 40px',
        position: 'sticky', top: 0,
        background: 'rgba(6,0,26,0.92)',
        backdropFilter: 'blur(14px)',
        zIndex: 1000,
        borderBottom: '1px solid rgba(0,212,255,0.1)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }} onClick={() => handleNav('Home')}>
          <div style={{ width: 28, height: 28, background: C.g5, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, boxShadow: `0 0 12px ${C.cyan}55` }}>🅰</div>
          <span style={{ fontWeight: 700, fontSize: 16, color: C.cyan }}>Aivexa labs</span>
        </div>

        <div className="nav-desktop" style={{ display: 'flex', gap: 4 }}>
          {NAV_LINKS.map((l) => (
            <span key={l} className={`nav-link${activeNav === l ? ' active' : ''}`} onClick={() => handleNav(l)}>{l}</span>
          ))}
        </div>

        <div className="nav-desktop" style={{ display: 'flex' }}>
          <button className="btn-primary" style={{ padding: '9px 18px', fontSize: 13, borderRadius: 20 }} onClick={() => handleNav('Success Stories')}>
            ❤️ Let&apos;s chat
          </button>
        </div>

        <button className="nav-mobile-btn" style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 8, flexDirection: 'column', gap: 5 }} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          {[0,1,2].map((i) => (
            <span key={i} style={{ display: 'block', width: 22, height: 2, background: menuOpen ? C.cyan : '#ccd6f6', borderRadius: 2, transition: 'all 0.2s', transform: menuOpen ? (i===0 ? 'rotate(45deg) translate(5px,5px)' : i===2 ? 'rotate(-45deg) translate(5px,-5px)' : 'scaleX(0)') : 'none' }} />
          ))}
        </button>
      </nav>

      {menuOpen && (
        <div style={{ position: 'fixed', top: 57, left: 0, right: 0, background: 'rgba(6,0,26,0.98)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(0,212,255,0.15)', zIndex: 999, padding: '12px 20px 20px', display: 'flex', flexDirection: 'column', gap: 4, animation: 'fadeUp 0.25s ease both' }}>
          {NAV_LINKS.map((l) => (
            <span key={l} className={`nav-link${activeNav === l ? ' active' : ''}`} style={{ padding: '12px 16px', fontSize: 15 }} onClick={() => handleNav(l)}>{l}</span>
          ))}
          <button className="btn-primary" style={{ marginTop: 8, justifyContent: 'center' }} onClick={() => handleNav('Success Stories')}>❤️ Let&apos;s chat</button>
        </div>
      )}
    </>
  )
}
