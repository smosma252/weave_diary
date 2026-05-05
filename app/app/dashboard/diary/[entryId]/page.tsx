import { notFound } from "next/navigation";
import { getEntry } from "@/lib/mock/entries";
import { Topbar } from "../../_components/shell/Topbar";
import { EntryView } from "../../_components/entry/EntryView";

interface EntryPageProps {
  params: Promise<{ entryId: string }>;
}

export default async function EntryPage({ params }: EntryPageProps) {
  const { entryId } = await params;
  const entry = getEntry(entryId);

  if (!entry) {
    notFound();
  }

  return (
    <>
      <Topbar crumb={`Diary · ${entry.date}`} />
      <main className="wd-main">
        <EntryView entry={entry} />
      </main>
    </>
  );
}
