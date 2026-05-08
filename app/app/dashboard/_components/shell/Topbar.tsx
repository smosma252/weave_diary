import { createClient } from "@/lib/supabase/server";

interface TopbarProps {
  crumb: string;
}

export async function Topbar({ crumb }: TopbarProps) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const meta = (user?.user_metadata ?? {}) as {
    full_name?: string;
    avatar_url?: string;
  };
  const displayName = meta.full_name || user?.email || "";
  const initial = (displayName.trim()[0] ?? "?").toUpperCase();

  return (
    <header className="wd-top">
      <span className="crumb">{crumb}</span>
      <div className="search">
        <svg viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="6" />
          <path d="M16 16l4 4" />
        </svg>
        <span>Search your diary…</span>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginLeft: 4,
        }}
      >
        <div
          aria-hidden
          style={{
            width: 28,
            height: 28,
            borderRadius: "var(--radius-pill)",
            background: meta.avatar_url
              ? `center / cover no-repeat url(${meta.avatar_url})`
              : "var(--color-madder-tint)",
            color: "var(--color-madder-deep)",
            font: "var(--type-meta)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid var(--border)",
          }}
        >
          {!meta.avatar_url && initial}
        </div>
        <span
          style={{
            font: "var(--type-body-sm)",
            color: "var(--fg-2)",
            maxWidth: 180,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {displayName}
        </span>
        <form action="/auth/sign-out" method="post" style={{ display: "flex" }}>
          <button
            type="submit"
            className="btn btn-ghost"
            style={{ padding: "6px 10px", font: "var(--type-body-sm)" }}
            aria-label="Sign out"
            title="Sign out"
          >
            Sign out
          </button>
        </form>
      </div>
    </header>
  );
}
