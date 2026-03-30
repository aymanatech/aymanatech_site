// src/components/sections/AboutSection.tsx
import SectionHeading from '@/components/SectionHeading'
import { C } from '@/lib/constants'

const CERTS = [
  {icon:'🏆',t:'Make.com Certified',s:'Expert Level · 200+ Workflows',g:'linear-gradient(135deg,#00d4ff,#2b9fff)'},
  {icon:'🎯',t:'n8n Certified',s:'Advanced Automation',g:'linear-gradient(135deg,#3f35c9,#2b9fff)'},
]
const RESULTS = [
  {v:'200+',l:'Workflow Automations',g:'linear-gradient(135deg,#00d4ff,#2b9fff)'},
  {v:'5+',l:'Years Experience',g:'linear-gradient(135deg,#3f35c9,#2b9fff)'},
  {v:'20+',l:'Hours Saved Weekly',g:'linear-gradient(135deg,#2255e0,#00d4ff)'},
  {v:'30%',l:'Performance Boost',g:'linear-gradient(135deg,#6a1fc2,#3f35c9)'},
]
const PROCESS = [
  {n:1,t:'Free automation audit & consultation',g:'linear-gradient(135deg,#00d4ff,#2b9fff)'},
  {n:2,t:'Custom automation strategy & timeline',g:'linear-gradient(135deg,#2255e0,#00d4ff)'},
  {n:3,t:'Implementation & testing',g:'linear-gradient(135deg,#3f35c9,#2b9fff)'},
  {n:4,t:'Training & ongoing support',g:'linear-gradient(135deg,#6a1fc2,#3f35c9)'},
]

export default function AboutSection() {
  return (
    <div style={{ background:'linear-gradient(180deg,#080030,#0c003a)' }}>
      <div className="section">
        <SectionHeading pre="Why" highlight="500+ Businesses" post="Trust Us" light sub="We're not just another automation company. We're certified experts who deliver measurable results and guaranteed ROI." />
        <div className="grid-2" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:24 }}>
          {/* LEFT */}
          <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
            <div className="card reveal-left">
              <h3 style={{ fontSize:15,fontWeight:700,marginBottom:16,color:'white' }}>Certified Expertise</h3>
              <div className="grid-cert" style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:12 }}>
                {CERTS.map((c,i)=>(
                  <div key={i} style={{ background:'rgba(0,212,255,.06)',border:'1px solid rgba(0,212,255,.18)',borderRadius:12,padding:'16px 12px',textAlign:'center' }}>
                    <div style={{ fontSize:26,marginBottom:7 }}>{c.icon}</div>
                    <div style={{ fontWeight:700,fontSize:12,background:c.g,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent' }}>{c.t}</div>
                    <div style={{ fontSize:10,color:'#7899cc',marginTop:3 }}>{c.s}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="card reveal-left">
              <h3 style={{ fontSize:15,fontWeight:700,marginBottom:12,color:'white' }}>Our Mission</h3>
              <p style={{ color:'#8899cc',fontSize:13,lineHeight:1.8,marginBottom:12 }}>We eliminate the manual work costing your business thousands every month. Our experts don&apos;t just build automations — we deliver measurable results that pay for themselves.</p>
              <p style={{ color:'#8899cc',fontSize:13,lineHeight:1.8 }}>Every client gets a dedicated expert, guaranteed results, and ongoing support. We offer a free audit to show exactly how much you can save.</p>
            </div>
          </div>
          {/* RIGHT */}
          <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
            <div className="card reveal-right">
              <h3 style={{ fontSize:15,fontWeight:700,marginBottom:18,color:'white' }}>Proven Results</h3>
              <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:14 }}>
                {RESULTS.map((s,i)=>(
                  <div key={i} style={{ textAlign:'center' }}>
                    <div style={{ fontSize:26,fontWeight:900,background:s.g,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent' }}>{s.v}</div>
                    <div style={{ fontSize:11,color:'#7899cc',marginTop:3 }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="card reveal-right" style={{ background:'linear-gradient(135deg,rgba(63,53,201,.15),rgba(91,43,224,.1))',border:'1px solid rgba(91,43,224,.3)' }}>
              <h3 style={{ fontSize:15,fontWeight:700,marginBottom:15,color:'white' }}>Our Process</h3>
              {PROCESS.map(step=>(
                <div key={step.n} style={{ display:'flex',alignItems:'center',gap:10,padding:'7px 6px',borderRadius:9,marginBottom:4 }}>
                  <div style={{ width:26,height:26,borderRadius:'50%',background:step.g,color:'white',fontSize:12,fontWeight:700,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}>{step.n}</div>
                  <span style={{ fontSize:13,color:'#ccd6f6' }}>{step.t}</span>
                </div>
              ))}
            </div>
            <div className="card reveal-right" style={{ background:'linear-gradient(135deg,rgba(0,212,255,.07),rgba(43,159,255,.04))',border:'1px solid rgba(0,212,255,.22)',textAlign:'center',animation:'glowPulse 3s ease-in-out infinite' }}>
              <div style={{ fontSize:32,marginBottom:8,filter:`drop-shadow(0 0 10px ${C.cyan})` }}>🎯</div>
              <div style={{ fontWeight:800,fontSize:15,background:C.g1,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',marginBottom:6 }}>Free Automation Audit</div>
              <div style={{ fontSize:12,color:'#8899cc',lineHeight:1.6 }}>Get a free consultation and discover exactly how much time and money you&apos;re losing to manual work.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
