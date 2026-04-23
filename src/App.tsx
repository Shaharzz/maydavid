import Prism from './components/Prism.tsx'

const prismConfig = {
  height: 4,
  baseWidth: 5.5,
  animationType: 'rotate3d',
  glow: 0.5,
  offset: { x: 0, y: 0 },
  noise: 0,
  transparent: true,
  scale: 3.6,
  hueShift: 0,
  colorFrequency: 1,
  hoverStrength: 2,
  inertia: 0.06,
  bloom: 1,
  suspendWhenOffscreen: false,
  timeScale: 0.1,
} as const

function App() {
  return <main className="h-screen w-screen overflow-hidden"><Prism {...prismConfig} /></main>
}

export default App

