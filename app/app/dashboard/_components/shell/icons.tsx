// Pure icon primitives — no client boundary needed.

export const NAV_ICONS: Record<string, string> = {
  today:
    "M4 6h16M4 12h16M4 18h10",
  weave:
    "M12 3v6 M12 15v6 M5 12h2 M17 12h2 M7 7l1.5 1.5 M16.5 7L15 8.5 M7 17l1.5-1.5 M16.5 17L15 15.5",
  reports:
    "M4 19V5 M9 19v-8 M14 19v-12 M19 19V9",
  threads:
    "M5 12c4 0 4-6 8-6s4 12 8 12",
  goals:
    "M12 3a9 9 0 100 18 9 9 0 000-18z M12 8v4l3 2",
  ask:
    "M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z",
  settings:
    "M12 8a4 4 0 100 8 4 4 0 000-8z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z",
};

export type IconName = keyof typeof NAV_ICONS;

interface IconProps {
  name: IconName;
}

export function Icon({ name }: IconProps) {
  return (
    <svg viewBox="0 0 24 24">
      <path d={NAV_ICONS[name]} />
    </svg>
  );
}
