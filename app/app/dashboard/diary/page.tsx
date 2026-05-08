import { requireUser } from "@/lib/supabase/auth";
import { listEntries } from "@/lib/db/entries";
import { Topbar } from "../_components/shell/Topbar";
import { EntryList } from "../_components/entry/EntryList";

export default async function DiaryPage() {
  await requireUser();
  const entries = await listEntries();

  return (
    <>
      <Topbar crumb="Diary" />
      <main className="wd-main">
        <h1
          style={{
            font: "var(--type-h1)",
            marginBottom: 24,
            letterSpacing: "-0.01em",
          }}
        >
          Your diary
        </h1>
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
            Your diary is empty. Start with today&apos;s entry.
          </p>
        ) : (
          <EntryList entries={entries} groupByMonth />
        )}
      </main>
    </>
  );
}
