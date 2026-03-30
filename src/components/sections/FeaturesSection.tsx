// src/components/sections/FeaturesSection.tsx
import SectionHeading from '@/components/SectionHeading'
import { FEATURES, C } from '@/lib/constants'
export default function FeaturesSection() {
  return (
    <div style={{ background:'linear-gradient(180deg,#06001a,#0a0030)' }}>
      <div className="section">
        <SectionHeading pre="Powerful Features That Drive" highlight="Results" light sub="Every tool you need to automate, scale, and dominate your market — all in one platform." />
        <div className="grid-4" style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:16 }}>
          {FEATURES.map((f,i)=>(
            <div key={i} className="card reveal" style={{ padding:20,transitionDelay:`${i*50}ms` }}>
              <div style={{ width:36,height:36,borderRadius:9,background:`${f.color}22`,border:`1px solid ${f.color}44`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,marginBottom:12 }}>{f.icon}</div>
              <div style={{ fontWeight:700,fontSize:13,color:'white',marginBottom:6 }}>{f.title}</div>
              <div style={{ fontSize:11,color:'#7899cc',lineHeight:1.7 }}>{f.desc}</div>
              <div style={{ fontSize:11,color:C.cyan,marginTop:10,cursor:'pointer',fontWeight:600 }}>Learn more →</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
