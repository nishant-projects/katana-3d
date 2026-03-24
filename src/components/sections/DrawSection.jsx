export default function DrawSection() {
  return (
    <section
      style={{
        height: '100vh',
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
          maxWidth: '400px',
        }}
      >
        <p
          style={{
            fontFamily: 'Noto Serif JP',
            fontSize: '0.75rem',
            letterSpacing: '0.4em',
            color: '#d4a847',
            marginBottom: '1rem',
            textTransform: 'uppercase',
          }}
        >
          The Draw
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
          抜刀
          <br />
          NUKITSUKE
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
          The art of the draw.
          <br />
          Strike and sheathe in a single breath.
        </p>
      </div>
    </section>
  )
}
