import { DashboardNavigationMenu } from "@/components/fluid-menu"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="min-h-screen">
      {children}
      <DashboardNavigationMenu />
    </main>
  )
}