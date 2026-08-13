import Prism from './components/Prism.tsx'
import TextType from './components/TextType.tsx'
import AccordionGallery from './components/AccordionGallery'

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

const galleryItems = [
  { video: '/videos/reel-1.mp4', image: 'https://picsum.photos/id/1015/900/1200', label: 'KFC', link: '#' },
  { video: '/videos/reel-2.mp4', image: 'https://picsum.photos/id/1018/900/1200', label: 'MCdonalds', link: '#' },
  { video: '/videos/reel-3.mp4', image: 'https://picsum.photos/id/1039/900/1200', label: 'TAYO', link: '#' },
  { video: '/videos/reel-4.mp4', image: 'https://picsum.photos/id/1043/900/1200', label: 'AESPA', link: '#' },
  { video: '/videos/reel-5.mp4', image: 'https://picsum.photos/id/1044/900/1200', label: 'TWICE', link: '#' },
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

          <div className="rounded-[28px] border border-white/10 bg-black/30 p-3 shadow-[0_30px_80px_rgba(0,0,0,0.5)] backdrop-blur-sm md:p-4">
            <AccordionGallery
              items={galleryItems}
              defaultIndex={2}
              expandRatio={0.52}
              trigger="hover"
              height={520}
              gap={12}
              radius={20}
              accentColor="#f5f5f5"
              overlayColor="#060010"
              textColor="#ffffff"
              grayscale={true}
              showLabels={true}
              duration={0.6}
              ease="power3.out"
              parallax={0.5}
              tilt={8}
              stagger={0.06}
            />
          </div>
        </section>
      </div>
    </main>
  )
}

export default App

