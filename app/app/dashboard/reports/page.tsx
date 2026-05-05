import { REPORT_HISTORY } from "@/lib/mock/reports";
import { Topbar } from "../_components/shell/Topbar";
import { ReportHistoryList } from "../_components/reports/ReportHistoryList";

export default function ReportsPage() {
  return (
    <>
      <Topbar crumb="Reports" />
      <main className="wd-main">
        <h1
          style={{
            font: "var(--type-h1)",
            marginBottom: 6,
            letterSpacing: "-0.01em",
          }}
        >
          Reports
        </h1>
        <p
          style={{
            font: "var(--type-body)",
            color: "var(--fg-2)",
            marginBottom: 28,
          }}
        >
          Weekly and monthly looks back, in your own words.
        </p>
        <ReportHistoryList history={REPORT_HISTORY} />
      </main>
    </>
  );
}
