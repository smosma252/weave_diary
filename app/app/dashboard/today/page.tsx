import { requireUser } from "@/lib/supabase/auth";
import { getEntryByDate, listThisWeek } from "@/lib/db/entries";
import { startTodayEntry } from "@/lib/actions/entries";
import { todayIso } from "@/lib/utils/dates";
import { Topbar } from "../_components/shell/Topbar";
import { EntryList } from "../_components/entry/EntryList";

export default async function TodayPage() {
  await requireUser();
  const [entries, today] = await Promise.all([
    listThisWeek(),
    getEntryByDate(todayIso()),
  ]);

  return (
    <>
      <Topbar crumb="Today" />
      <main className="wd-main">
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
          Your latest entries — woven from your connected threads.
        </p>

        {today === null && (
          <form action={startTodayEntry} style={{ marginBottom: 28 }}>
            <div
              className="wd-card"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
              }}
            >
              <div>
                <h3 style={{ font: "var(--type-h3)", marginBottom: 4 }}>
                  No entry yet for today
                </h3>
                <div className="meta">Write today&apos;s first lines.</div>
              </div>
              <button type="submit" className="btn btn-primary">
                Write today&apos;s entry
              </button>
            </div>
          </form>
        )}

        {entries.length === 0 ? (
          <p
            style={{
              font: "var(--type-prose-sm)",
              fontStyle: "italic",
              color: "var(--fg-3)",
              textAlign: "center",
              padding: "48px 0",
            }}
          >
            Your week is quiet so far. Once you write or connect a thread, your entries land here.
          </p>
        ) : (
          <EntryList entries={entries} />
        )}
      </main>
    </>
  );
}
