'use client'
import { useState, useEffect } from 'react'
import Robot from '@/components/Robot'
import { C, HERO_BADGES, HERO_STATS } from '@/lib/constants'

const FLOATS = [
  {t:'📞',x:54,y:9},{t:'🖥',x:68,y:17},{t:'💎',x:10,y:13},
  {t:'🔖',x:83,y:10},{t:'⚙',x:95,y:60},{t:'🔷',x:26,y:75},
  {t:'✦',x:3,y:88},{t:'◆',x:97,y:42},
]

export default function HeroSection() {
  const [animIn, setAnimIn] = useState(false)
  const [slideIndex, setSlideIndex] = useState(3)

  useEffect(() => {
    const t = setTimeout(() => setAnimIn(true), 120)
    const iv = setInterval(() => setSlideIndex(p=>(p+1)%5), 2500)
    return () => { clearTimeout(t); clearInterval(iv) }
  }, [])

  return (
    <div style={{ position:'relative', overflow:'hidden', minHeight:'100vh', display:'flex', flexDirection:'column' }}>
      {/* ambient blobs */}
      <div style={{ position:'absolute',top:'-8%',left:'18%',width:480,height:380,borderRadius:'50%',background:'radial-gradient(circle,rgba(0,212,255,.07),transparent 70%)',pointerEvents:'none' }}/>
      <div style={{ position:'absolute',top:'30%',right:'-4%',width:380,height:380,borderRadius:'50%',background:'radial-gradient(circle,rgba(91,43,224,.1),transparent 70%)',pointerEvents:'none' }}/>
      {/* floats */}
      {FLOATS.map(({t,x,y},i) => (
        <div key={i} style={{ position:'absolute',left:`${x}%`,top:`${y}%`,fontSize:16,opacity:0.35,animation:`float ${3+i}s ease-in-out infinite alternate`,animationDelay:`${i*0.4}s`,pointerEvents:'none',zIndex:1,filter:`drop-shadow(0 0 5px ${C.cyan}88)` }}>{t}</div>
      ))}

      {/* content */}
      <div style={{ position:'relative',zIndex:5,textAlign:'center',padding:'clamp(40px,6vw,80px) clamp(16px,4vw,40px) 56px',maxWidth:860,margin:'0 auto',width:'100%' }}>
        <h1 className='text-5xl sm:text-6xl lg:text-7xl xl:text-8xl' style={{ opacity:animIn?1:0,transform:animIn?'translateY(0)':'translateY(24px)',transition:'all 0.8s ease' }}>
          <span style={{ background:'linear-gradient(90deg,#ff6b6b,#ff8e53,#ffd700)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent' }}>Turn More Inquiries Into</span><br/>
          <span style={{ background:'linear-gradient(90deg,#ffd700,#ff8e53)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent' }}>Booked Work</span><br/>
          <span style={{ background:C.g3,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',fontStyle:'italic',fontWeight:800 }}>Fast Follow-Up That</span><br/>
          <span style={{ background:C.g4,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',fontStyle:'italic' }}>Wins Deals</span>
        </h1>

        <p style={{ color:'#9aaccc',fontSize:'clamp(13px,1.5vw,15px)',maxWidth:540,margin:'18px auto 0',lineHeight:1.75,opacity:animIn?1:0,transition:'opacity 0.8s 0.2s ease' }}>
          24/7 AI voice systems that qualify leads, book calls, and handle support while you sleep.
          Average client sees 300% increase in qualified leads within 30 days.
        </p>

        {/* slide dots */}
        <div style={{ display:'flex',justifyContent:'center',gap:7,marginTop:22 }}>
          {[0,1,2,3,4].map(i=>(
            <div key={i} onClick={()=>setSlideIndex(i)} style={{ width:i===slideIndex?26:9,height:9,borderRadius:5,background:i===slideIndex?C.gBtn:'rgba(255,255,255,.15)',transition:'all .3s',cursor:'pointer',boxShadow:i===slideIndex?`0 0 8px ${C.cyan}88`:'none' }}/>
          ))}
        </div>
        <div style={{ height:3,background:'rgba(255,255,255,.08)',borderRadius:2,margin:'14px auto 0',maxWidth:380,overflow:'hidden' }}>
          <div style={{ height:'100%',background:C.gBtn,width:`${(slideIndex+1)*20}%`,transition:'width 0.5s',boxShadow:`0 0 7px ${C.cyan}` }}/>
        </div>

        {/* badges */}
        <div className="hero-badges" style={{ display:'flex',justifyContent:'center',gap:9,marginTop:24,flexWrap:'wrap',opacity:animIn?1:0,transition:'opacity 0.8s 0.35s ease' }}>
          {HERO_BADGES.map((b,i)=>(
            <div key={i} style={{ display:'flex',alignItems:'center',gap:6,background:'rgba(255,255,255,.05)',border:`1px solid ${b.color}44`,borderRadius:18,padding:'6px 14px',fontSize:12,fontWeight:500,color:'#ccd6f6' }}>
              <span style={{ color:b.color,fontSize:7 }}>●</span>{b.text}
            </div>
          ))}
        </div>

        {/* stats */}
        <div className="hero-stats" style={{ display:'flex',justifyContent:'center',gap:10,marginTop:20,flexWrap:'wrap',opacity:animIn?1:0,transition:'opacity 0.8s 0.5s ease' }}>
          {HERO_STATS.map((s,i)=>(
            <div key={i} style={{ background:'rgba(255,255,255,.04)',border:'1px solid rgba(0,212,255,.15)',borderRadius:13,padding:'11px 16px',display:'flex',alignItems:'center',gap:10,minWidth:130,backdropFilter:'blur(8px)' }}>
              <div style={{ width:34,height:34,borderRadius:9,background:s.grad,display:'flex',alignItems:'center',justifyContent:'center',fontSize:16,boxShadow:'0 4px 10px rgba(0,212,255,.28)',flexShrink:0 }}>{s.icon}</div>
              <div style={{ textAlign:'left' }}>
                <div style={{ fontWeight:800,fontSize:17,color:'white',lineHeight:1.1 }}>{s.val}</div>
                <div style={{ fontSize:10,color:'#7899cc' }}>{s.lab}</div>
              </div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="hero-ctas" style={{ display:'flex',justifyContent:'center',gap:12,marginTop:28,flexWrap:'wrap',opacity:animIn?1:0,transition:'opacity 0.8s 0.65s ease' }}>
          <button className="btn-primary">Free Consultation →</button>
          <button className="btn-outline">▷ Request a Quote</button>
        </div>
      </div>

      {/* Robot - hidden on mobile via CSS */}
      <div className="hero-robot" style={{ position:'absolute',left:'2%',top:'40%',transform:'translateY(-50%)',zIndex:2 }}>
        <Robot/>
      </div>
    </div>
  )
}
