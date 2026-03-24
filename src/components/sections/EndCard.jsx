export default function EndCard() {
  return (
    <section
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
          fontSize: '0.75rem',
          letterSpacing: '0.5em',
          color: '#a8a8a8',
          marginBottom: '1rem',
          fontWeight: 300,
        }}
      >
        Built with Three.js · React · GSAP
      </p>
      <p
        style={{
          fontFamily: 'Bebas Neue',
          fontSize: '1rem',
          letterSpacing: '0.4em',
          color: '#b5b5b5',
        }}
      >
        SHINKEN · MASTERCRAFT SERIES
      </p>
    </section>
  )
}
