import { notFound } from "next/navigation";
import { requireUser } from "@/lib/supabase/auth";
import { getEntry } from "@/lib/db/entries";
import { Topbar } from "../../../_components/shell/Topbar";
import { EntryEditor } from "../../../_components/entry/EntryEditor";

interface EditEntryPageProps {
  params: Promise<{ entryId: string }>;
}

export default async function EditEntryPage({ params }: EditEntryPageProps) {
  await requireUser();
  const { entryId } = await params;
  const entry = await getEntry(entryId);
  if (!entry) notFound();

  return (
    <>
      <Topbar crumb={`Diary · ${entry.date} · Edit`} />
      <main className="wd-main">
        <EntryEditor entry={entry} />
      </main>
    </>
  );
}
