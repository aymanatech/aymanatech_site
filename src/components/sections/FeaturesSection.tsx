'use client'
// src/components/sections/FeaturesSection.tsx

import SectionHeading from '@/components/SectionHeading'
import { FEATURES, C } from '@/lib/constants'

export default function FeaturesSection() {
  return (
    <div className="bg-[linear-gradient(180deg,#06001a,#0a0030)]">
      <div className="section">
        <SectionHeading 
          pre="Powerful Features That Drive" 
          highlight="Results" 
          light 
          sub="Every tool you need to automate, scale, and dominate your market — all in one platform." 
        />

        <div className="grid-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className="card reveal p-5"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <div
                className="w-[36px] h-[36px] rounded-[9px] flex items-center justify-center text-[18px] mb-3"
                style={{
                  background: `${f.color}22`,
                  border: `1px solid ${f.color}44`,
                }}
              >
                {f.icon}
              </div>

              <div className="font-bold text-[13px] text-white mb-[6px]">
                {f.title}
              </div>

              <div className="text-[11px] text-[#7899cc] leading-[1.7]">
                {f.desc}
              </div>

              <div
                className="text-[11px] mt-[10px] cursor-pointer font-semibold"
                style={{ color: C.cyan }}
              >
                Learn more →
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}