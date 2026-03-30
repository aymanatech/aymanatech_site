// src/components/sections/SuccessStoriesSection.tsx
import SectionHeading from '@/components/SectionHeading'
import { SUCCESS_STORIES, C } from '@/lib/constants'
export default function SuccessStoriesSection() {
  return (
    <div style={{ background:'linear-gradient(180deg,#080028,#0c003a)' }}>
      <div className="section">
        <SectionHeading pre="Real" highlight="Success" post="Stories" light sub="See how real businesses transformed their operations and multiplied their revenue." />
        <div className="grid-2" style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:20 }}>
          {SUCCESS_STORIES.map((s,i)=>(
            <div key={i} className="story-card reveal" style={{ transitionDelay:`${i*80}ms` }}>
              <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14 }}>
                <div style={{ fontWeight:700,fontSize:14,background:C.g5,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent' }}>{s.type}</div>
                <div style={{ fontSize:11,color:'#7899cc',background:'rgba(255,255,255,.05)',padding:'3px 10px',borderRadius:10 }}>Success Story</div>
              </div>
              <div style={{ marginBottom:12 }}>
                <div style={{ fontSize:11,color:'#6677aa',marginBottom:4,textTransform:'uppercase',letterSpacing:.6 }}>Challenge</div>
                <div style={{ fontSize:12,color:'#aabbd4',lineHeight:1.65 }}>{s.challenge}</div>
              </div>
              <div style={{ display:'flex',gap:10,marginBottom:14 }}>
                {s.results.map((r,j)=>(
                  <div key={j} style={{ flex:1,background:'rgba(0,212,255,.06)',border:'1px solid rgba(0,212,255,.15)',borderRadius:10,padding:'10px 8px',textAlign:'center' }}>
                    <div style={{ fontSize:18,fontWeight:900,background:C.g5,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent' }}>{r.val}</div>
                    <div style={{ fontSize:10,color:'#7899cc',marginTop:2 }}>{r.lab}</div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize:12,color:'#ccd6f6',fontStyle:'italic',borderLeft:`2px solid ${C.cyan}`,paddingLeft:10,lineHeight:1.6 }}>
                &ldquo;{s.quote}&rdquo;
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
