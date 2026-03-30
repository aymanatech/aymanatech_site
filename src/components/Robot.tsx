// src/components/Robot.tsx
import { C } from '@/lib/constants'
interface RobotProps { size?: number }
export default function Robot({ size=1 }: RobotProps) {
  const s = size
  return (
    <div style={{ display:'inline-block', animation:'floatRobot 4s ease-in-out infinite alternate' }}>
      <div style={{ position:'relative', width:100*s, height:120*s }}>
        <div style={{ width:80*s,height:64*s,background:'linear-gradient(145deg,#1a1a3e,#0e0e2a)',borderRadius:16*s,margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:5*s,boxShadow:`0 6px 24px rgba(0,212,255,0.25),0 0 0 1px rgba(0,212,255,0.15)` }}>
          <div style={{ width:28*s,height:14*s,background:'#0a0a1e',borderRadius:3*s,overflow:'hidden',boxShadow:`0 0 6px ${C.cyan}` }}>
            <div style={{ display:'flex',gap:2*s,padding:`${2*s}px ${3*s}px`,height:'100%' }}>
              {[0,1,2].map(i=><div key={i} style={{ flex:1,background:C.cyan,borderRadius:2*s,animation:'blink 1.5s step-end infinite',animationDelay:`${i*0.15}s` }}/>)}
            </div>
          </div>
          <div style={{ width:36*s,height:4*s,background:C.cobalt,borderRadius:2*s }}/>
        </div>
        <div style={{ width:18*s,height:9*s,background:'#1a1a3e',margin:'0 auto',borderRadius:`0 0 ${4*s}px ${4*s}px` }}/>
        <div style={{ width:90*s,height:50*s,background:'linear-gradient(145deg,#1a1a3e,#0e0e2a)',borderRadius:12*s,margin:'0 auto',position:'relative',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:`0 4px 16px rgba(0,212,255,0.2)` }}>
          <div style={{ width:44*s,height:26*s,background:C.g5,borderRadius:7*s,opacity:0.8 }}/>
          {(['left','right'] as const).map(side=><div key={side} style={{ position:'absolute',[side]:-18*s,top:6*s,width:16*s,height:36*s,background:'linear-gradient(145deg,#1e1e42,#12122e)',borderRadius:8*s }}/>)}
        </div>
      </div>
    </div>
  )
}
