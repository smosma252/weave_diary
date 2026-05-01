import DiaryDemo from './components/DiaryDemo';

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-50 w-full px-6 pt-4">
        <nav className="max-w-6xl mx-auto flex justify-between items-center px-8 py-3 bg-surface/40 backdrop-blur-xl border border-outline-variant/10 rounded-full shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary-container text-lg">auto_awesome</span>
            </div>
            <span className="text-xl font-headline-md italic text-primary tracking-tight group-hover:opacity-80 transition-opacity">
              WeaveDiary
            </span>
          </div>
          <div className="hidden md:flex gap-10">
            <a className="text-label-md uppercase tracking-widest text-primary hover:text-primary-fixed transition-colors duration-300" href="#">Features</a>
            <a className="text-label-md uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors duration-300" href="#">Process</a>
            <a className="text-label-md uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors duration-300" href="#">Pricing</a>
            <a className="text-label-md uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors duration-300" href="#">Library</a>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-label-md uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors px-4">
              Login
            </button>
            <button className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-label-md uppercase tracking-widest text-[11px] hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary/10">
              Begin Your Ritual
            </button>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-8">
        {/* Hero */}
        <section className="py-20 lg:py-32 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-variant/50 border border-outline-variant/30">
              <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse"></span>
              <span className="text-label-md font-label-md text-on-surface-variant uppercase tracking-widest">A New Ritual</span>
            </div>
            <h1 className="font-headline-xl text-headline-xl text-on-background max-w-md leading-tight hover-refine-animation">
              Where Digital Noise Becomes a{' '}
              <span className="italic-accent italic text-amber-600 font-serif">Diary</span>.
            </h1>
            <p className="text-body-lg font-body-lg text-on-surface-variant max-w-lg">
              Transform your chaotic digital footprint into a curated narrative. WeaveDiary weaves your
              scattered notifications, meetings, and thoughts into an intentional daily journal.
            </p>
            <div className="flex gap-4 pt-4">
              <button className="bg-amber-600 text-on-primary px-8 py-4 rounded-xl font-bold text-body-md hover:bg-amber-500 transition-all shadow-[0_0_20px_rgba(217,119,6,0.2)]">
                Start Your Journal
              </button>
              <button className="border border-outline-variant text-on-background px-8 py-4 rounded-xl font-bold text-body-md hover:bg-surface-variant transition-all">
                Watch the Ritual
              </button>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-10 bg-amber-600/5 rounded-[3rem] blur-3xl"></div>
            <div className="relative flex flex-col gap-6 p-4">
              {/* Top card */}
              <div className="relative z-30 transform hover:-translate-y-2 transition-transform duration-500 bg-surface-container border border-outline-variant/30 rounded-2xl p-8 shadow-2xl grain">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="font-headline-md text-on-surface">October 24, 2023</h3>
                  <span className="px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-[10px] uppercase tracking-widest text-secondary">
                    Reflective
                  </span>
                </div>
                <p className="font-headline-md italic text-on-surface-variant leading-relaxed">
                  &ldquo;The morning began with a flurry of creative momentum, eventually settling into a quiet
                  rhythm as the rain tapped against the glass...&rdquo;
                </p>
                <div className="mt-8 pt-6 border-t border-outline-variant/10 flex items-center gap-4">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full border-2 border-surface bg-surface-variant flex items-center justify-center">
                      <span className="material-symbols-outlined text-xs">mail</span>
                    </div>
                    <div className="w-8 h-8 rounded-full border-2 border-surface bg-surface-variant flex items-center justify-center">
                      <span className="material-symbols-outlined text-xs">calendar_today</span>
                    </div>
                  </div>
                  <span className="text-body-sm text-on-surface-variant/60 italic">Synthesized from 12 interactions</span>
                </div>
              </div>
              {/* Mid card */}
              <div className="absolute top-12 left-8 right-0 z-20 transform -rotate-2 bg-surface-container-low border border-outline-variant/20 rounded-2xl p-8 shadow-xl opacity-60">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-headline-md text-on-surface/40">October 23, 2023</h3>
                  <span className="px-3 py-1 rounded-full bg-amber-600/5 border border-amber-600/10 text-[10px] uppercase tracking-widest text-amber-600/40">
                    Productive
                  </span>
                </div>
                <p className="font-headline-md italic text-on-surface-variant/40">
                  &ldquo;A day defined by clarity. The chaos of previous weeks finally found its place in the grid...&rdquo;
                </p>
              </div>
              {/* Deep card */}
              <div className="absolute top-24 left-16 right-0 z-10 transform rotate-3 bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-8 shadow-lg opacity-30">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-headline-md text-on-surface/20">October 22, 2023</h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Connected Ecosystem */}
        <section className="py-24 relative overflow-hidden">
          <div className="text-center space-y-4 mb-20">
            <h2 className="font-headline-lg text-headline-lg text-on-background">Your Connected Ecosystem</h2>
            <p className="text-body-md font-body-md text-on-surface-variant max-w-2xl mx-auto">
              One central hub to calm the storm of integrations.
            </p>
          </div>
          <div className="relative max-w-4xl mx-auto aspect-square md:aspect-video flex items-center justify-center">
            {/* Flow lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
              <line className="text-amber-600 animate-flow" stroke="currentColor" strokeWidth="0.2" x1="50" y1="50" x2="25" y2="15" />
              <line className="text-amber-600 animate-flow" stroke="currentColor" strokeWidth="0.2" x1="50" y1="50" x2="66" y2="5" />
              <line className="text-amber-600 animate-flow" stroke="currentColor" strokeWidth="0.2" x1="50" y1="50" x2="0"  y2="50" />
              <line className="text-amber-600 animate-flow" stroke="currentColor" strokeWidth="0.2" x1="50" y1="50" x2="100" y2="50" />
              <line className="text-amber-600 animate-flow" stroke="currentColor" strokeWidth="0.2" x1="50" y1="50" x2="75" y2="85" />
            </svg>
            {/* Central hub */}
            <div className="z-10 w-32 h-32 rounded-full bg-amber-600/20 flex items-center justify-center border border-amber-600/50 cursor-pointer hover:scale-110 transition-transform duration-500 animate-hub-glow">
              <div className="w-20 h-20 rounded-full bg-amber-600 flex items-center justify-center text-on-primary">
                <span className="material-symbols-outlined text-4xl">auto_awesome</span>
              </div>
            </div>
            <div className="absolute inset-0 border border-outline-variant/20 rounded-full animate-[spin_30s_linear_infinite]"></div>
            <div className="absolute inset-16 border border-outline-variant/10 rounded-full animate-[spin_20s_linear_infinite_reverse]"></div>
            <div className="absolute top-10 left-1/4 w-12 h-12 rounded-xl bg-surface-container border border-outline-variant/30 flex items-center justify-center text-on-surface-variant hover:text-amber-500 hover:border-amber-500/50 transition-all animate-orbit-1">
              <span className="material-symbols-outlined">mail</span>
            </div>
            <div className="absolute bottom-10 right-1/4 w-12 h-12 rounded-xl bg-surface-container border border-outline-variant/30 flex items-center justify-center text-on-surface-variant hover:text-amber-500 hover:border-amber-500/50 transition-all animate-orbit-2">
              <span className="material-symbols-outlined">calendar_today</span>
            </div>
            <div className="absolute top-1/2 -left-6 w-12 h-12 rounded-xl bg-surface-container border border-outline-variant/30 flex items-center justify-center text-on-surface-variant hover:text-amber-500 hover:border-amber-500/50 transition-all animate-orbit-3">
              <span className="material-symbols-outlined">chat_bubble</span>
            </div>
            <div className="absolute top-1/2 -right-6 w-12 h-12 rounded-xl bg-surface-container border border-outline-variant/30 flex items-center justify-center text-on-surface-variant hover:text-amber-500 hover:border-amber-500/50 transition-all animate-orbit-4">
              <span className="material-symbols-outlined">task_alt</span>
            </div>
            <div className="absolute top-0 right-1/3 w-12 h-12 rounded-xl bg-surface-container border border-outline-variant/30 flex items-center justify-center text-on-surface-variant hover:text-amber-500 hover:border-amber-500/50 transition-all animate-orbit-5">
              <span className="material-symbols-outlined">music_note</span>
            </div>
          </div>
        </section>

        {/* Features bento grid */}
        <section className="py-24">
          <div className="grid md:grid-cols-12 grid-rows-2 gap-6 min-h-[600px]">
            <div className="md:col-span-8 bg-surface-container-low p-10 rounded-2xl border border-outline-variant/20 flex flex-col justify-between grain">
              <div className="max-w-md space-y-4">
                <span className="material-symbols-outlined text-amber-600 text-3xl">edit_note</span>
                <h3 className="font-headline-md text-headline-md text-on-background">Guided Intentions</h3>
                <p className="text-body-md font-body-md text-on-surface-variant">
                  WeaveDiary doesn&apos;t just record; it guides. Use thoughtful prompts to unravel your day and
                  find the clarity hidden beneath the noise.
                </p>
              </div>
              <div className="mt-12 overflow-hidden rounded-xl border border-outline-variant/10">
                <div className="bg-surface-dim p-4 flex gap-4 overflow-x-auto no-scrollbar">
                  <div className="flex-shrink-0 w-48 p-4 rounded-lg bg-surface-container border border-amber-600/20 prompt-card-pulse">
                    <p className="text-label-md text-amber-600 mb-2 uppercase">Morning</p>
                    <p className="text-body-sm text-on-surface">What is your one focus today?</p>
                  </div>
                  <div className="flex-shrink-0 w-48 p-4 rounded-lg bg-surface-container border border-outline-variant/20 prompt-card-pulse">
                    <p className="text-label-md text-on-surface-variant mb-2 uppercase">Reflection</p>
                    <p className="text-body-sm text-on-surface">What did you learn today?</p>
                  </div>
                  <div className="flex-shrink-0 w-48 p-4 rounded-lg bg-surface-container border border-outline-variant/20 prompt-card-pulse">
                    <p className="text-label-md text-on-surface-variant mb-2 uppercase">Gratitude</p>
                    <p className="text-body-sm text-on-surface">One small victory...</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-4 bg-surface-container p-10 rounded-2xl border border-outline-variant/20 flex flex-col items-center justify-center text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-tertiary-container/20 flex items-center justify-center text-tertiary sync-icon-breathe">
                <span className="material-symbols-outlined text-3xl">nest_eco_leaf</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-background">Silent Sync</h3>
              <p className="text-body-sm font-body-sm text-on-surface-variant">
                We bridge your apps without the interruptions. Background sync keeps your diary updated while
                you stay focused.
              </p>
            </div>

            <div className="md:col-span-4 relative group rounded-2xl overflow-hidden border border-outline-variant/20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 group-hover:opacity-60 group-hover:grayscale-0 transition-all duration-700"
                alt="A macro photography shot of an old fountain pen resting on a thick, cream-colored paper journal with amber ink."
                src="https://lh3.googleusercontent.com/aida/ADBb0ugcQlngGlYP4hJo138XFbfGfxlb0Ujg184T432QMMgwHAi-BPnJVhfuDV4DOZGuuwxGY3hlKbCCkMQSCNtlxYSz6DuiKy_OlU-VPL9ySmzkNx57qvZeo4d2OQm7TluiZGOk3X9BDnXN5pIZG2SdXdJ5ta_0HSn8ldfnoV737ZBXn_o_OtcAVkzTrzmGbjMSVFD84OwG6TqdpGY1XZIkq49Co6h13JnpkKoeW0bjl_geYxpBPY-7aHSzJdCkYg92RWNjaYsKMOxB"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-dim via-transparent to-transparent"></div>
              <div className="absolute bottom-0 p-10">
                <h3 className="font-headline-md text-headline-md text-on-background">Analog Soul</h3>
                <p className="text-body-sm font-body-sm text-on-surface-variant">
                  A digital experience that honors the tactile feel of traditional journaling.
                </p>
              </div>
            </div>

            <div className="md:col-span-8 bg-surface-container-low p-10 rounded-2xl border border-outline-variant/20 flex items-center gap-12 grain mood-board-container">
              <div className="flex-1 space-y-4">
                <h3 className="font-headline-md text-headline-md text-on-background">The Mood Board</h3>
                <p className="text-body-md font-body-md text-on-surface-variant">
                  Pin inspiration, voice memos, and photos. Our asymmetrical layout lets your thoughts breathe
                  and overlap naturally.
                </p>
              </div>
              <div className="flex-1 hidden sm:flex justify-end">
                <div className="relative w-48 h-48">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-surface-container-highest rounded-lg shadow-lg rotate-6 border border-outline-variant/20 mood-board-card card-1"></div>
                  <div className="absolute bottom-4 left-0 w-32 h-32 bg-surface-variant rounded-lg shadow-lg -rotate-12 border border-outline-variant/20 flex items-center justify-center mood-board-card card-2">
                    <span className="material-symbols-outlined text-amber-600/50 text-4xl">photo_library</span>
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-24 bg-surface-container-high rounded-lg shadow-xl border border-amber-600/30 flex flex-col p-3 gap-2 mood-board-card card-3">
                    <div className="w-full h-1 bg-amber-600/20 rounded-full"></div>
                    <div className="w-2/3 h-1 bg-amber-600/20 rounded-full"></div>
                    <div className="w-4/5 h-1 bg-amber-600/20 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-24">
          <div className="space-y-6 mb-16">
            <h2 className="font-headline-lg text-headline-lg text-primary">Use Cases</h2>
            <p className="text-body-md text-on-surface-variant max-w-2xl">
              You already use apps that track what you watch, listen to, play, and share. WeaveDiary turns that
              activity into a diary, automatically.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-surface-container p-8 rounded-2xl border border-outline-variant/20 relative group hover:border-amber-600/30 transition-all duration-500">
              <div className="w-12 h-1 bg-amber-600/60 rounded-full mb-8"></div>
              <h3 className="font-headline-md text-on-surface mb-4">Entertainment Diary</h3>
              <p className="text-body-sm text-on-surface-variant mb-8">Your entertainment life, automatically preserved.</p>
              <div className="flex gap-4 text-on-surface-variant/40 mb-12">
                <span className="material-symbols-outlined text-xl">play_circle</span>
                <span className="material-symbols-outlined text-xl">music_note</span>
                <span className="material-symbols-outlined text-xl">sports_esports</span>
              </div>
              <div className="flex items-center gap-2 text-amber-600 group-hover:gap-4 transition-all">
                <span className="text-label-md uppercase tracking-widest">Explore</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </div>
            </div>

            <div className="bg-surface-container p-8 rounded-2xl border border-outline-variant/20 relative group hover:border-teal-500/30 transition-all duration-500">
              <div className="w-12 h-1 bg-teal-500/60 rounded-full mb-8"></div>
              <h3 className="font-headline-md text-on-surface mb-4">Travel Diary</h3>
              <p className="text-body-sm text-on-surface-variant mb-8">Every trip written down before your flight home lands.</p>
              <div className="flex gap-4 text-on-surface-variant/40 mb-12">
                <span className="material-symbols-outlined text-xl">flight</span>
                <span className="material-symbols-outlined text-xl">map</span>
                <span className="material-symbols-outlined text-xl">photo_camera</span>
              </div>
              <div className="flex items-center gap-2 text-teal-500 group-hover:gap-4 transition-all">
                <span className="text-label-md uppercase tracking-widest">Explore</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </div>
            </div>

            <div className="bg-surface-container p-8 rounded-2xl border border-outline-variant/20 relative group hover:border-yellow-500/30 transition-all duration-500">
              <div className="w-12 h-1 bg-yellow-500/60 rounded-full mb-8"></div>
              <h3 className="font-headline-md text-on-surface mb-4">Developer Diary</h3>
              <p className="text-body-sm text-on-surface-variant mb-8">Your work, written up before the next standup starts.</p>
              <div className="flex gap-4 text-on-surface-variant/40 mb-12">
                <span className="material-symbols-outlined text-xl">code</span>
                <span className="material-symbols-outlined text-xl">terminal</span>
                <span className="material-symbols-outlined text-xl">integration_instructions</span>
              </div>
              <div className="flex items-center gap-2 text-yellow-500 group-hover:gap-4 transition-all">
                <span className="text-label-md uppercase tracking-widest">Explore</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Diary Demo */}
        <DiaryDemo />

        {/* CTA */}
        <section className="py-24 text-center">
          <div className="bg-surface-container py-20 px-8 rounded-3xl border border-outline-variant/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 text-amber-600/5 select-none font-serif italic text-9xl">
              Pause
            </div>
            <div className="relative z-10 max-w-2xl mx-auto space-y-8">
              <h2 className="font-headline-xl text-headline-xl text-on-background">Ready to find your focus?</h2>
              <p className="text-body-lg font-body-lg text-on-surface-variant italic">
                &ldquo;Sometimes the most productive thing you can do is breathe and write.&rdquo;
              </p>
              <button className="bg-primary-container text-on-primary-container px-10 py-5 rounded-full font-bold text-body-lg hover:scale-105 transition-transform shadow-[0_10px_30px_rgba(217,119,6,0.3)]">
                Begin Your Ritual
              </button>
              <p className="text-label-md font-label-md text-on-surface-variant uppercase tracking-widest">
                Join 5,000+ intentional minds
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full py-24 px-8 mt-12 bg-gradient-to-b from-background to-surface-container-lowest">
        <div className="max-w-6xl mx-auto">
          {/* Trust strip */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-24 py-12 border-y border-outline-variant/10">
            {[
              { icon: 'lock',     title: 'Encrypted',    sub: 'TLS 1.3 & AES-256' },
              { icon: 'block',    title: 'No AI Training', sub: 'Your data is private' },
              { icon: 'download', title: 'Export Anytime', sub: 'Markdown + YAML' },
              { icon: 'gpp_good', title: 'Compliant',    sub: 'GDPR & CCPA' },
              { icon: 'cloud',    title: 'Google Cloud', sub: 'Enterprise Security' },
              { icon: 'code',     title: 'Minimal LLM',  sub: 'Activity data only' },
            ].map(({ icon, title, sub }) => (
              <div key={title} className="space-y-3">
                <span className="material-symbols-outlined text-teal-500">{icon}</span>
                <h5 className="text-label-md font-bold text-on-surface">{title}</h5>
                <p className="text-[10px] text-on-surface-variant uppercase">{sub}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 items-start">
            <div className="md:col-span-1 space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                </div>
                <span className="text-xl font-headline-md italic text-primary">WeaveDiary</span>
              </div>
              <p className="text-body-sm text-on-surface-variant max-w-[240px]">
                Curating digital chaos into intentional narratives for the mindful professional.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-label-md uppercase tracking-widest text-on-surface">Experience</h4>
              <nav className="flex flex-col gap-3">
                <a className="text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Digital Garden</a>
                <a className="text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Analog Rituals</a>
                <a className="text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Case Studies</a>
              </nav>
            </div>
            <div className="space-y-4">
              <h4 className="text-label-md uppercase tracking-widest text-on-surface">Sanctuary</h4>
              <nav className="flex flex-col gap-3">
                <a className="text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Privacy First</a>
                <a className="text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Terms of Peace</a>
                <a className="text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Support Hub</a>
              </nav>
            </div>
            <div className="space-y-6">
              <h4 className="text-label-md uppercase tracking-widest text-on-surface">Stay Present</h4>
              <div className="flex gap-4">
                <a className="w-10 h-10 rounded-full border border-outline-variant/30 flex items-center justify-center text-on-surface-variant hover:border-primary hover:text-primary transition-all" href="#">
                  <span className="material-symbols-outlined text-xl">share</span>
                </a>
                <a className="w-10 h-10 rounded-full border border-outline-variant/30 flex items-center justify-center text-on-surface-variant hover:border-primary hover:text-primary transition-all" href="#">
                  <span className="material-symbols-outlined text-xl">podcasts</span>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-20 pt-8 border-t border-outline-variant/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-label-md text-on-surface-variant/60">
              &copy; 2024 WeaveDiary. All rights reserved.
            </p>
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-variant/30 border border-outline-variant/10">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
              <span className="text-[10px] uppercase tracking-widest text-on-surface-variant">System Status: Serene</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
