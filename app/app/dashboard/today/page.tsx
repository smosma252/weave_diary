import { listThisWeek } from "@/lib/mock/entries";
import { Topbar } from "../_components/shell/Topbar";
import { EntryList } from "../_components/entry/EntryList";

export default function TodayPage() {
  const entries = listThisWeek();

  return (
    <>
      <Topbar crumb="Today" />
      <main className="wd-main">
        <div className="meta" style={{ marginBottom: 8 }}>
          Thursday, the 17th of May
        </div>
        <h1 style={{ font: "var(--type-h1)", marginBottom: 6, letterSpacing: "-0.01em" }}>
          This week, in your own words
        </h1>
        <p
          style={{
            font: "var(--type-body)",
            color: "var(--fg-2)",
            marginBottom: 28,
          }}
        >
          Your latest entries — woven from 6 connected threads.
        </p>
        <EntryList entries={entries} />
      </main>
    </>
  );
}
