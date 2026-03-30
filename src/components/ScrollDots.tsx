'use client'
// src/components/ScrollDots.tsx

import { useEffect, useState } from 'react'
import { C } from '@/lib/constants'

const SECTIONS = ['home','about','services','skills','fix','success-stories','contact']
const NAV_MAP: Record<string,string> = {
  home:'Home', about:'About', services:'Services',
  skills:'Skills', fix:'What We Fix', 'success-stories':'Success Stories', contact:'Contact',
}

export default function ScrollDots({ setActiveNav }: { setActiveNav: (n:string)=>void }) {
  const [active, setActive] = useState(0)
  const [hovered, setHovered] = useState<number|null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const idx = SECTIONS.indexOf(e.target.id)
          if (idx !== -1) { setActive(idx); const nav = NAV_MAP[e.target.id]; if (nav) setActiveNav(nav) }
        }
      })
    }, { threshold: 0.4 })
    SECTIONS.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [setActiveNav])

  const scrollTo = (idx:number) => {
    const el = document.getElementById(SECTIONS[idx])
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div style={{ position:'fixed', right:18, top:'50%', transform:'translateY(-50%)', display:'flex', flexDirection:'column', gap:10, zIndex:500 }}>
      {SECTIONS.map((id,i) => (
        <div key={id} style={{ position:'relative', display:'flex', alignItems:'center', justifyContent:'flex-end' }}>
          {hovered===i && (
            <div style={{ position:'absolute', right:20, background:'rgba(6,0,26,0.9)', border:`1px solid ${C.cyan}44`, borderRadius:8, padding:'4px 10px', fontSize:11, color:C.cyan, whiteSpace:'nowrap', backdropFilter:'blur(8px)', animation:'slideIn 0.15s ease both' }}>
              {NAV_MAP[id]}
            </div>
          )}
          <div onClick={() => scrollTo(i)} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
            style={{ width:i===active?10:6, height:i===active?10:6, borderRadius:'50%', background:i===active?C.cyan:'rgba(255,255,255,0.25)', boxShadow:i===active?`0 0 10px ${C.cyan}, 0 0 20px ${C.cyan}55`:'none', cursor:'pointer', transition:'all 0.3s', border:i===active?`1px solid ${C.cyan}`:'1px solid rgba(255,255,255,0.1)' }}
          />
        </div>
      ))}
    </div>
  )
}
