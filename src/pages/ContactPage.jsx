import { useState } from 'react'

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

export default function ContactPage() {
  const [sent, setSent] = useState(false)

  return (
    <main style={{ minHeight: '100vh', paddingTop: '64px', background: '#000', color: '#fff' }}>
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))',
          gap: '2rem',
          padding: '2.5rem 5vw',
        }}
      >
        <div>
          <h1 style={{ ...heading, fontSize: 'clamp(2.5rem,7vw,4.8rem)' }}>SHINKEN</h1>
          <p style={{ ...body, lineHeight: 1.9, maxWidth: '520px', marginTop: '0.8rem' }}>
            High-end Japanese sword house delivering forged collector-grade blades globally. Every order
            is handled with artisan oversight and discreet white-glove logistics.
          </p>
          <div style={{ marginTop: '1.3rem', display: 'grid', gap: '0.45rem' }}>
            <p style={body}>17 Blade District, Kyoto, Japan</p>
            <p style={body}>forge@shinken.jp</p>
            <p style={body}>+81 75 000 0000</p>
            <p style={body}>Business Hours: Mon - Sat, 10:00 - 19:00 JST</p>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            setSent(true)
          }}
          style={{ border: '1px solid #1f1f1f', background: '#080808', padding: '1rem', display: 'grid', gap: '0.85rem' }}
        >
          <label style={body}>
            Name
            <input required style={inputStyle} />
          </label>
          <label style={body}>
            Email
            <input required type="email" style={inputStyle} />
          </label>
          <label style={body}>
            Subject
            <select required style={inputStyle}>
              <option>Order Inquiry</option>
              <option>Custom Commission</option>
              <option>General</option>
              <option>Press</option>
            </select>
          </label>
          <label style={body}>
            Message
            <textarea required rows={6} style={inputStyle} />
          </label>
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
            }}
          >
            SEND MESSAGE
          </button>
          {sent && (
            <p style={{ ...body, color: '#d4a847' }}>
              Message sent successfully — our forge concierge will reply shortly.
            </p>
          )}
        </form>
      </section>
    </main>
  )
}
