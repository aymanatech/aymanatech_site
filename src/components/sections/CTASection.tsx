'use client'
// src/components/sections/CTASection.tsx
import Robot from '@/components/Robot'
import { C, FOOTER_STATS } from '@/lib/constants'

export default function CTASection() {
  return (
    <div style={{ background:'linear-gradient(180deg,#0c003a,#06001a)',borderTop:'1px solid rgba(0,212,255,.1)' }}>
      <div className="section" style={{ textAlign:'center' }}>
        <h2 className="reveal" style={{ fontSize:'clamp(24px,3.5vw,42px)',fontWeight:900,marginBottom:16 }}>
          Get Your{' '}
          <span style={{ background:'linear-gradient(90deg,#ff6b6b,#ff8e53)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent' }}>Free Automation Audit</span>
        </h2>
        <p className="reveal" style={{ color:'#8899cc',fontSize:14,maxWidth:520,margin:'0 auto 36px',lineHeight:1.75 }}>
          Find out in 30 minutes exactly which automations would save your business the most time and money. Zero obligation, pure value.
        </p>

        {/* Stats */}
        <div className="reveal stat-row" style={{ display:'flex',justifyContent:'center',gap:20,marginBottom:48,flexWrap:'wrap' }}>
          {FOOTER_STATS.map((s,i)=>(
            <div key={i} style={{ background:'rgba(255,255,255,.04)',border:'1px solid rgba(0,212,255,.15)',borderRadius:14,padding:'14px 22px',minWidth:110 }}>
              <div style={{ fontSize:22,fontWeight:900,background:C.g5,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent' }}>{s.val}</div>
              <div style={{ fontSize:11,color:'#7899cc',marginTop:3 }}>{s.lab}</div>
            </div>
          ))}
        </div>

        {/* Contact grid */}
        <div className="contact-grid" style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:40,maxWidth:900,margin:'0 auto',alignItems:'center' }}>
          <div className="reveal-left" style={{ textAlign:'left' }}>
            <h3 style={{ fontSize:20,fontWeight:800,marginBottom:6 }}>Let&apos;s Connect</h3>
            <p style={{ color:'#8899cc',fontSize:13,marginBottom:22,lineHeight:1.7 }}>
              Ready to automate your business? Fill out the form and we&apos;ll get back to you within 24 hours.
            </p>
            <div style={{ display:'flex',flexDirection:'column',gap:12 }}>
              {['Your Name','Your Email','Your Phone'].map((ph,i)=>(
                <input key={i} placeholder={ph} className="form-input" />
              ))}
              <textarea placeholder="Tell us about your business..." rows={3} className="form-input" style={{ resize:'none' }} />
              <button className="btn-primary" style={{ width:'100%',justifyContent:'center' }}>
                🚀 Get My Free Audit
              </button>
            </div>
          </div>
          <div className="contact-robot reveal-right" style={{ display:'flex',justifyContent:'center',alignItems:'center' }}>
            <Robot size={1.4}/>
          </div>
        </div>
      </div>

      {/* Footer bar */}
      <div className="footer-bar" style={{ borderTop:'1px solid rgba(255,255,255,.05)',padding:'18px 60px',display:'flex',justifyContent:'space-between',alignItems:'center',fontSize:12,color:'#556688' }}>
        <div style={{ display:'flex',alignItems:'center',gap:7 }}>
          <div style={{ width:20,height:20,background:C.g5,borderRadius:5,display:'flex',alignItems:'center',justifyContent:'center',fontSize:11 }}>🅰</div>
          <span style={{ color:C.cyan,fontWeight:700 }}>Aivexa labs</span>
        </div>
        <span>© 2025 Aivexa labs. All rights reserved.</span>
        <div style={{ display:'flex',gap:16 }}>
          {['Privacy','Terms','Contact'].map(l=>(
            <span key={l} style={{ cursor:'pointer',color:'#7788aa',transition:'color .2s' }}>{l}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
