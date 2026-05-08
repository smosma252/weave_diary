import { requireUser } from "@/lib/supabase/auth";
import { listReportHistory } from "@/lib/db/reports";
import { Topbar } from "../_components/shell/Topbar";
import { ReportHistoryList } from "../_components/reports/ReportHistoryList";

export default async function ReportsPage() {
  await requireUser();
  const history = await listReportHistory();

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
        {history.length === 0 ? (
          <p
            style={{
              font: "var(--type-prose-sm)",
              fontStyle: "italic",
              color: "var(--fg-3)",
              textAlign: "center",
              padding: "48px 0",
            }}
          >
            Weekly reviews show up here once you&apos;ve used WeaveDiary for a week.
          </p>
        ) : (
          <ReportHistoryList history={history} />
        )}
      </main>
    </>
  );
}
