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

export default function CustomizePage() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <main style={{ minHeight: '100vh', paddingTop: '64px', background: '#000', color: '#fff' }}>
      <section style={{ padding: '2.5rem 5vw' }}>
        <h1 style={{ ...heading, fontSize: 'clamp(2.5rem,7vw,4.8rem)' }}>COMMISSION YOUR BLADE</h1>

        {submitted ? (
          <p style={{ ...body, marginTop: '1rem' }}>
            REQUEST RECEIVED — Our master swordsmith will contact you within 3 business days.
          </p>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setSubmitted(true)
            }}
            style={{ marginTop: '1.2rem', display: 'grid', gap: '0.85rem', maxWidth: '760px' }}
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
              Blade Length
              <select style={inputStyle} defaultValue="73cm">
                <option>60cm</option>
                <option>70cm</option>
                <option>73cm</option>
                <option>Custom</option>
              </select>
            </label>
            <label style={body}>
              Steel Type
              <select style={inputStyle} defaultValue="Tamahagane">
                <option>Tamahagane</option>
                <option>Damascus</option>
                <option>High Carbon</option>
              </select>
            </label>
            <label style={body}>
              Handle Wrap
              <select style={inputStyle} defaultValue="Ray skin">
                <option>Ray skin</option>
                <option>Silk</option>
                <option>Cotton</option>
              </select>
            </label>
            <label style={body}>
              Guard Style
              <select style={inputStyle} defaultValue="Traditional">
                <option>Traditional</option>
                <option>Modern</option>
                <option>None</option>
              </select>
            </label>
            <label style={body}>
              Engraving (max 20 chars)
              <input maxLength={20} style={inputStyle} />
            </label>
            <label style={body}>
              Budget Range
              <select style={inputStyle}>
                <option>$500-$1k</option>
                <option>$1k-$3k</option>
                <option>$3k+</option>
              </select>
            </label>
            <label style={body}>
              Additional Notes
              <textarea rows={5} style={inputStyle} />
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
                marginTop: '0.3rem',
              }}
            >
              SUBMIT REQUEST
            </button>
          </form>
        )}
      </section>
    </main>
  )
}
