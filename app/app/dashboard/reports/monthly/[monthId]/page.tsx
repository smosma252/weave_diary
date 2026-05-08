import { notFound } from "next/navigation";
import { requireUser } from "@/lib/supabase/auth";
import { getMonthlyReport } from "@/lib/db/reports";
import { Topbar } from "../../../_components/shell/Topbar";
import { MonthlyReport } from "../../../_components/reports/MonthlyReport";

interface MonthlyReportPageProps {
  params: Promise<{ monthId: string }>;
}

export default async function MonthlyReportPage({
  params,
}: MonthlyReportPageProps) {
  await requireUser();
  const { monthId } = await params;
  const report = await getMonthlyReport(monthId);
  if (!report) notFound();

  return (
    <>
      <Topbar crumb={`Reports · ${report.label}`} />
      <main className="wd-main">
        <MonthlyReport report={report} />
      </main>
    </>
  );
}
