interface TopbarProps {
  crumb: string;
}

export function Topbar({ crumb }: TopbarProps) {
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
    </header>
  );
}
