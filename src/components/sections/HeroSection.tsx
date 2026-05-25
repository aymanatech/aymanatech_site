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
    <div className="relative overflow-hidden min-h-screen flex flex-col">
      
      {/* ambient blobs */}
      <div className="absolute top-[-8%] left-[18%] w-[480px] h-[380px] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(0,212,255,.07),transparent_70%)]"/>
      <div className="absolute top-[30%] right-[-4%] w-[380px] h-[380px] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(91,43,224,.1),transparent_70%)]"/>

      {/* floats */}
      {FLOATS.map(({t,x,y},i) => (
        <div
          key={i}
          className="absolute text-[16px] opacity-[0.35] pointer-events-none z-[1]"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            animation: `float ${3+i}s ease-in-out infinite alternate`,
            animationDelay: `${i*0.4}s`,
            filter: `drop-shadow(0 0 5px ${C.cyan}88)`
          }}
        >
          {t}
        </div>
      ))}

      {/* content */}
      <div className="relative z-[5] text-center px-[clamp(16px,4vw,40px)] pt-[clamp(40px,6vw,80px)] pb-[56px] max-w-[860px] mx-auto w-full">
        
        <h1
          className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl"
          style={{
            opacity: animIn ? 1 : 0,
            transform: animIn ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.8s ease'
          }}
        >
          <span className="bg-[linear-gradient(90deg,#ff6b6b,#ff8e53,#ffd700)] bg-clip-text text-transparent">
            Turn More Inquiries Into
          </span><br/>
          <span className="bg-[linear-gradient(90deg,#ffd700,#ff8e53)] bg-clip-text text-transparent">
            Booked Work
          </span><br/>
          <span
            className="italic font-extrabold bg-clip-text text-transparent"
            style={{ background: C.g3 }}
          >
            Fast Follow-Up That
          </span><br/>
          <span
            className="italic bg-clip-text text-transparent"
            style={{ background: C.g4 }}
          >
            Wins Deals
          </span>
        </h1>

        <p
          className="text-[#9aaccc] text-[clamp(13px,1.5vw,15px)] max-w-[540px] mx-auto mt-[18px] leading-[1.75]"
          style={{
            opacity: animIn ? 1 : 0,
            transition: 'opacity 0.8s 0.2s ease'
          }}
        >
          24/7 AI voice systems that qualify leads, book calls, and handle support while you sleep.
          Average client sees 300% increase in qualified leads within 30 days.
        </p>

        {/* slide dots */}
        <div className="flex justify-center gap-[7px] mt-[22px]">
          {[0,1,2,3,4].map(i=>(
            <div
              key={i}
              onClick={()=>setSlideIndex(i)}
              className="h-[9px] rounded-[5px] cursor-pointer transition-all duration-300"
              style={{
                width: i===slideIndex ? 26 : 9,
                background: i===slideIndex ? C.gBtn : 'rgba(255,255,255,.15)',
                boxShadow: i===slideIndex ? `0 0 8px ${C.cyan}88` : 'none'
              }}
            />
          ))}
        </div>

        <div className="h-[3px] bg-[rgba(255,255,255,.08)] rounded-[2px] mt-[14px] mx-auto max-w-[380px] overflow-hidden">
          <div
            className="h-full transition-all duration-500"
            style={{
              background: C.gBtn,
              width: `${(slideIndex+1)*20}%`,
              boxShadow: `0 0 7px ${C.cyan}`
            }}
          />
        </div>

        {/* badges */}
        <div
          className="hero-badges flex justify-center gap-[9px] mt-[24px] flex-wrap"
          style={{
            opacity: animIn ? 1 : 0,
            transition: 'opacity 0.8s 0.35s ease'
          }}
        >
          {HERO_BADGES.map((b,i)=>(
            <div
              key={i}
              className="flex items-center gap-[6px] bg-[rgba(255,255,255,.05)] rounded-[18px] px-[14px] py-[6px] text-[12px] font-medium text-[#ccd6f6]"
              style={{ border: `1px solid ${b.color}44` }}
            >
              <span style={{ color: b.color, fontSize: 7 }}>●</span>
              {b.text}
            </div>
          ))}
        </div>

        {/* stats */}
        <div
          className="hero-stats flex justify-center gap-[10px] mt-[20px] flex-wrap"
          style={{
            opacity: animIn ? 1 : 0,
            transition: 'opacity 0.8s 0.5s ease'
          }}
        >
          {HERO_STATS.map((s,i)=>(
            <div
              key={i}
              className="bg-[rgba(255,255,255,.04)] border border-[rgba(0,212,255,.15)] rounded-[13px] px-[16px] py-[11px] flex items-center gap-[10px] min-w-[130px] backdrop-blur-[8px]"
            >
              <div
                className="w-[34px] h-[34px] rounded-[9px] flex items-center justify-center text-[16px] shrink-0"
                style={{
                  background: s.grad,
                  boxShadow: '0 4px 10px rgba(0,212,255,.28)'
                }}
              >
                {s.icon}
              </div>

              <div className="text-left">
                <div className="font-extrabold text-[17px] text-white leading-[1.1]">
                  {s.val}
                </div>
                <div className="text-[10px] text-[#7899cc]">
                  {s.lab}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div
          className="hero-ctas flex justify-center gap-[12px] mt-[28px] flex-wrap"
          style={{
            opacity: animIn ? 1 : 0,
            transition: 'opacity 0.8s 0.65s ease'
          }}
        >
          <button className="btn-primary">Free Consultation →</button>
          <button className="btn-outline">▷ Request a Quote</button>
        </div>
      </div>

      {/* Robot */}
      <div className="hero-robot absolute left-[2%] top-[40%] translate-y-[-50%] z-[2]">
        <Robot/>
      </div>
    </div>
  )
}