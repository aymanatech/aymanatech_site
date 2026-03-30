'use client'
// src/hooks/useScrollReveal.ts
import { useEffect } from 'react'

export function useScrollReveal() {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>('.reveal,.reveal-left,.reveal-right')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement
          const siblings = el.parentElement?.querySelectorAll('.reveal,.reveal-left,.reveal-right')
          let delay = 0
          if (siblings) Array.from(siblings).forEach((s,i) => { if(s===el) delay=i*90 })
          setTimeout(() => el.classList.add('visible'), delay)
          observer.unobserve(el)
        }
      })
    }, { threshold: 0.1, rootMargin:'0px 0px -40px 0px' })
    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}
