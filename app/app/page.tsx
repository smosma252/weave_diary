import Link from "next/link";
import Image from "next/image";
import Demo from "./_components/Demo";

export default function Home() {
  return (
    <>
      <NavBar />
      <Hero />
      <HowItWorks />
      <Threads />
      <Demo />
      <Quote />
      <Pricing />
      <CTA />
      <Footer />
    </>
  );
}

function NavBar() {
  return (
    <nav
      className="mk-nav"
      style={{ height: 64, padding: "0 40px", display: "flex", alignItems: "center", gap: 28 }}
    >
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
        <Image src="/brand/logo-mark.svg" alt="" width={26} height={26} />
        <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 600, fontSize: 22, color: "var(--fg-1)" }}>
          WeaveDiary
        </span>
      </Link>
      <div style={{ flex: 1 }} />
      <a href="#how" style={navLink}>How it works</a>
      <a href="#threads" style={navLink}>Threads</a>
      <a href="#demo" style={navLink}>Try it</a>
      <a href="#pricing" style={navLink}>Pricing</a>
      <Link href="/sign-in" className="btn btn-secondary" style={{ marginLeft: 8 }}>
        Sign in
      </Link>
      <Link href="/sign-up" className="btn btn-primary">Begin weaving</Link>
    </nav>
  );
}

const navLink: React.CSSProperties = {
  color: "var(--fg-2)",
  textDecoration: "none",
  font: "var(--type-body)",
  whiteSpace: "nowrap",
};

function Hero() {
  return (
    <section style={{ padding: "80px 40px 64px" }}>
      <div
        style={{
          maxWidth: 1080,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr",
          gap: 56,
          alignItems: "center",
        }}
      >
        <div>
          <div className="eyebrow" style={{ marginBottom: 16 }}>A diary that writes itself</div>
          <h1 className="h-display">
            The week, woven from the threads of <em>your own life</em>.
          </h1>
          <p className="lede" style={{ marginTop: 24 }}>
            WeaveDiary listens to the tools you already use — email, GitHub, Slack, Discord, your calendar — and
            weaves them into a quiet, human diary, posted at the end of each day.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 32 }}>
            <a href="#cta" className="btn btn-primary" style={{ padding: "12px 22px", fontSize: 15 }}>
              Begin weaving — free
            </a>
            <a href="#how" className="btn btn-secondary" style={{ padding: "12px 22px", fontSize: 15 }}>
              See how it works
            </a>
          </div>
          <p style={{ font: "var(--type-caption)", color: "var(--fg-3)", marginTop: 16 }}>
            Free for thirty days · no card to start
          </p>
        </div>
        <HeroVisual />
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="hero-visual" style={{ position: "relative", height: 460 }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "var(--bg-elevated)",
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--border)",
          boxShadow: "var(--shadow-2)",
          padding: "32px 36px",
          overflow: "hidden",
        }}
      >
        <div className="meta hero-meta" style={{ margin: 0 }}>Thursday, 17 May · 6 threads</div>
        <h3
          className="hero-title"
          style={{
            font: "600 26px/1.2 var(--font-serif)",
            letterSpacing: "-0.01em",
            color: "var(--fg-1)",
            marginTop: 6,
          }}
        >
          A long afternoon<span className="hero-cursor" aria-hidden="true" />
        </h3>
        <div className="hero-body-a" style={{ font: "400 17px/1.6 var(--font-serif)", color: "var(--fg-1)", marginTop: 16, textWrap: "pretty" }}>
          Thursday, the 17th — a quiet day with a long afternoon. The morning ran on email; by midday you&rsquo;d
          cleared the inbox down to the last few stragglers and pushed the{" "}
          <code
            style={{
              font: "var(--type-mono-sm)",
              background: "var(--color-parchment-deep)",
              padding: "1px 5px",
              borderRadius: 3,
            }}
          >
            inbox-zero
          </code>{" "}
          branch.
        </div>
        <div className="hero-body-b" style={{ font: "400 17px/1.6 var(--font-serif)", color: "var(--fg-1)", marginTop: 12, textWrap: "pretty" }}>
          Sam called in the evening, briefly.{" "}
          <em style={{ color: "var(--color-madder-deep)", fontStyle: "italic" }}>
            You sounded warm when you spoke about the trip.
          </em>{" "}
          Bedtime was 11:38.
        </div>
        <div className="hero-tags" style={{ display: "flex", gap: 6, marginTop: 24, flexWrap: "wrap" }}>
          {["github", "calendar", "voice", "email"].map((t, i) => (
            <span key={t} className={"tag" + (i === 0 ? " acc" : "")}>
              {t}
            </span>
          ))}
        </div>
      </div>
      <div
        className="hero-badge"
        style={{
          position: "absolute",
          left: 225,
          top: -20,
          background: "var(--color-ink)",
          color: "var(--color-parchment-soft)",
          padding: "10px 14px",
          borderRadius: "var(--radius-sm)",
          boxShadow: "var(--shadow-2)",
          display: "flex",
          alignItems: "center",
          gap: 10,
          font: "var(--type-mono)",
        }}
      >
        <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--color-madder)" }} />
        new voice note · 9:42 PM
      </div>
    </div>
  );
}

