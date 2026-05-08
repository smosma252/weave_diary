import { Topbar } from "../_components/shell/Topbar";
import { AskClient } from "../_components/ask/AskClient";

export default function AskPage() {
  return (
    <>
      <Topbar crumb="Ask" />
      <AskClient />
    </>
  );
}
