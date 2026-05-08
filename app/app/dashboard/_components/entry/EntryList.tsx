import { groupEntriesByMonth } from "@/lib/db/entries";
import type { Entry } from "@/lib/types";
import { EntryCard } from "./EntryCard";

interface EntryListProps {
  entries: Entry[];
  groupByMonth?: boolean;
}

export function EntryList({ entries, groupByMonth = false }: EntryListProps) {
  if (groupByMonth) {
    const groups = groupEntriesByMonth(entries);
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        {groups.map((group, gi) => (
          <div key={group.month}>
            <h2
              style={{
                font: "var(--type-h2)",
                letterSpacing: "var(--tracking-tight)",
                marginTop: gi === 0 ? 0 : 32,
                marginBottom: 16,
              }}
            >
              {group.month}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {group.entries.map((entry) => (
                <EntryCard key={entry.id} entry={entry} />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {entries.map((entry) => (
        <EntryCard key={entry.id} entry={entry} />
      ))}
    </div>
  );
}
