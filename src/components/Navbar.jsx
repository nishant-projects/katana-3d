import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const linkStyle = {
  fontFamily: 'Noto Serif JP',
  fontSize: '0.75rem',
  letterSpacing: '0.2em',
  color: '#888',
  textTransform: 'uppercase',
  textDecoration: 'none',
}

export default function Navbar() {
  const { count } = useCart()

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '64px',
        zIndex: 100,
        background: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <nav
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 1.25rem',
          gap: '1rem',
        }}
      >
        <Link
          to="/"
          style={{
            fontFamily: 'Bebas Neue',
            fontSize: '1.6rem',
            letterSpacing: '0.3em',
            color: '#fff',
            textDecoration: 'none',
            lineHeight: 1,
          }}
        >
          SHINKEN
        </Link>

        <div className="navbar-center-links" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link to="/product" style={linkStyle}>
            Products
          </Link>
          <Link to="/customize" style={linkStyle}>
            Customize
          </Link>
          <Link to="/contact" style={linkStyle}>
            Contact
          </Link>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
          <Link
            to="/cart"
            style={{
              color: '#fff',
              textDecoration: 'none',
              position: 'relative',
              fontSize: '1.1rem',
              lineHeight: 1,
            }}
            aria-label="Cart"
          >
            🛒
            <span
              style={{
                position: 'absolute',
                top: '-10px',
                right: '-10px',
                width: '18px',
                height: '18px',
                borderRadius: '999px',
                background: '#d4a847',
                color: '#000',
                fontFamily: 'Bebas Neue',
                fontSize: '0.7rem',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {count}
            </span>
          </Link>

          <span style={{ width: '1px', height: '22px', background: 'rgba(255,255,255,0.18)' }} />

          <Link
            to="/product"
            style={{
              background: '#d4a847',
              color: '#000',
              textDecoration: 'none',
              fontFamily: 'Bebas Neue',
              letterSpacing: '0.2em',
              padding: '0.5rem 0.75rem',
              borderRadius: '2px',
              fontSize: '0.9rem',
              whiteSpace: 'nowrap',
            }}
          >
            BUY NOW
          </Link>
        </div>
      </nav>
    </header>
  )
}
