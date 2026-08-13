import Prism from './components/Prism.tsx'
import TextType from './components/TextType.tsx'
import DriftWall from './components/DriftWall'

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

const introText = `Hey! I'm May David.
A 17-year-old video editor from Israel crafting visual stories. Whether it is a fast-paced K-Pop edit or a polished commercial campaign, I turn raw footage into captivating content.`

const driftItems = [
  { image: 'https://picsum.photos/id/1015/600/400', title: 'Peaks', href: 'https://example.com/one' },
  { image: 'https://picsum.photos/id/1025/600/400', title: 'Pup', href: 'https://example.com/two' },
  { image: 'https://picsum.photos/id/1039/600/400', title: 'Falls', href: 'https://example.com/three' },
  { image: 'https://picsum.photos/id/1043/600/400', title: 'Motion', href: 'https://example.com/four' },
  { image: 'https://picsum.photos/id/1044/600/400', title: 'Noise', href: 'https://example.com/five' },
  { image: 'https://picsum.photos/id/1050/600/400', title: 'Frame', href: 'https://example.com/six' },
  { image: 'https://picsum.photos/id/1062/600/400', title: 'Pulse', href: 'https://example.com/seven' },
  { image: 'https://picsum.photos/id/1069/600/400', title: 'Echo', href: 'https://example.com/eight' },
  { image: 'https://picsum.photos/id/1074/600/400', title: 'Shift', href: 'https://example.com/nine' },
  { image: 'https://picsum.photos/id/1080/600/400', title: 'Glow', href: 'https://example.com/ten' },
  { image: 'https://picsum.photos/id/1084/600/400', title: 'Current', href: 'https://example.com/eleven' },
  { image: 'https://picsum.photos/id/106/600/400', title: 'Bloom', href: 'https://example.com/twelve' },
  { image: 'https://picsum.photos/id/110/600/400', title: 'Wave', href: 'https://example.com/thirteen' },
  { image: 'https://picsum.photos/id/133/600/400', title: 'Night', href: 'https://example.com/fourteen' },
  { image: 'https://picsum.photos/id/164/600/400', title: 'Signal', href: 'https://example.com/fifteen' },
]

function App() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-[#04030a] text-white">
      <div className="fixed inset-0 z-0">
        <Prism {...prismConfig} />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20 pt-10 md:px-10 md:pt-14">
        <section>
          <TextType
            as="h1"
            text={introText}
            className="max-w-4xl whitespace-pre-wrap text-xl font-medium leading-relaxed text-white md:text-3xl"
            loop={false}
            showCursor={true}
            typingSpeed={50}
            initialDelay={200}
          />
        </section>

        <section className="mt-12 md:mt-20">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-white/60">Selected work</p>
              <h2 className="mt-2 text-2xl font-semibold text-white md:text-4xl">Video showcase</h2>
            </div>
          </div>

          <div className="h-[460px] overflow-hidden rounded-[28px] border border-white/10 bg-black/30 shadow-[0_30px_80px_rgba(0,0,0,0.5)] backdrop-blur-sm md:h-[620px]">
            <DriftWall
              items={driftItems}
              columns={5}
              tileWidth={200}
              tileHeight={132}
              gap={18}
              tilt={16}
              turn={-14}
              perspective={1200}
              depth={120}
              speed={42}
              direction="up"
              variance={0.45}
              parallax={0.6}
              lift={64}
              fade={0.6}
              dim={0.55}
              overlayColor="#060010"
            />
          </div>
        </section>
      </div>
    </main>
  )
}

export default App

