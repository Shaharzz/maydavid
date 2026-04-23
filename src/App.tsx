import { ArrowRight, Clapperboard, Scissors, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from './components/ui/button.tsx'

const services = [
  {
    icon: Scissors,
    title: 'Social Reels Editing',
    description: 'Fast, scroll-stopping short-form cuts optimized for retention and engagement.',
  },
  {
    icon: Clapperboard,
    title: 'YouTube Story Editing',
    description: 'Narrative pacing, sound design, and clean transitions for long-form content.',
  },
  {
    icon: Sparkles,
    title: 'Brand Visual Polish',
    description: 'Color grading, captions, and motion graphics for a consistent brand look.',
  },
]

function App() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 pb-20 pt-24 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex w-fit items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-1.5 text-sm text-violet-200"
        >
          Built for a video editor portfolio
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.08 }}
          className="max-w-3xl"
        >
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-white md:text-6xl">
            Creative edits that keep viewers watching.
          </h1>
          <p className="mt-6 text-lg text-slate-300">
            This starter is ready for reactbits.dev components with Framer Motion and Tailwind prewired.
            Replace sections with your chosen blocks as you go.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap items-center gap-4"
        >
          <Button size="lg">Watch Showreel</Button>
          <Button intent="secondary" size="lg">
            Contact for Projects
          </Button>
        </motion.div>

        <section className="grid gap-5 md:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon

            return (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6"
              >
                <Icon className="h-5 w-5 text-violet-300" />
                <h2 className="mt-4 text-xl font-medium text-white">{service.title}</h2>
                <p className="mt-2 text-slate-300">{service.description}</p>
              </motion.article>
            )
          })}
        </section>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-violet-400/30 bg-gradient-to-r from-violet-500/15 to-fuchsia-500/15 p-8"
        >
          <p className="text-sm uppercase tracking-[0.2em] text-violet-200">Next Step</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">Drop in your first ReactBits hero section</h3>
          <p className="mt-3 max-w-2xl text-slate-300">
            Pick one component from reactbits.dev and place it above this block to kick off the final design.
          </p>
          <a
            href="https://reactbits.dev"
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-violet-200 transition hover:text-violet-100"
          >
            Browse ReactBits
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </section>
    </main>
  )
}

export default App

