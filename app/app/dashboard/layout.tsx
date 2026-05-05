import { Sidebar } from "./_components/shell/Sidebar";
import { VoiceCapture } from "./_components/voice/VoiceCapture";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="wd-app">
      <Sidebar />
      <div>{children}</div>
      <VoiceCapture />
    </div>
  );
}