function HowItWorks() {
  const steps = [
    {
      n: "01",
      t: "Connect your threads",
      d: "Email, GitHub, Slack, Discord, calendar — link the tools you already use. Read-only, scoped, and revocable.",
    },
    {
      n: "02",
      t: "Live your week",
      d: "WeaveDiary listens quietly in the background. Add a voice note when something's worth remembering.",
    },
    {
      n: "03",
      t: "Read your week",
      d: "At the end of each day, an entry posts to your diary. At week's end, a gentle reflection of how things went.",
    },
  ];
  return (
    <section id="how" style={{ padding: "96px 40px", background: "var(--color-parchment-deep)" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div className="eyebrow" style={{ marginBottom: 16 }}>How it works</div>
        <h2 className="h-section" style={{ marginBottom: 56, maxWidth: 700 }}>
          Three quiet steps. Then it just keeps weaving.
        </h2>
        <div className="wd-reveal-stagger" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
          {steps.map((s) => (
            <div key={s.n} className="wd-reveal">
              <div style={{ font: "var(--type-mono)", fontSize: 14, color: "var(--color-madder)", marginBottom: 14 }}>
                — {s.n}
              </div>
              <h3 style={{ font: "600 24px/1.25 var(--font-serif)", color: "var(--fg-1)", marginBottom: 10 }}>{s.t}</h3>
              <p style={{ font: "400 16px/1.55 var(--font-serif)", color: "var(--fg-2)", textWrap: "pretty" }}>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Threads() {
  const threads: Array<[string, string]> = [
    ["GitHub", "commits, PRs, issues"],
    ["Slack", "channels you choose"],
    ["Discord", "servers you choose"],
    ["Calendar", "meetings, busy time"],
    ["Email", "subjects only, never bodies"],
    ["Voice", "your own notes"],
  ];
  return (
    <section id="threads" style={{ padding: "96px 40px" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 56, alignItems: "start" }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>Threads</div>
            <h2 className="h-section">Six threads in. One diary out.</h2>
            <p className="lede" style={{ marginTop: 20 }}>
              Each integration is a thread. WeaveDiary picks them up gently — read-only, the minimum it needs — and
              weaves them into prose, never metrics.
            </p>
          </div>
          <div className="wd-reveal-stagger" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {threads.map(([n, sub]) => (
              <div
                key={n}
                className="wd-reveal"
                style={{
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-md)",
                  padding: "16px 18px",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: "var(--color-ink)",
                    color: "var(--color-parchment-soft)",
                    display: "grid",
                    placeItems: "center",
                    fontFamily: "var(--font-serif)",
                    fontWeight: 600,
                    flex: "none",
                  }}
                >
                  {n[0]}
                </div>
                <div>
                  <div style={{ font: "var(--type-body)", fontWeight: 500, color: "var(--fg-1)" }}>{n}</div>
                  <div style={{ font: "var(--type-caption)", color: "var(--fg-3)" }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Quote() {
  return (
    <section
      style={{
        padding: "96px 40px",
        background: "var(--color-ink)",
        color: "var(--color-parchment-soft)",
      }}
    >
      <div className="wd-reveal" style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
        <Image
          src="/brand/icon-thread.svg"
          alt=""
          width={56}
          height={56}
          style={{ marginBottom: 24, opacity: 0.9 }}
        />
        <p
          style={{
            font: "400 36px/1.3 var(--font-serif)",
            fontStyle: "italic",
            letterSpacing: "-0.01em",
            textWrap: "balance",
          }}
        >
          &ldquo;It&rsquo;s the first journal that didn&rsquo;t feel like homework. I open it on Sundays the way
          I&rsquo;d open a letter.&rdquo;
        </p>
        <div
          style={{
            marginTop: 28,
            font: "var(--type-meta)",
            textTransform: "uppercase",
            letterSpacing: "var(--tracking-meta)",
            color: "var(--color-loom-soft)",
          }}
        >
          Maya R · designer · using WeaveDiary for 7 months
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="cta" style={{ padding: "96px 40px 120px" }}>
      <div className="wd-reveal" style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
        <h2 className="h-section" style={{ marginBottom: 18 }}>
          Begin weaving — it&rsquo;s free for thirty days.
        </h2>
        <p className="lede" style={{ margin: "0 auto 32px" }}>
          Connect a thread or two, leave a voice note tonight, and read your first entry tomorrow morning.
        </p>
        <form
          action="/sign-up"
          method="get"
          style={{ display: "flex", gap: 8, maxWidth: 460, margin: "0 auto" }}
        >
          <input
            name="email"
            type="email"
            placeholder="you@somewhere.com"
            style={{
              flex: 1,
              font: "var(--type-body)",
              padding: "12px 14px",
              border: "1px solid var(--border-strong)",
              background: "var(--bg-elevated)",
              borderRadius: "var(--radius-sm)",
              color: "var(--fg-1)",
            }}
          />
          <button type="submit" className="btn btn-primary" style={{ padding: "12px 20px" }}>
            Begin weaving
          </button>
        </form>
        <p style={{ font: "var(--type-caption)", color: "var(--fg-3)", marginTop: 14 }}>
          No card · cancel anytime · your threads stay yours
        </p>
      </div>
    </section>
  );
}

function Pricing() {
  const plans = [
    {
      name: "Notebook",
      price: "$0",
      period: "free, forever",
      tag: null as string | null,
      tagline: "For the curious. Two threads, fourteen days at a glance.",
      features: [
        "Two connected threads",
        "Fourteen-day archive",
        "Daily entries · web & mobile",
        "Voice notes · 30 min / month",
        "Export anytime",
      ],
      cta: "Start a notebook",
      featured: false,
    },
    {
      name: "Diary",
      price: "$8",
      period: "per month",
      tag: "Most chosen",
      tagline: "The whole weave. All six threads, every week, every report.",
      features: [
        "All six threads",
        "Unlimited archive & search",
        "Weekly & monthly reflections",
        "Voice notes · 5 hrs / month",
        "Custom goals & gentle nudges",
        "Custom thread rules",
      ],
      cta: "Begin weaving",
      featured: true,
    },
    {
      name: "Atlas",
      price: "$18",
      period: "per month",
      tag: null as string | null,
      tagline: "For long memories. Multi-year reflections and unlimited voice.",
      features: [
        "Everything in Diary",
        "Multi-year reports & atlases",
        "Unlimited voice transcription",
        "Custom export formats",
        "Early access to new threads",
        "Priority support",
      ],
      cta: "Choose Atlas",
      featured: false,
    },
  ];

  return (
    <section id="pricing" style={{ padding: "96px 40px" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="eyebrow" style={{ marginBottom: 12 }}>Pricing</div>
          <h2 className="h-section" style={{ maxWidth: 640, margin: "0 auto" }}>
            One plan per pace of life.
          </h2>
          <p className="lede" style={{ margin: "16px auto 0" }}>
            Start free. Upgrade when your week starts to feel like more than fourteen days. Cancel any time.
          </p>
        </div>

        <div className="wd-reveal-stagger" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, alignItems: "stretch" }}>
          {plans.map((p) => (
            <div
              key={p.name}
              className="wd-reveal"
              style={{
                background: p.featured ? "var(--color-ink)" : "var(--bg-elevated)",
                color: p.featured ? "var(--color-parchment-soft)" : "var(--fg-1)",
                border: "1px solid " + (p.featured ? "var(--color-ink)" : "var(--border)"),
                borderRadius: "var(--radius-lg)",
                padding: "32px 28px",
                display: "flex",
                flexDirection: "column",
                gap: 18,
                boxShadow: p.featured ? "var(--shadow-2)" : "var(--shadow-1)",
                position: "relative",
              }}
            >
              {p.tag && (
                <div
                  style={{
                    position: "absolute",
                    top: -12,
                    left: 24,
                    background: "var(--color-madder)",
                    color: "var(--color-parchment-soft)",
                    padding: "4px 10px",
                    borderRadius: 999,
                    font: "var(--type-meta)",
                    textTransform: "uppercase",
                    letterSpacing: "var(--tracking-meta)",
                  }}
                >
                  {p.tag}
                </div>
              )}
              <div>
                <div style={{ font: "italic 600 22px/1.2 var(--font-serif)", marginBottom: 12 }}>{p.name}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                  <span style={{ font: "600 44px/1 var(--font-serif)", letterSpacing: "-0.02em" }}>{p.price}</span>
                  <span
                    style={{
                      font: "var(--type-mono)",
                      fontSize: 13,
                      color: p.featured ? "var(--color-loom-soft)" : "var(--fg-3)",
                    }}
                  >
                    {p.period}
                  </span>
                </div>
                <p
                  style={{
                    font: "italic 400 15px/1.5 var(--font-serif)",
                    color: p.featured ? "var(--color-loom-soft)" : "var(--fg-2)",
                    margin: "10px 0 0",
                    textWrap: "pretty",
                  }}
                >
                  {p.tagline}
                </p>
              </div>

              <div
                style={{
                  height: 1,
                  background: p.featured ? "rgba(244,239,230,0.16)" : "var(--border-hairline)",
                }}
              />

              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  flex: 1,
                }}
              >
                {p.features.map((f) => (
                  <li
                    key={f}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "auto 1fr",
                      gap: 10,
                      alignItems: "baseline",
                      font: "400 15px/1.45 var(--font-sans)",
                      color: p.featured ? "var(--color-parchment-soft)" : "var(--fg-1)",
                    }}
                  >
                    <span style={{ color: "var(--color-madder)", fontWeight: 600 }}>—</span>
                    <span style={{ minWidth: 0 }}>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#cta"
                className={"btn " + (p.featured ? "btn-primary" : "btn-secondary")}
                style={{
                  justifyContent: "center",
                  padding: "12px 18px",
                  ...(p.featured
                    ? {
                        background: "var(--color-parchment-soft)",
                        color: "var(--color-ink)",
                        borderColor: "var(--color-parchment-soft)",
                        fontWeight: 600,
                      }
                    : {}),
                }}
              >
                {p.cta}
              </a>
            </div>
          ))}
        </div>

        <p style={{ font: "var(--type-caption)", color: "var(--fg-3)", textAlign: "center", marginTop: 28 }}>
          All plans · end-to-end encrypted · your threads stay yours · cancel any time.
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border-hairline)", padding: "40px 40px 56px" }}>
      <div
        style={{
          maxWidth: 1080,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          gap: 24,
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Image src="/brand/logo-mark.svg" alt="" width={22} height={22} />
          <span style={{ font: "italic 600 16px var(--font-serif)" }}>WeaveDiary</span>
        </div>
        <span style={{ font: "var(--type-caption)", color: "var(--fg-3)" }}>© 2026 · Made quietly</span>
        <div style={{ marginLeft: "auto", display: "flex", gap: 22 }}>
          <a href="#" style={{ font: "var(--type-body-sm)", color: "var(--fg-2)", textDecoration: "none" }}>Privacy</a>
          <a href="#" style={{ font: "var(--type-body-sm)", color: "var(--fg-2)", textDecoration: "none" }}>Terms</a>
          <a href="#" style={{ font: "var(--type-body-sm)", color: "var(--fg-2)", textDecoration: "none" }}>Changelog</a>
        </div>
      </div>
    </footer>
  );
}
