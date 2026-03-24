import Scene from './components/Scene'
import './styles/global.css'

function App() {
  return (
    <div>
      <Scene />
      <div className="scroll-container">
        <section style={{height: '200vh'}}></section>
        <section style={{height: '200vh'}}></section>
        <section style={{height: '200vh'}}></section>
        <section style={{height: '200vh'}}></section>
        <section style={{height: '200vh'}}></section>
        <section style={{height: '200vh'}}></section>
      </div>
    </div>
  )
}

export default App
