'use client'
// src/app/page.tsx

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import ThreeBackground from '@/components/ThreeBackground'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import ServicesSection from '@/components/sections/ServicesSection'
import FeaturesSection from '@/components/sections/FeaturesSection'
import WhatWeFixSection from '@/components/sections/WhatWeFixSection'
import SuccessStoriesSection from '@/components/sections/SuccessStoriesSection'
import CTASection from '@/components/sections/CTASection'
import ScrollDots from '@/components/ScrollDots'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export default function Home() {
  const [activeNav, setActiveNav] = useState('Home')
  useScrollReveal()

  return (
    <>
      {/* Three.js animated background — fixed, full-screen */}
      <ThreeBackground />

      {/* Page content sits above canvas */}
      <div style={{ position:'relative', zIndex:10 }}>
        <Navbar activeNav={activeNav} setActiveNav={setActiveNav} />

        <section id="home">
          <HeroSection />
        </section>

        <section id="about">
          <AboutSection />
        </section>

        <section id="services">
          <ServicesSection />
        </section>

        <section id="skills">
          <FeaturesSection />
        </section>

        <section id="fix">
          <WhatWeFixSection />
        </section>

        <section id="success-stories">
          <SuccessStoriesSection />
        </section>

        <section id="contact">
          <CTASection />
        </section>
      </div>

      {/* Scroll dot navigator */}
      <ScrollDots setActiveNav={setActiveNav} />
    </>
  )
}
