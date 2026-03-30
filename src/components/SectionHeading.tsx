// src/components/SectionHeading.tsx
import { C } from '@/lib/constants'
interface Props { pre?:string; highlight:string; post?:string; sub?:string; light?:boolean }
export default function SectionHeading({ pre, highlight, post, sub, light=false }: Props) {
  return (
    <div className="reveal" style={{ textAlign:'center', marginBottom:48 }}>
      <h2 style={{ fontSize:'clamp(22px,3.5vw,40px)', fontWeight:900, margin:0, color:light?'white':'#1a1a2e', lineHeight:1.25 }}>
        {pre}{pre?' ':''}<span style={{ background:C.g5, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>{highlight}</span>
        {post && <>{' '}<span style={{ background:C.g4, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>{post}</span></>}
      </h2>
      {sub && <p style={{ color:light?'#8899cc':'#666', fontSize:14, maxWidth:560, margin:'12px auto 0', lineHeight:1.7 }}>{sub}</p>}
    </div>
  )
}
