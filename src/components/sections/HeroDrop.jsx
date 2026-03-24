import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function HeroDrop() {
  const ref = useRef()

  useEffect(() => {
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out', delay: 0.2 }
    )

    gsap.to(ref.current, {
      opacity: 0,
      scrollTrigger: {
        trigger: ref.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })
  }, [])

  return (
    <section
      ref={ref}
      style={{
        height: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 10,
        pointerEvents: 'none',
        textAlign: 'center',
      }}
    >
      <p
        style={{
          fontFamily: 'Noto Serif JP',
          fontSize: '1.2rem',
          letterSpacing: '0.5em',
          color: '#b8b8b8',
          marginBottom: '1rem',
          fontWeight: 300,
        }}
      >
        鋼 — 手作り
      </p>
      <h1
        style={{
          fontFamily: 'Bebas Neue',
          fontSize: 'clamp(4rem, 12vw, 10rem)',
          letterSpacing: '0.08em',
          color: '#ffffff',
          lineHeight: 0.9,
          textShadow: '0 0 80px rgba(255,255,255,0.1)',
        }}
      >
        FORGED
        <br />
        IN SILENCE
      </h1>
      <p
        style={{
          fontFamily: 'Noto Serif JP',
          fontSize: '0.85rem',
          letterSpacing: '0.3em',
          color: '#a8a8a8',
          marginTop: '2rem',
          fontWeight: 300,
        }}
      >
        SCROLL TO WITNESS
      </p>
      <div
        style={{
          width: '1px',
          height: '60px',
          background: 'linear-gradient(to bottom, #9a9a9a, transparent)',
          margin: '1.5rem auto 0',
          animation: 'pulse 2s ease-in-out infinite',
        }}
      />
    </section>
  )
}
