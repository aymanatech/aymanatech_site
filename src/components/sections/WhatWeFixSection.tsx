// src/components/sections/WhatWeFixSection.tsx
import SectionHeading from '@/components/SectionHeading'
import { FIXES } from '@/lib/constants'
export default function WhatWeFixSection() {
  return (
    <div style={{ background:'linear-gradient(180deg,#0a0030,#080028)' }}>
      <div className="section">
        <SectionHeading pre="What We Fix For" highlight="Your Business" light sub="Common business problems we solve with smart automation — fast, reliably, and with measurable ROI." />
        <div className="grid-3" style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:14,marginBottom:36 }}>
          {FIXES.map((f,i)=>(
            <div key={i} className="fix-card reveal" style={{ transitionDelay:`${i*60}ms` }}>
              <div style={{ width:38,height:38,borderRadius:9,background:`${f.color}22`,border:`1px solid ${f.color}44`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,flexShrink:0 }}>{f.icon}</div>
              <div>
                <div style={{ fontWeight:700,fontSize:13,color:'white',marginBottom:5 }}>{f.title}</div>
                <div style={{ fontSize:12,color:'#8899cc',lineHeight:1.65 }}>{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="reveal" style={{ display:'flex',justifyContent:'center' }}>
          <button className="btn-primary">Schedule a Call →</button>
        </div>
      </div>
    </div>
  )
}
