import Prism from './components/Prism.tsx'
import Masonry from './components/Masonry.tsx'
import TextType from './components/TextType.tsx'

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

const masonryItems = [
  {
    id: '1',
    img: 'https://picsum.photos/id/1015/900/1200',
    url: 'https://example.com/reel-1',
    height: 420,
  },
  {
    id: '2',
    img: 'https://picsum.photos/id/1011/900/1100',
    url: 'https://example.com/reel-2',
    height: 300,
  },
  {
    id: '3',
    img: 'https://picsum.photos/id/1020/900/1300',
    url: 'https://example.com/reel-3',
    height: 520,
  },
  {
    id: '4',
    img: 'https://picsum.photos/id/1025/900/1150',
    url: 'https://example.com/reel-4',
    height: 360,
  },
  {
    id: '5',
    img: 'https://picsum.photos/id/1035/900/1250',
    url: 'https://example.com/reel-5',
    height: 480,
  },
  {
    id: '6',
    img: 'https://picsum.photos/id/1041/900/1180',
    url: 'https://example.com/reel-6',
    height: 340,
  },
] as const

function App() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden">
      <div className="fixed inset-0 z-0">
        <Prism {...prismConfig} />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20 pt-10 md:px-10 md:pt-14">
        <TextType
          as="h1"
          text={introText}
          className="max-w-4xl whitespace-pre-wrap text-xl font-medium leading-relaxed text-white md:text-3xl"
          loop={false}
          showCursor={true}
          typingSpeed={50}
          initialDelay={200}
        />

        <div className="mt-12 rounded-2xl bg-black/20 backdrop-blur-[1px]">
          <Masonry
            items={[...masonryItems]}
            ease="power3.out"
            duration={0.6}
            stagger={0.05}
            animateFrom="bottom"
            scaleOnHover={true}
            hoverScale={0.95}
            blurToFocus={true}
            colorShiftOnHover={false}
          />
        </div>
      </div>

    </main>
  )
}

export default App

