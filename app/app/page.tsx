import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <NavBar />
      <Hero />
      <HowItWorks />
      <Threads />
      <Quote />
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
      <a href="#reports" style={navLink}>Reports</a>
      <a href="#pricing" style={navLink}>Pricing</a>
      <Link href="/dashboard" className="btn btn-secondary" style={{ marginLeft: 8 }}>
        Sign in
      </Link>
      <a href="#cta" className="btn btn-primary">Begin weaving</a>
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
    <div style={{ position: "relative", height: 460 }}>
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
        <div className="meta" style={{ margin: 0 }}>Thursday, 17 May · 6 threads</div>
        <h3
          style={{
            font: "600 26px/1.2 var(--font-serif)",
            letterSpacing: "-0.01em",
            color: "var(--fg-1)",
            marginTop: 6,
          }}
        >
          A long afternoon
        </h3>
        <div style={{ font: "400 17px/1.6 var(--font-serif)", color: "var(--fg-1)", marginTop: 16, textWrap: "pretty" }}>
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
          <br />
          <br />
          Sam called in the evening, briefly.{" "}
          <em style={{ color: "var(--color-madder-deep)", fontStyle: "italic" }}>
            You sounded warm when you spoke about the trip.
          </em>{" "}
          Bedtime was 11:38.
        </div>
        <div style={{ display: "flex", gap: 6, marginTop: 24, flexWrap: "wrap" }}>
          {["github", "calendar", "voice", "email"].map((t, i) => (
            <span key={t} className={"tag" + (i === 0 ? " acc" : "")}>
              {t}
            </span>
          ))}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: -24,
          top: 32,
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
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
          {steps.map((s) => (
            <div key={s.n}>
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
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {threads.map(([n, sub]) => (
              <div
                key={n}
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
      <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
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
      <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
        <h2 className="h-section" style={{ marginBottom: 18 }}>
          Begin weaving — it&rsquo;s free for thirty days.
        </h2>
        <p className="lede" style={{ margin: "0 auto 32px" }}>
          Connect a thread or two, leave a voice note tonight, and read your first entry tomorrow morning.
        </p>
        <form style={{ display: "flex", gap: 8, maxWidth: 460, margin: "0 auto" }}>
          <input
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
