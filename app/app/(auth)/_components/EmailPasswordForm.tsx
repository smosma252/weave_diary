import type { CSSProperties } from "react";

interface EmailPasswordFormProps {
  mode: "sign-in" | "sign-up";
  action: (formData: FormData) => void | Promise<void>;
  next?: string;
  defaultEmail?: string;
  errorMessage?: string;
}

export function EmailPasswordForm({
  mode,
  action,
  next,
  defaultEmail,
  errorMessage,
}: EmailPasswordFormProps) {
  const isSignUp = mode === "sign-up";

  return (
    <form
      action={action}
      style={{ display: "flex", flexDirection: "column", gap: 12 }}
    >
      {next && <input type="hidden" name="next" value={next} />}

      {isSignUp && (
        <Field label="Your name">
          <input
            name="full_name"
            type="text"
            autoComplete="name"
            placeholder="Ada Lovelace"
            style={inputStyle}
          />
        </Field>
      )}

      <Field label="Email">
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          defaultValue={defaultEmail}
          placeholder="you@somewhere.com"
          style={inputStyle}
        />
      </Field>

      <Field label="Password">
        <input
          name="password"
          type="password"
          autoComplete={isSignUp ? "new-password" : "current-password"}
          required
          minLength={isSignUp ? 8 : undefined}
          placeholder={isSignUp ? "at least 8 characters" : ""}
          style={inputStyle}
        />
      </Field>

      {errorMessage && (
        <p
          style={{
            font: "var(--type-body-sm)",
            color: "var(--danger)",
            background: "var(--danger-bg)",
            padding: "8px 12px",
            borderRadius: "var(--radius-sm)",
            margin: 0,
          }}
        >
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        className="btn btn-primary"
        style={{ width: "100%", justifyContent: "center", padding: "12px 20px", marginTop: 4 }}
      >
        {isSignUp ? "Begin weaving" : "Sign in"}
      </button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span
        style={{
          font: "var(--type-label)",
          color: "var(--fg-2)",
        }}
      >
        {label}
      </span>
      {children}
    </label>
  );
}

const inputStyle: CSSProperties = {
  width: "100%",
  font: "var(--type-body)",
  padding: "11px 14px",
  border: "1px solid var(--border-strong)",
  background: "var(--bg)",
  borderRadius: "var(--radius-sm)",
  color: "var(--fg-1)",
  outline: "none",
};
