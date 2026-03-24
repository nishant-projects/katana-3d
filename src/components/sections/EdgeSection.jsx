import { useRef } from 'react'

export default function EdgeSection() {
  return (
    <section
      ref={useRef()}
      style={{
        height: '100dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '0 8vw',
        position: 'relative',
        zIndex: 10,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          maxWidth: '380px',
        }}
      >
        <p
          style={{
            fontFamily: 'Noto Serif JP',
            fontSize: '0.75rem',
            letterSpacing: '0.4em',
            color: '#8b0000',
            marginBottom: '1.2rem',
            textTransform: 'uppercase',
          }}
        >
          The Edge
        </p>
        <h2
          style={{
            fontFamily: 'Bebas Neue',
            fontSize: 'clamp(3rem, 8vw, 6.5rem)',
            lineHeight: 0.9,
            color: '#ffffff',
            letterSpacing: '0.05em',
            marginBottom: '2rem',
          }}
        >
          0.5mm
          <br />
          THIN
        </h2>
        <p
          style={{
            fontFamily: 'Noto Serif JP',
            fontSize: '0.85rem',
            lineHeight: 1.9,
            color: '#888',
            fontWeight: 300,
          }}
        >
          Thinner than a human fingernail.
          <br />
          Sharper than a surgeon's blade.
          <br />
          A geometry perfected over 1,000 years.
        </p>
      </div>
    </section>
  )
}
