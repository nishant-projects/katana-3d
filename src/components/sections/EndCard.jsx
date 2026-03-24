export default function EndCard() {
  return (
    <section style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingBottom: '10vh',
      position: 'relative',
      zIndex: 10,
      pointerEvents: 'none',
      textAlign: 'center',
    }}>
      <p style={{
        fontFamily: 'Noto Serif JP',
        fontSize: '0.75rem',
        letterSpacing: '0.5em',
        color: '#444',
        marginBottom: '1rem',
        fontWeight: 300,
      }}>Built with Three.js · React · GSAP</p>
      <p style={{
        fontFamily: 'Bebas Neue',
        fontSize: '1rem',
        letterSpacing: '0.4em',
        color: '#333',
      }}>
        @Nishant_vib
      </p>
    </section>
  )
}
