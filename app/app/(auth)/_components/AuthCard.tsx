interface AuthCardProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  footer?: React.ReactNode;
  children: React.ReactNode;
}

export function AuthCard({ eyebrow, title, subtitle, footer, children }: AuthCardProps) {
  return (
    <div
      className="wd-card"
      style={{
        width: "100%",
        maxWidth: 420,
        padding: "32px 32px 28px",
      }}
    >
      <div className="eyebrow" style={{ marginBottom: 8 }}>
        {eyebrow}
      </div>
      <h1
        style={{
          font: "var(--type-h2)",
          letterSpacing: "var(--tracking-tight)",
          color: "var(--fg-1)",
          marginBottom: subtitle ? 8 : 24,
          textWrap: "balance",
        }}
      >
        {title}
      </h1>
      {subtitle && (
        <p
          style={{
            font: "var(--type-body)",
            color: "var(--fg-2)",
            marginBottom: 24,
            textWrap: "pretty",
          }}
        >
          {subtitle}
        </p>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {children}
      </div>
      {footer && (
        <div
          style={{
            marginTop: 24,
            paddingTop: 16,
            borderTop: "1px solid var(--border-hairline)",
            font: "var(--type-body-sm)",
            color: "var(--fg-3)",
            textAlign: "center",
          }}
        >
          {footer}
        </div>
      )}
    </div>
  );
}

export function AuthDivider({ label = "or" }: { label?: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        margin: "4px 0",
      }}
    >
      <div style={{ flex: 1, height: 1, background: "var(--border-hairline)" }} />
      <span
        style={{
          font: "var(--type-meta)",
          textTransform: "uppercase",
          letterSpacing: "var(--tracking-meta)",
          color: "var(--fg-3)",
        }}
      >
        {label}
      </span>
      <div style={{ flex: 1, height: 1, background: "var(--border-hairline)" }} />
    </div>
  );
}
