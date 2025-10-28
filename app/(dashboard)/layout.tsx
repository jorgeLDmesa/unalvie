import { DashboardNavigationMenu } from "@/components/fluid-menu"
import AIChatSidebar from "@/components/chat"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="min-h-screen">
      {children}
      <DashboardNavigationMenu />
      <AIChatSidebar />
    </main>
  )
}