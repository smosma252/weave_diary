import { notFound } from "next/navigation";
import { getWeeklyReport } from "@/lib/mock/reports";
import { Topbar } from "../../../_components/shell/Topbar";
import { WeeklyReport } from "../../../_components/reports/WeeklyReport";

interface WeeklyReportPageProps {
  params: Promise<{ weekId: string }>;
}

export default async function WeeklyReportPage({
  params,
}: WeeklyReportPageProps) {
  const { weekId } = await params;
  const report = getWeeklyReport(weekId);

  if (!report) {
    notFound();
  }

  return (
    <>
      <Topbar crumb={`Reports · ${report.label}`} />
      <main className="wd-main">
        <WeeklyReport report={report} />
      </main>
    </>
  );
}
