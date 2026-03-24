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
