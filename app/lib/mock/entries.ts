import type { Entry } from "./types";

export const ENTRIES: Entry[] = [
  {
    id: "1",
    date: "Thu · 17 May",
    title: "A long afternoon",
    excerpt:
      "You shipped two pull requests, took a walk longer than thirty minutes, and went to bed before midnight.",
    threads: ["github", "calendar", "voice"],
    minutes: 4,
    mood: "calm",
    body: [
      "Thursday, the 17th — a quiet day with a long afternoon. The morning ran on email; by midday you'd cleared the inbox down to the last few stragglers and pushed the inbox-zero branch. The afternoon was for the long thing: you shipped feat/inbox-zero just after three, and the second PR — a small fix to the scheduler — went up an hour later.",
      "There was a walk in there too. A little over thirty minutes, by the calendar. You came back and made tea.",
      "Sam called in the evening, briefly. You sounded warm when you spoke about the trip. Bedtime was 11:38.",
    ],
    voice:
      "I think the week is settling. The thing with Sam felt good. I don't know — I might sleep well tonight.",
  },
  {
    id: "2",
    date: "Wed · 16 May",
    title: "The day Sam called",
    excerpt:
      "A good catch-up — there was warmth in your voice when you talked about the trip.",
    threads: ["slack", "voice", "mood"],
    minutes: 5,
    mood: "warm",
    body: [
      "Wednesday opened slowly — the morning was thin on calendar but full of half-finished Slack threads. You answered three of them before lunch, deferred two more.",
      "Sam called just after seven. Forty minutes, by the call log. The trip came up; so did the thing with their sister. You laughed twice in the recording — both times when Sam was the one making the joke.",
      "Voice note around 9:42 PM: short, half-thinking, mostly about feeling settled.",
    ],
    voice:
      "It was good to hear them. I forget how much that helps. I should call my mother this weekend.",
  },
  {
    id: "3",
    date: "Tue · 15 May",
    title: "Two reviews and a slow start",
    excerpt:
      "Quiet morning, then back-to-back reviews after lunch. Bedtime crept past one again.",
    threads: ["github", "calendar"],
    minutes: 3,
    body: [
      "A slow morning — you didn't open the laptop until almost ten. By eleven you'd written nothing and read three issues that didn't need reading.",
      "After lunch, two reviews back-to-back. The auth one was thorough; the other you marked LGTM with a question. Bedtime was 1:12.",
    ],
  },
  {
    id: "4",
    date: "Mon · 14 May",
    title: "Beginning of a steadier week",
    excerpt: "Forty minutes of reading before standup. The week opened with intent.",
    threads: ["calendar", "voice"],
    minutes: 4,
    mood: "focused",
    body: [
      "Forty minutes of reading before standup — the longest morning read in two weeks. You came into Monday already half-warm.",
      "The day held. No fires. Bedtime 11:50.",
    ],
    voice:
      "If I can keep the mornings, the rest takes care of itself. Just the mornings.",
  },
  {
    id: "5",
    date: "Sun · 13 May",
    title: "Long walk, no laptop",
    excerpt:
      "No commits, no email, no Slack. The longest walk of the month so far.",
    threads: ["calendar"],
    minutes: 2,
    mood: "rested",
    body: [
      "Two hours and eleven minutes on foot, by the calendar. The phone stayed in the pocket. You came home and read until it got dark.",
    ],
  },
  {
    id: "6",
    date: "Sat · 12 May",
    title: "A loose Saturday",
    excerpt:
      "Coffee, the bookshop, a long phone call with your mother. Nothing that asked for a reply.",
    threads: ["voice"],
    minutes: 3,
    mood: "easy",
    body: [
      "You bought two books and read neither of them. The call with your mother ran fifty-eight minutes — she said the garden is doing better this year.",
    ],
  },
  {
    id: "7",
    date: "Fri · 11 May",
    title: "The Friday that almost slipped",
    excerpt:
      "Three meetings stacked before lunch and a deploy that needed rolling back. You got there.",
    threads: ["github", "slack", "calendar"],
    minutes: 5,
    body: [
      "The 9 AM ran long, which made the 10 AM run short, which meant the 11 AM started with you still half in the previous conversation. By lunch you were behind on the only thing that mattered.",
      "The deploy at 4:30 went sideways — a nullable column nobody had remembered. You rolled back at 4:47 and were home by six.",
    ],
  },
  {
    id: "8",
    date: "Thu · 10 May",
    title: "A good editing day",
    excerpt:
      "More deletions than additions across three repos. The diff felt better at the end of the day than the beginning.",
    threads: ["github"],
    minutes: 4,
    mood: "focused",
  },
  {
    id: "9",
    date: "Wed · 9 May",
    title: "Where the week tilted",
    excerpt:
      "The big design review landed well. You took notes longer than the meeting itself.",
    threads: ["calendar", "voice"],
    minutes: 4,
    mood: "warm",
    voice:
      "I was nervous going in and I shouldn't have been. The plan is the plan.",
  },
  {
    id: "10",
    date: "Tue · 8 May",
    title: "Two coffees, one walk",
    excerpt:
      "Half the day in deep work, half in the kind of meetings that don't need you to be there.",
    threads: ["calendar"],
    minutes: 3,
  },
  {
    id: "11",
    date: "Mon · 7 May",
    title: "A reset, of sorts",
    excerpt:
      "Cleared the desk, cleared the inbox, cleared one whole label of stale issues.",
    threads: ["github", "calendar"],
    minutes: 4,
    mood: "focused",
  },
  {
    id: "12",
    date: "Sun · 6 May",
    title: "Rain and a long book",
    excerpt:
      "You didn't leave the flat until evening. The book was better than you remembered.",
    threads: ["voice"],
    minutes: 2,
    mood: "rested",
    voice:
      "I keep forgetting that doing nothing is also doing something.",
  },
];

export function getEntry(id: string): Entry | undefined {
  return ENTRIES.find((e) => e.id === id);
}

export function listEntries(): Entry[] {
  return ENTRIES;
}

export function listThisWeek(): Entry[] {
  return ENTRIES.slice(0, 5);
}

export function groupEntriesByMonth(entries: Entry[]): { month: string; entries: Entry[] }[] {
  const groups = new Map<string, Entry[]>();
  for (const e of entries) {
    const month = monthFromDate(e.date);
    const list = groups.get(month) ?? [];
    list.push(e);
    groups.set(month, list);
  }
  return Array.from(groups.entries()).map(([month, entries]) => ({ month, entries }));
}

function monthFromDate(date: string): string {
  // "Thu · 17 May" → "May"
  const parts = date.split("·").map((p) => p.trim());
  if (parts.length < 2) return date;
  const tokens = parts[1].split(" ");
  return tokens[tokens.length - 1] ?? date;
}
