'use client'
// src/components/Navbar.tsx

import { useState } from 'react'
import { C, NAV_LINKS } from '@/lib/constants'

const SECTION_IDS: Record<string, string> = {
  'Home': 'home',
  'About': 'about',
  'Services': 'services',
  'Skills': 'skills',
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
      <nav className="flex items-center justify-between px-6 md:px-10 py-3.5 sticky top-0 z-[1000] bg-[rgba(6,0,26,0.92)] backdrop-blur-[14px] border-b border-cyan-400/10">
        
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleNav('Home')}
        >
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-sm shadow-[0_0_12px_rgba(0,212,255,0.35)]"
            style={{ background: C.g5 }}
          >
            🅰
          </div>
          <span className="font-bold text-sm text-cyan-400">
            Aymana Tech
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-1">
          {NAV_LINKS.map((l) => (
            <span
              key={l}
              onClick={() => handleNav(l)}
              className={`cursor-pointer px-3 py-2 rounded-lg text-sm transition ${
                activeNav === l
                  ? 'text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-500'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {l}
            </span>
          ))}
        </div>

        {/* Desktop Button */}
        <div className="hidden md:flex">
          <button
            onClick={() => handleNav('Success Stories')}
            className="px-4 py-2 text-sm rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-medium hover:opacity-90 transition"
          >
            ❤️ Let&apos;s chat
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`block w-5 h-[2px] rounded transition-all duration-200 ${
                menuOpen ? 'bg-cyan-400' : 'bg-gray-300'
              }`}
              style={{
                transform: menuOpen
                  ? i === 0
                    ? 'rotate(45deg) translate(5px,5px)'
                    : i === 2
                    ? 'rotate(-45deg) translate(5px,-5px)'
                    : 'scaleX(0)'
                  : 'none',
              }}
            />
          ))}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed top-[57px] left-0 right-0 z-[999] px-5 pb-5 pt-3 flex flex-col gap-1 bg-[rgba(6,0,26,0.98)] backdrop-blur-[16px] border-b border-cyan-400/20 animate-[fadeUp_0.25s_ease_both]">
          {NAV_LINKS.map((l) => (
            <span
              key={l}
              onClick={() => handleNav(l)}
              className={`px-4 py-3 text-sm rounded-lg cursor-pointer transition ${
                activeNav === l
                  ? 'text-cyan-400'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {l}
            </span>
          ))}

          <button
            onClick={() => handleNav('Success Stories')}
            className="mt-2 flex justify-center px-4 py-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-medium"
          >
            ❤️ Let&apos;s chat
          </button>
        </div>
      )}
    </>
  )
}