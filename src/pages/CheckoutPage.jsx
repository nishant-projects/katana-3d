import { useState } from 'react'
import { useCart } from '../context/CartContext'

const heading = { fontFamily: 'Bebas Neue', color: '#fff', letterSpacing: '0.08em' }
const body = { fontFamily: 'Noto Serif JP', color: '#b7b7b7' }
const inputStyle = {
  width: '100%',
  background: '#0d0d0d',
  border: '1px solid #333',
  color: '#fff',
  padding: '12px 16px',
  fontFamily: 'Noto Serif JP',
  outline: 'none',
}

export default function CheckoutPage() {
  const { items, total, removeItem } = useCart()
  const [paymentMethod, setPaymentMethod] = useState('Credit Card')
  const [confirmed, setConfirmed] = useState(false)

  const shipping = total > 1000 ? 0 : total > 0 ? 49 : 0
  const grandTotal = total + shipping

  const placeOrder = (e) => {
    e.preventDefault()
    items.forEach((item) => removeItem(item.id))
    setConfirmed(true)
  }

  if (confirmed) {
    return (
      <main
        style={{
          minHeight: '100vh',
          paddingTop: '64px',
          background: '#000',
          color: '#fff',
          display: 'grid',
          placeItems: 'center',
          textAlign: 'center',
          paddingInline: '1rem',
        }}
      >
        <div>
          <h1 style={{ ...heading, fontSize: 'clamp(2.4rem,7vw,4.8rem)' }}>ORDER CONFIRMED</h1>
          <p style={{ ...body, marginTop: '0.8rem' }}>
            Your katana will be forged and shipped within 14 days.
          </p>
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
        <form onSubmit={placeOrder} style={{ display: 'grid', gap: '0.9rem' }}>
          <h1 style={{ ...heading, fontSize: 'clamp(2.2rem,6vw,4rem)' }}>CHECKOUT</h1>
          {[
            'Full Name',
            'Email',
            'Phone',
            'Street Address',
            'City',
            'State',
            'ZIP',
            'Country',
          ].map((label) => (
            <label key={label} style={body}>
              {label}
              <input required style={inputStyle} />
            </label>
          ))}

          <div>
            <p style={body}>Payment Method</p>
            {['Credit Card', 'Bank Transfer'].map((method) => (
              <label key={method} style={{ ...body, marginRight: '1rem' }}>
                <input
                  type="radio"
                  checked={paymentMethod === method}
                  onChange={() => setPaymentMethod(method)}
                />{' '}
                {method}
              </label>
            ))}
          </div>

          {paymentMethod === 'Credit Card' && (
            <div style={{ display: 'grid', gap: '0.8rem', gridTemplateColumns: '1fr 1fr 1fr' }}>
              <label style={body}>
                Card Number
                <input required style={inputStyle} />
              </label>
              <label style={body}>
                Expiry
                <input required style={inputStyle} />
              </label>
              <label style={body}>
                CVV
                <input required style={inputStyle} />
              </label>
            </div>
          )}

          <button
            type="submit"
            style={{
              background: '#d4a847',
              color: '#000',
              border: 'none',
              borderRadius: '2px',
              padding: '12px 16px',
              fontFamily: 'Bebas Neue',
              letterSpacing: '0.2em',
              marginTop: '0.7rem',
            }}
          >
            PLACE ORDER
          </button>
        </form>

        <aside style={{ border: '1px solid #1f1f1f', background: '#080808', padding: '1rem', alignSelf: 'start' }}>
          <h2 style={{ ...heading, fontSize: '2rem' }}>ORDER SUMMARY</h2>
          {items.length === 0 ? (
            <p style={{ ...body, marginTop: '0.7rem' }}>Your cart is currently empty.</p>
          ) : (
            items.map((item) => (
              <p key={item.id} style={{ ...body, marginTop: '0.6rem' }}>
                {item.name} × {item.qty}
              </p>
            ))
          )}
          <p style={{ ...body, marginTop: '1rem' }}>Subtotal: ${total.toLocaleString()}</p>
          <p style={body}>Shipping: {shipping === 0 ? 'Free' : `$${shipping}`}</p>
          <p style={{ ...heading, fontSize: '1.6rem', marginTop: '0.8rem' }}>
            TOTAL: ${grandTotal.toLocaleString()}
          </p>
        </aside>
      </section>
    </main>
  )
}
