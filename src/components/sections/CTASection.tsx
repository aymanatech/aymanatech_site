'use client'
// src/components/sections/CTASection.tsx
import Robot from '@/components/Robot'
import { C, FOOTER_STATS } from '@/lib/constants'

export default function CTASection() {
  return (
    <div className="bg-[linear-gradient(180deg,#0c003a,#06001a)] border-t border-[rgba(0,212,255,.1)]">
      <div className="section text-center">
        <h2 className="reveal text-[clamp(24px,3.5vw,42px)] font-black mb-4">
          Get Your{' '}
          <span className="bg-[linear-gradient(90deg,#ff6b6b,#ff8e53)] bg-clip-text text-transparent">
            Free Automation Audit
          </span>
        </h2>

        <p className="reveal text-[#8899cc] text-sm max-w-[520px] mx-auto mb-9 leading-[1.75]">
          Find out in 30 minutes exactly which automations would save your business the most time and money. Zero obligation, pure value.
        </p>

        {/* Stats */}
        <div className="reveal stat-row flex justify-center gap-5 mb-12 flex-wrap">
          {FOOTER_STATS.map((s, i) => (
            <div
              key={i}
              className="bg-[rgba(255,255,255,.04)] border border-[rgba(0,212,255,.15)] rounded-[14px] px-[22px] py-[14px] min-w-[110px]"
            >
              <div
                className="text-[22px] font-black bg-clip-text text-transparent"
                style={{ background: C.g5 }}
              >
                {s.val}
              </div>
              <div className="text-[11px] text-[#7899cc] mt-[3px]">
                {s.lab}
              </div>
            </div>
          ))}
        </div>

        {/* Contact grid */}
        <div className="contact-grid grid grid-cols-1 md:grid-cols-2 gap-10 max-w-[900px] mx-auto items-center">
          <div className="reveal-left text-left">
            <h3 className="text-[20px] font-extrabold mb-[6px]">
              Let&apos;s Connect
            </h3>

            <p className="text-[#8899cc] text-[13px] mb-[22px] leading-[1.7]">
              Ready to automate your business? Fill out the form and we&apos;ll get back to you within 24 hours.
            </p>

            <div className="flex flex-col gap-3">
              {['Your Name', 'Your Email', 'Your Phone'].map((ph, i) => (
                <input key={i} placeholder={ph} className="form-input" />
              ))}

              <textarea
                placeholder="Tell us about your business..."
                rows={3}
                className="form-input resize-none"
              />

              <button className="btn-primary w-full justify-center">
                🚀 Get My Free Audit
              </button>
            </div>
          </div>

          <div className="contact-robot reveal-right flex justify-center items-center">
            <Robot size={1.4} />
          </div>
        </div>
      </div>

      {/* Footer bar */}
      <div className="footer-bar border-t border-[rgba(255,255,255,.05)] px-[60px] py-[18px] flex justify-between items-center text-[12px] text-[#556688]">
        <div className="flex items-center gap-[7px]">
          <div
            className="w-[20px] h-[20px] rounded-[5px] flex items-center justify-center text-[11px]"
            style={{ background: C.g5 }}
          >
            🅰
          </div>
          <span className="font-bold" style={{ color: C.cyan }}>
            Aymana Tech
          </span>
        </div>

        <span>© 2025 Aymana Tech. All rights reserved.</span>

        <div className="flex gap-4">
          {['Privacy', 'Terms', 'Contact'].map((l) => (
            <span
              key={l}
              className="cursor-pointer text-[#7788aa] transition-colors duration-200 hover:text-white"
            >
              {l}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}