

import { Link } from "react-router-dom"
import FeaturedWork from "../components/FeaturedWork"
import ScrollReveal from "../components/ScrollReveal"



function Home() {

  return (
    <div>

      {/* HERO */}

      <section className="relative flex min-h-screen items-center overflow-hidden">

        {/* Background */}

        <div className="absolute inset-0">

          <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="absolute right-0 top-1/2 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl" />

        </div>


        <div className="relative mx-auto max-w-7xl px-6 py-32 lg:px-8">

          <div className="max-w-4xl">

    <ScrollReveal direction="up">

            <p className="mb-6 text-sm font-medium uppercase tracking-[0.3em] text-cyan-400">
              AI Video Editor
            </p>
    </ScrollReveal>


<ScrollReveal
  direction="up"
  delay={0.1}
>

            <h1 className="max-w-5xl text-5xl font-bold tracking-[-0.04em] sm:text-6xl lg:text-8xl">

              Turning ideas into
              <span className="block text-slate-400">
                visual stories.
              </span>

            </h1>
</ScrollReveal>

<ScrollReveal
  direction="up"
  delay={0.2}
>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-400">
              I create AI-powered videos, product advertisements,
              cinematic visuals, and social media content designed
              to capture attention.
            </p>
</ScrollReveal>


<ScrollReveal
  direction="up"
  delay={0.3}
>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">

              <Link
                to="/portfolio"
                className="rounded-full bg-white px-7 py-3.5 text-center text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                >
                View My Work
              </Link>


              <Link
                to="/contact"
                className="rounded-full border border-white/10 px-7 py-3.5 text-center text-sm font-semibold text-white transition hover:border-white/30"
                >
                Let's Work Together
              </Link>

            </div>
                </ScrollReveal>

              <ScrollReveal
  direction="up"
  delay={0.4}
>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-600">



  <span>
    AI-powered production
  </span>

  <span>
    •
  </span>

  <span>
    Short-form content
  </span>

  <span>
    •
  </span>

  <span>
    Product advertising
  </span>

</div>
</ScrollReveal>

          </div>

        </div>

      </section>



      <FeaturedWork />


      {/* SERVICES */}

      <section className="border-t border-white/10 py-28">


        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollReveal>

          <div>

            <p className="text-sm uppercase tracking-[0.25em] text-cyan-400">
              What I Do
            </p>

            <h2 className="mt-4 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
              Creative video solutions for modern brands.
            </h2>

          </div>

        </ScrollReveal>
          <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-4">


<ScrollReveal delay={0}>
<ServiceCard
              title="AI Video"
              description="AI-generated visuals and cinematic sequences."
            />
</ScrollReveal>

            
<ScrollReveal delay={0.1}>
<ServiceCard
              title="Product Ads"
              description="Short-form advertisements designed to sell."
            />
</ScrollReveal>
            
<ScrollReveal delay={0.2}>
<ServiceCard
              title="Social Media"
              description="Engaging content optimized for social platforms."
            />
</ScrollReveal>
            
<ScrollReveal delay={0.3}>
<ServiceCard
              title="Video Editing"
              description="Professional editing, pacing, transitions and sound."
            />
</ScrollReveal>
            

          </div>

        </div>

      </section>


      {/* CTA */}

      <section className="border-t border-white/10 py-32">

<ScrollReveal
  direction="up"
>


        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">

          <p className="text-sm uppercase tracking-[0.25em] text-cyan-400">
            Have a project?
          </p>


          <h2 className="mt-5 text-4xl font-bold sm:text-6xl">
            Let's create something
            <span className="text-slate-500">
              {" "}great.
            </span>
          </h2>


          <p className="mx-auto mt-6 max-w-xl text-slate-400">
            Tell me what you're working on and let's turn
            your idea into a compelling video.
          </p>


          <Link
            to="/contact"
            className="mt-10 inline-block rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            Start a Conversation
          </Link>

        </div>
</ScrollReveal>
      </section>

    </div>
  )
}


function ServiceCard({
  title,
  description,
}) {

  return (
    <div className="bg-slate-950 p-8">

      <div className="mb-12 flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-cyan-400">
        ✦
      </div>


      <h3 className="text-lg font-semibold">
        {title}
      </h3>


      <p className="mt-3 text-sm leading-6 text-slate-500">
        {description}
      </p>

    </div>
  )
}


export default Home