import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useCart } from '../context/CartContext'

const product = {
  id: 'silent-blade',
  name: 'THE SILENT BLADE',
  price: 2499,
  finishes: ['Polished Steel', 'Blackened Finish', 'Damascus Pattern'],
  specs: [
    ['Blade length', '73cm (28.7 in)'],
    ['Overall length', '103cm (40.5 in)'],
    ['Steel', 'Tamahagane'],
    ['Handle', 'Ray skin (Same) wrap'],
  ],
}

const related = [
  { name: 'THE SHOGUN', price: 3299 },
  { name: 'THE RONIN', price: 1899 },
  { name: 'THE APPRENTICE', price: 899 },
]

const bodyText = { fontFamily: 'Noto Serif JP', color: '#b7b7b7' }
const headingText = { fontFamily: 'Bebas Neue', color: '#fff', letterSpacing: '0.06em' }

export default function ProductPage() {
  const navigate = useNavigate()
  const { addItem } = useCart()
  const [finish, setFinish] = useState(product.finishes[0])
  const [qty, setQty] = useState(1)

  const addToCart = () => {
    for (let i = 0; i < qty; i += 1) {
      addItem({ id: `${product.id}-${finish}`, name: `${product.name} — ${finish}`, price: product.price })
    }
  }

  return (
    <main style={{ background: '#000', minHeight: '100vh', paddingTop: '64px', color: '#fff' }}>
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))',
          gap: '2.5rem',
          padding: '3rem 5vw',
          alignItems: 'start',
        }}
      >
        <div>
          <p style={{ ...bodyText, letterSpacing: '0.3em', fontSize: '0.75rem', color: '#d4a847' }}>
            MASTER FORGED SERIES
          </p>
          <h1 style={{ ...headingText, fontSize: 'clamp(3rem,9vw,7rem)', lineHeight: 0.9, margin: '0.5rem 0 1.5rem' }}>
            {product.name}
          </h1>
          <p style={{ ...bodyText, maxWidth: '520px', lineHeight: 1.9, fontSize: '0.95rem' }}>
            Forged for collectors who demand performance, history, and uncompromising craft. The Silent
            Blade blends timeless Japanese sword making with premium finishing options for modern display
            and ceremonial use.
          </p>

          <table style={{ width: '100%', marginTop: '2rem', borderCollapse: 'collapse', maxWidth: '560px' }}>
            <tbody>
              {product.specs.map(([label, value]) => (
                <tr key={label}>
                  <td
                    style={{
                      ...bodyText,
                      color: '#9f9f9f',
                      borderBottom: '1px solid #1d1d1d',
                      padding: '0.9rem 0',
                      letterSpacing: '0.08em',
                    }}
                  >
                    {label}
                  </td>
                  <td
                    style={{
                      ...bodyText,
                      color: '#fff',
                      borderBottom: '1px solid #1d1d1d',
                      padding: '0.9rem 0',
                      textAlign: 'right',
                    }}
                  >
                    {value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <aside style={{ border: '1px solid #1f1f1f', padding: '1.5rem', background: '#080808' }}>
          <p style={{ ...headingText, fontSize: '2.2rem' }}>${product.price.toLocaleString()}</p>

          <label style={{ ...bodyText, display: 'block', marginTop: '1rem' }}>Finish</label>
          <select
            value={finish}
            onChange={(e) => setFinish(e.target.value)}
            style={{
              width: '100%',
              marginTop: '0.4rem',
              background: '#0d0d0d',
              border: '1px solid #333',
              color: '#fff',
              padding: '12px 16px',
              fontFamily: 'Noto Serif JP',
            }}
          >
            {product.finishes.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <label style={{ ...bodyText, display: 'block', marginTop: '1rem' }}>Quantity</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.4rem' }}>
            <button
              onClick={() => setQty((v) => Math.max(1, v - 1))}
              style={{ background: '#111', color: '#fff', border: '1px solid #333', padding: '8px 12px' }}
            >
              -
            </button>
            <span style={{ ...headingText, fontSize: '1.6rem', minWidth: '2ch', textAlign: 'center' }}>
              {qty}
            </span>
            <button
              onClick={() => setQty((v) => v + 1)}
              style={{ background: '#111', color: '#fff', border: '1px solid #333', padding: '8px 12px' }}
            >
              +
            </button>
          </div>

          <div style={{ display: 'grid', gap: '0.7rem', marginTop: '1.3rem' }}>
            <button
              onClick={addToCart}
              style={{
                background: '#d4a847',
                color: '#000',
                border: 'none',
                borderRadius: '2px',
                padding: '12px 16px',
                fontFamily: 'Bebas Neue',
                letterSpacing: '0.2em',
              }}
            >
              ADD TO CART
            </button>
            <button
              onClick={() => {
                addToCart()
                navigate('/checkout')
              }}
              style={{
                background: 'transparent',
                color: '#d4a847',
                border: '1px solid #d4a847',
                borderRadius: '2px',
                padding: '12px 16px',
                fontFamily: 'Bebas Neue',
                letterSpacing: '0.2em',
              }}
            >
              BUY NOW
            </button>
          </div>
        </aside>
      </section>

      <section style={{ padding: '1rem 5vw 4rem' }}>
        <h2 style={{ ...headingText, fontSize: '2.2rem', marginBottom: '1rem' }}>RELATED PRODUCTS</h2>
        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))' }}>
          {related.map((item) => (
            <Link
              key={item.name}
              to="/product"
              style={{
                border: '1px solid #1f1f1f',
                textDecoration: 'none',
                padding: '1rem',
                background: '#080808',
              }}
            >
              <p style={{ ...headingText, fontSize: '1.4rem' }}>{item.name}</p>
              <p style={{ ...bodyText, color: '#d4a847' }}>${item.price.toLocaleString()}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
