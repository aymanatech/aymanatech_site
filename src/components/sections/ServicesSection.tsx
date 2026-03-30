// src/components/sections/ServicesSection.tsx
import SectionHeading from '@/components/SectionHeading'
import { SERVICES } from '@/lib/constants'
export default function ServicesSection() {
  return (
    <div style={{ background:'linear-gradient(180deg,#0c003a,#06001a)' }}>
      <div className="section">
        <SectionHeading pre="Services That" highlight="Grow Revenue" post="and Save Time" light sub="Simple, business-first solutions that turn more leads into customers and reduce day-to-day overhead." />
        <div className="grid-3" style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:18,marginBottom:36 }}>
          {SERVICES.map((s,i)=>(
            <div key={i} className="card reveal" style={{ transitionDelay:`${i*60}ms` }}>
              <div style={{ width:40,height:40,borderRadius:10,background:`${s.color}22`,border:`1px solid ${s.color}44`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,marginBottom:14 }}>{s.icon}</div>
              <div style={{ fontWeight:700,fontSize:14,color:'white',marginBottom:8 }}>{s.title}</div>
              <div style={{ fontSize:12,color:'#8899cc',lineHeight:1.7 }}>{s.desc}</div>
            </div>
          ))}
        </div>
        <div className="reveal" style={{ display:'flex',justifyContent:'center',gap:14,flexWrap:'wrap' }}>
          <button className="btn-primary">Free Consultation →</button>
          <button className="btn-outline">▷ Request a Quote</button>
        </div>
      </div>
    </div>
  )
}
