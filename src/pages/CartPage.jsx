import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const heading = { fontFamily: 'Bebas Neue', color: '#fff', letterSpacing: '0.08em' }
const body = { fontFamily: 'Noto Serif JP', color: '#b7b7b7' }

export default function CartPage() {
  const navigate = useNavigate()
  const { items, removeItem, updateQty, total } = useCart()
  const shipping = total > 1000 ? 0 : total > 0 ? 49 : 0
  const grandTotal = total + shipping

  if (items.length === 0) {
    return (
      <main
        style={{
          minHeight: '100vh',
          paddingTop: '64px',
          background: '#000',
          display: 'grid',
          placeItems: 'center',
          textAlign: 'center',
          paddingInline: '1rem',
        }}
      >
        <div>
          <h1 style={{ ...heading, fontSize: 'clamp(2.5rem,8vw,5rem)' }}>YOUR ARSENAL IS EMPTY</h1>
          <Link
            to="/"
            style={{
              display: 'inline-block',
              marginTop: '1rem',
              background: '#d4a847',
              color: '#000',
              textDecoration: 'none',
              borderRadius: '2px',
              padding: '12px 16px',
              fontFamily: 'Bebas Neue',
              letterSpacing: '0.2em',
            }}
          >
            RETURN TO FORGE
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main style={{ minHeight: '100vh', paddingTop: '64px', background: '#000', color: '#fff' }}>
      <section
        style={{
          padding: '2.5rem 5vw',
          display: 'grid',
          gap: '1.5rem',
          gridTemplateColumns: 'minmax(0,1fr) minmax(280px,360px)',
        }}
      >
        <div>
          <h1 style={{ ...heading, fontSize: 'clamp(2.5rem,7vw,4.5rem)', marginBottom: '1rem' }}>
            YOUR ARSENAL
          </h1>
          <div style={{ display: 'grid', gap: '0.8rem' }}>
            {items.map((item) => (
              <article
                key={item.id}
                style={{ border: '1px solid #1f1f1f', background: '#080808', padding: '1rem' }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    flexWrap: 'wrap',
                  }}
                >
                  <div>
                    <p style={{ ...heading, fontSize: '1.4rem' }}>{item.name}</p>
                    <p style={body}>${item.price.toLocaleString()}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <button
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      style={{ background: '#111', color: '#fff', border: '1px solid #333', padding: '6px 12px' }}
                    >
                      -
                    </button>
                    <span style={{ ...heading, fontSize: '1.5rem' }}>{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      style={{ background: '#111', color: '#fff', border: '1px solid #333', padding: '6px 12px' }}
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      style={{
                        background: 'transparent',
                        color: '#d4a847',
                        border: '1px solid #d4a847',
                        padding: '6px 12px',
                        fontFamily: 'Bebas Neue',
                        letterSpacing: '0.14em',
                      }}
                    >
                      REMOVE
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside style={{ border: '1px solid #1f1f1f', background: '#080808', padding: '1rem', alignSelf: 'start' }}>
          <h2 style={{ ...heading, fontSize: '2rem' }}>ORDER SUMMARY</h2>
          <p style={{ ...body, marginTop: '1rem' }}>Subtotal: ${total.toLocaleString()}</p>
          <p style={{ ...body, marginTop: '0.4rem' }}>
            Shipping: {shipping === 0 ? 'Free on orders over $1,000' : `$${shipping}`}
          </p>
          <p style={{ ...heading, fontSize: '1.7rem', marginTop: '1rem' }}>
            TOTAL: ${grandTotal.toLocaleString()}
          </p>
          <button
            onClick={() => navigate('/checkout')}
            style={{
              width: '100%',
              marginTop: '1rem',
              background: '#d4a847',
              color: '#000',
              border: 'none',
              borderRadius: '2px',
              padding: '12px 16px',
              fontFamily: 'Bebas Neue',
              letterSpacing: '0.2em',
            }}
          >
            PROCEED TO CHECKOUT
          </button>
          <button
            onClick={() => navigate('/')}
            style={{
              width: '100%',
              marginTop: '0.7rem',
              background: 'transparent',
              color: '#d4a847',
              border: '1px solid #d4a847',
              borderRadius: '2px',
              padding: '12px 16px',
              fontFamily: 'Bebas Neue',
              letterSpacing: '0.2em',
            }}
          >
            CONTINUE SHOPPING
          </button>
        </aside>
      </section>
    </main>
  )
}
