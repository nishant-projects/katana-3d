import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

export default function BladeSection() {
  const ref = useRef()

  useEffect(() => {
    gsap.fromTo(
      ref.current.querySelectorAll('.reveal'),
      { opacity: 0, x: 60 },
      {
        opacity: 1,
        x: 0,
        stagger: 0.15,
        duration: 0.8,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 60%',
          end: 'top 30%',
          scrub: 1,
        },
      }
    )
  }, [])

  return (
    <section
      ref={ref}
      style={{
        height: '200vh',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        padding: '0 8vw',
        position: 'relative',
        zIndex: 10,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          position: 'sticky',
          top: '40vh',
          textAlign: 'right',
          maxWidth: '420px',
        }}
      >
        <p
          className="reveal"
          style={{
            fontFamily: 'Noto Serif JP',
            fontSize: '0.75rem',
            letterSpacing: '0.4em',
            color: '#d4a847',
            marginBottom: '1.2rem',
            fontWeight: 400,
            textTransform: 'uppercase',
          }}
        >
          The Blade
        </p>
        <h2
          className="reveal"
          style={{
            fontFamily: 'Bebas Neue',
            fontSize: 'clamp(3rem, 8vw, 6.5rem)',
            lineHeight: 0.9,
            color: '#ffffff',
            letterSpacing: '0.05em',
            marginBottom: '2rem',
          }}
        >
          1,000
          <br />
          LAYERS
        </h2>
        <p
          className="reveal"
          style={{
            fontFamily: 'Noto Serif JP',
            fontSize: '0.85rem',
            lineHeight: 1.9,
            color: '#888',
            fontWeight: 300,
            letterSpacing: '0.05em',
          }}
        >
          Each fold doubles the layers.
          <br />
          1,000 folds. 10 months.
          <br />
          One swordsmith.
        </p>
        <div
          className="reveal"
          style={{
            marginTop: '2.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            alignItems: 'flex-end',
          }}
        >
          {[
            { label: 'Steel Type', value: 'Tamahagane' },
            { label: 'Carbon Content', value: '0.7%' },
            { label: 'Hardness (HRC)', value: '62' },
          ].map((stat) => (
            <div key={stat.label} style={{ display: 'flex', gap: '2rem', alignItems: 'baseline' }}>
              <span
                style={{
                  fontSize: '0.7rem',
                  letterSpacing: '0.2em',
                  color: '#555',
                  fontFamily: 'Noto Serif JP',
                }}
              >
                {stat.label}
              </span>
              <span
                style={{
                  fontSize: '1.4rem',
                  color: '#c0c0c0',
                  fontFamily: 'Bebas Neue',
                  letterSpacing: '0.1em',
                }}
              >
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
