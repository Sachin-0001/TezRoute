import { Navigation } from "@/components/navigation"
import { LiveMap } from "@/components/live-map"
import { SchedulePanel } from "@/components/schedule-panel"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="flex h-[calc(100vh-64px)]">
        {/* Main Map Area */}
        <div className="flex-1 p-4">
          <LiveMap />
        </div>

        {/* Right Sidebar - Schedule Panel */}
        <div className="w-100 border-l border-gray-200 bg-gray-50">
          <SchedulePanel />
        </div>
      </main>
    </div>
  )
}
