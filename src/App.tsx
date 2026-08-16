import { useEffect, useState } from 'react'
import Prism from './components/Prism.tsx'
import ScrollFloat from './components/ScrollFloat'
import AccordionGallery from './components/AccordionGallery'
import GooeyNav from './components/GooeyNav'
import ScrollReveal from './components/ScrollReveal'

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

const galleryItems = [
  { video: '/videos/camp-1.mov', label: 'Campaign 1', link: '#' },
  { video: '/videos/camp-2.mp4', label: 'Campaign 2', link: '#' },
  { video: '/videos/camp-7.mov', label: 'Campaign 3', link: '#' },
  { video: '/videos/camp-4.mp4', label: 'Campaign 4', link: '#' },
  { video: '/videos/camp-5.mp4', label: 'Campaign 5', link: '#' },
  { video: '/videos/camp-6.mp4', label: 'Campaign 6', link: '#' },
  { video: '/videos/camp-3.mov', label: 'Campaign 7', link: '#' },
]

function App() {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 768 : false)
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-[#04030a] text-white">
      <div className="fixed inset-0 z-0 bg-[#04030a]">
        {!isMobile && <Prism {...prismConfig} />}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20 pt-6 md:px-10 md:pt-8">
        <header className="mb-6 flex justify-center md:mb-8">
          <GooeyNav
            items={[
              { label: 'Home', href: '#home' },
              { label: 'About', href: '#about' },
              { label: 'Projects', href: '#projects' },
              { label: 'Contact', href: '#contact' },
            ]}
            particleCount={15}
            particleDistances={[90, 10]}
            particleR={100}
            initialActiveIndex={0}
            animationTime={600}
            timeVariance={300}
            colors={[1, 2, 3, 1, 2, 3, 1, 4]}
          />
        </header>

        <section id="home" className="mb-12 space-y-1 py-2 md:mb-16 md:space-y-3 md:py-8">
          <div className="flex min-h-[20vh] items-center justify-center sm:min-h-[24vh] md:min-h-[28vh]">
            <h2 className="m-0 text-center text-[clamp(2.5rem,17vw,10rem)] font-black leading-[0.85] tracking-[-0.06em] text-white drop-shadow-[0_0_18px_rgba(255,255,255,0.25)]">
              Lights
            </h2>
          </div>

          <div className="flex min-h-[24vh] items-center justify-center sm:min-h-[30vh] md:min-h-[40vh]">
            <ScrollFloat
              animationDuration={1}
              ease="back.inOut(2)"
              scrollStart="top 85%"
              scrollEnd="bottom 20%"
              stagger={0.04}
              containerClassName="!m-0 !text-center"
              textClassName="!text-[clamp(2.5rem,17vw,10rem)] !tracking-[-0.06em] !leading-[0.85] !font-black !text-white !drop-shadow-[0_0_18px_rgba(255,255,255,0.25)]"
            >
              Camera
            </ScrollFloat>
          </div>

          <div className="flex min-h-[24vh] items-center justify-center sm:min-h-[30vh] md:min-h-[40vh]">
            <ScrollFloat
              animationDuration={1}
              ease="back.inOut(2)"
              scrollStart="top 85%"
              scrollEnd="bottom 20%"
              stagger={0.04}
              containerClassName="!m-0 !text-center"
              textClassName="!text-[clamp(2.5rem,17vw,10rem)] !tracking-[-0.06em] !leading-[0.85] !font-black !text-white !drop-shadow-[0_0_18px_rgba(255,255,255,0.25)]"
            >
              Action!
            </ScrollFloat>
          </div>
        </section>

        <section id="about" className="mt-12 min-h-[70vh] py-12 md:mt-20 md:min-h-[80vh] md:py-20">
          <ScrollReveal
            enableBlur={true}
            baseOpacity={0.35}
            baseRotation={3}
            blurStrength={1.5}
            containerClassName="!m-0"
            textClassName="!mx-auto !max-w-4xl !text-white !font-medium !leading-relaxed !tracking-[-0.02em]"
          >
            Hi, I&apos;m May David, an 18-year-old video editor with a love for turning raw footage into stories that feel alive. I create content that blends rhythm, emotion, and visual clarity — from fast-paced K-pop edits to polished brand storytelling and social-first campaigns.
          </ScrollReveal>
        </section>

        <section id="projects" className="mt-12 md:mt-20">
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
              trigger={isMobile ? 'click' : 'hover'}
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

        <section id="contact" className="mt-16 pb-8 pt-12 md:mt-20 md:pb-12">
          <div className="rounded-[28px] border border-white/10 bg-white/5 px-6 py-8 text-center backdrop-blur-sm md:px-10">
            <p className="text-xs uppercase tracking-[0.35em] text-white/60">Let&apos;s create</p>
            <h2 className="mt-3 text-3xl font-semibold text-white md:text-5xl">Need a video that feels cinematic?</h2>
            <a
              href="mailto:maydavid137@gmail.com"
              className="mt-6 inline-block rounded-full border border-white/20 bg-white px-6 py-3 text-sm font-medium text-black transition hover:scale-[1.02]"
            >
              hello@maydavid.com
            </a>
          </div>
        </section>
      </div>
    </main>
  )
}

export default App

