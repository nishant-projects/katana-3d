import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

export default function HeroDrop() {
  const ref = useRef()

  useEffect(() => {
    gsap.fromTo(ref.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out', delay: 0.5 }
    )

    gsap.to(ref.current, {
      opacity: 0,
      scrollTrigger: {
        trigger: ref.current,
        start: 'top top',
        end: '30% top',
        scrub: true,
      }
    })
  }, [])

  return (
    <section
      ref={ref}
      style={{
        height: '200vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 10,
        pointerEvents: 'none',
      }}
    >
      <div style={{
        textAlign: 'center',
        position: 'sticky',
        top: '35vh',
      }}>
        <p style={{
          fontFamily: 'Noto Serif JP',
          fontSize: '1.2rem',
          letterSpacing: '0.5em',
          color: '#888',
          marginBottom: '1rem',
          fontWeight: 300,
        }}>
          鋼 — 手作り
        </p>
        <h1 style={{
          fontFamily: 'Bebas Neue',
          fontSize: 'clamp(4rem, 12vw, 10rem)',
          letterSpacing: '0.08em',
          color: '#ffffff',
          lineHeight: 0.9,
          textShadow: '0 0 80px rgba(255,255,255,0.1)',
        }}>
          FORGED<br/>IN SILENCE
        </h1>
        <p style={{
          fontFamily: 'Noto Serif JP',
          fontSize: '0.85rem',
          letterSpacing: '0.3em',
          color: '#555',
          marginTop: '2rem',
          fontWeight: 300,
        }}>
          SCROLL TO WITNESS
        </p>
        <div style={{
          width: '1px',
          height: '60px',
          background: 'linear-gradient(to bottom, #555, transparent)',
          margin: '1.5rem auto 0',
          animation: 'pulse 2s ease-in-out infinite',
        }} />
      </div>
    </section>
  )
}
