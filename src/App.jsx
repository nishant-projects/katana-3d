import Scene from './components/Scene'
import HeroDrop from './components/sections/HeroDrop'
import BladeSection from './components/sections/BladeSection'
import EdgeSection from './components/sections/EdgeSection'
import RotationSection from './components/sections/RotationSection'
import DrawSection from './components/sections/DrawSection'
import EndCard from './components/sections/EndCard'

function App() {
  return (
    <div style={{ background: '#000000' }}>
      <Scene />
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.85) 100%)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)',
          zIndex: 3,
          pointerEvents: 'none',
        }}
      />
      <div className="scroll-container">
        <HeroDrop />
        <BladeSection />
        <EdgeSection />
        <RotationSection />
        <DrawSection />
        <EndCard />
      </div>
    </div>
  )
}

export default App
