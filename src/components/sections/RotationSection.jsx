import { useRef } from 'react'

export default function RotationSection() {
  return (
    <section style={{
      height: '200vh',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      position: 'relative',
      zIndex: 10,
      pointerEvents: 'none',
    }}>
      <div style={{
        position: 'sticky',
        top: '20vh',
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: 'Noto Serif JP',
          fontSize: '0.75rem',
          letterSpacing: '0.4em',
          color: '#d4a847',
          marginBottom: '1rem',
          textTransform: 'uppercase',
        }}>The Form</p>
        <h2 style={{
          fontFamily: 'Bebas Neue',
          fontSize: 'clamp(3.5rem, 10vw, 8rem)',
          lineHeight: 0.9,
          color: '#ffffff',
          letterSpacing: '0.05em',
        }}>
          EVERY ANGLE<br/>PERFECT
        </h2>
        <p style={{
          fontFamily: 'Noto Serif JP',
          fontSize: '0.8rem',
          color: '#555',
          marginTop: '1.5rem',
          letterSpacing: '0.3em',
          fontWeight: 300,
        }}>
          三ヶ月 — THREE MONTHS OF FORGING
        </p>
      </div>
    </section>
  )
}
