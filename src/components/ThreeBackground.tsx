'use client'
// src/components/ThreeBackground.tsx

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    let animId: number
    let THREE: typeof import('three')

    async function init() {
      THREE = await import('three')
      const canvas = canvasRef.current
      if (!canvas) return

      // ── Renderer ──────────────────────────────────
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setClearColor(0x000000, 0)

      // ── Scene / Camera ────────────────────────────
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
      camera.position.z = 80

      // ── Particle field ───────────────────────────
      const PARTICLE_COUNT = 1800
      const positions = new Float32Array(PARTICLE_COUNT * 3)
      const colors    = new Float32Array(PARTICLE_COUNT * 3)
      const sizes     = new Float32Array(PARTICLE_COUNT)
      const velocities= new Float32Array(PARTICLE_COUNT * 3)

      const palette = [
        new THREE.Color('#00d4ff'),
        new THREE.Color('#2b9fff'),
        new THREE.Color('#3f35c9'),
        new THREE.Color('#5b2be0'),
        new THREE.Color('#6a1fc2'),
        new THREE.Color('#ffffff'),
      ]

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3
        positions[i3]     = (Math.random() - 0.5) * 200
        positions[i3 + 1] = (Math.random() - 0.5) * 200
        positions[i3 + 2] = (Math.random() - 0.5) * 100

        velocities[i3]     = (Math.random() - 0.5) * 0.012
        velocities[i3 + 1] = (Math.random() - 0.5) * 0.012
        velocities[i3 + 2] = (Math.random() - 0.5) * 0.006

        const col = palette[Math.floor(Math.random() * palette.length)]
        colors[i3]     = col.r
        colors[i3 + 1] = col.g
        colors[i3 + 2] = col.b

        sizes[i] = Math.random() * 1.4 + 0.4
      }

      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      geo.setAttribute('color',    new THREE.BufferAttribute(colors, 3))
      geo.setAttribute('size',     new THREE.BufferAttribute(sizes, 1))

      const mat = new THREE.PointsMaterial({
        size: 0.6,
        vertexColors: true,
        transparent: true,
        opacity: 0.75,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })

      const particles = new THREE.Points(geo, mat)
      scene.add(particles)

      // ── Connection lines (nearby particles) ──────
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x2b9fff,
        transparent: true,
        opacity: 0.06,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })

      // ── Nebula blobs (large soft spheres) ────────
      const blobGeo = new THREE.SphereGeometry(28, 32, 32)
      const blobMat = new THREE.MeshBasicMaterial({
        color: 0x00d4ff,
        transparent: true,
        opacity: 0.018,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
      const blob1 = new THREE.Mesh(blobGeo, blobMat)
      blob1.position.set(40, 20, -30)
      scene.add(blob1)

      const blob2 = new THREE.Mesh(
        new THREE.SphereGeometry(22, 32, 32),
        new THREE.MeshBasicMaterial({ color: 0x5b2be0, transparent: true, opacity: 0.025, blending: THREE.AdditiveBlending, depthWrite: false })
      )
      blob2.position.set(-50, -15, -20)
      scene.add(blob2)

      // ── Mouse interaction ─────────────────────────
      const mouse = { x: 0, y: 0 }
      const handleMouseMove = (e: MouseEvent) => {
        mouse.x = (e.clientX / window.innerWidth  - 0.5) * 0.3
        mouse.y = (e.clientY / window.innerHeight - 0.5) * 0.3
      }
      window.addEventListener('mousemove', handleMouseMove)

      // ── Scroll ────────────────────────────────────
      let scrollY = 0
      const handleScroll = () => { scrollY = window.scrollY }
      window.addEventListener('scroll', handleScroll)

      // ── Resize ────────────────────────────────────
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
      }
      window.addEventListener('resize', handleResize)

      // ── Animate ───────────────────────────────────
      let t = 0
      const posAttr = geo.attributes.position as THREE.BufferAttribute

      function animate() {
        animId = requestAnimationFrame(animate)
        t += 0.005

        // drift particles
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          const i3 = i * 3
          posAttr.array[i3]     += velocities[i3]
          posAttr.array[i3 + 1] += velocities[i3 + 1]
          posAttr.array[i3 + 2] += velocities[i3 + 2]

          // wrap around
          if (posAttr.array[i3]     >  100) posAttr.array[i3]     = -100
          if (posAttr.array[i3]     < -100) posAttr.array[i3]     =  100
          if (posAttr.array[i3 + 1] >  100) posAttr.array[i3 + 1] = -100
          if (posAttr.array[i3 + 1] < -100) posAttr.array[i3 + 1] =  100
        }
        posAttr.needsUpdate = true

        // rotate whole field slowly
        particles.rotation.y = t * 0.04 + mouse.x
        particles.rotation.x = mouse.y * 0.5

        // blobs pulse
        blob1.scale.setScalar(1 + Math.sin(t * 0.7) * 0.08)
        blob2.scale.setScalar(1 + Math.sin(t * 0.5 + 1) * 0.06)
        blob1.position.y = 20 + Math.sin(t * 0.4) * 8
        blob2.position.y = -15 + Math.sin(t * 0.3 + 2) * 6

        // camera drift with scroll
        camera.position.y = -scrollY * 0.01
        camera.position.x = mouse.x * 5

        renderer.render(scene, camera)
      }
      animate()

      return () => {
        cancelAnimationFrame(animId)
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('scroll', handleScroll)
        window.removeEventListener('resize', handleResize)
        renderer.dispose()
        geo.dispose()
        mat.dispose()
      }
    }

    const cleanup = init()
    return () => { cleanup.then(fn => fn?.()) }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}
