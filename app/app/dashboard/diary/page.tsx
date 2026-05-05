import { listEntries } from "@/lib/mock/entries";
import { Topbar } from "../_components/shell/Topbar";
import { EntryList } from "../_components/entry/EntryList";

export default function DiaryPage() {
  const entries = listEntries();

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
        <EntryList entries={entries} groupByMonth />
      </main>
    </>
  );
}
