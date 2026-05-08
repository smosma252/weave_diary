import { notFound } from "next/navigation";
import { requireUser } from "@/lib/supabase/auth";
import { getWeeklyReport } from "@/lib/db/reports";
import { Topbar } from "../../../_components/shell/Topbar";
import { WeeklyReport } from "../../../_components/reports/WeeklyReport";

interface WeeklyReportPageProps {
  params: Promise<{ weekId: string }>;
}

export default async function WeeklyReportPage({
  params,
}: WeeklyReportPageProps) {
  await requireUser();
  const { weekId } = await params;
  const report = await getWeeklyReport(weekId);
  if (!report) notFound();

  return (
    <>
      <Topbar crumb={`Reports · ${report.label}`} />
      <main className="wd-main">
        <WeeklyReport report={report} />
      </main>
    </>
  );
}
