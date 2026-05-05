import { notFound } from "next/navigation";
import { getMonthlyReport } from "@/lib/mock/reports";
import { Topbar } from "../../../_components/shell/Topbar";
import { MonthlyReport } from "../../../_components/reports/MonthlyReport";

interface MonthlyReportPageProps {
  params: Promise<{ monthId: string }>;
}

export default async function MonthlyReportPage({
  params,
}: MonthlyReportPageProps) {
  const { monthId } = await params;
  const report = getMonthlyReport(monthId);

  if (!report) {
    notFound();
  }

  return (
    <>
      <Topbar crumb={`Reports · ${report.label}`} />
      <main className="wd-main">
        <MonthlyReport report={report} />
      </main>
    </>
  );
}
