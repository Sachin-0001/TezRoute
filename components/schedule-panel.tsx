"use client"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, AlertTriangle } from "lucide-react"

// Mock schedule data
const upcomingTrains = [
  {
    id: "T001",
    name: "Express North",
    eta: "14:25",
    platform: "A1",
    status: "on-time",
    delay: 0,
    destination: "North Terminal",
  },
  {
    id: "T005",
    name: "Regional East",
    eta: "14:32",
    platform: "B2",
    status: "delayed",
    delay: 3,
    destination: "East Junction",
  },
  {
    id: "T002",
    name: "Local East",
    eta: "14:40",
    platform: "A3",
    status: "delayed",
    delay: 5,
    destination: "East Junction",
  },
  {
    id: "T006",
    name: "Express South",
    eta: "14:45",
    platform: "C1",
    status: "on-time",
    delay: 0,
    destination: "South Terminal",
  },
  {
    id: "T003",
    name: "Freight West",
    eta: "14:55",
    platform: "D1",
    status: "conflict",
    delay: 15,
    destination: "West Depot",
  },
  {
    id: "T007",
    name: "Local North",
    eta: "15:10",
    platform: "A2",
    status: "on-time",
    delay: 0,
    destination: "North Terminal",
  },
]

export function SchedulePanel() {
  const getStatusBadge = (status: string, delay: number) => {
    switch (status) {
      case "on-time":
        return <Badge className="bg-green-100 text-green-800 border-green-200">On Time</Badge>
      case "delayed":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">+{delay}min</Badge>
      case "conflict":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Conflict</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  return (
  <div className="h-full p-6 overflow-y-auto bg-gradient-to-br from-blue-50 via-white to-blue-100 rounded-3xl">
      <div className="mb-8">
  <h2 className="text-2xl font-extrabold text-blue-900 mb-1 tracking-tight">Upcoming Schedule</h2>
        <p className="text-base text-gray-600">Next 6 trains arriving</p>
      </div>

      <div className="space-y-5">
        {upcomingTrains.map((train) => (
          <Card key={train.id} className="p-6 text-background rounded-2xl border-0 bg-gradient-to-r from-white via-blue-50 to-blue-100">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-bold text-blue-900 text-lg tracking-wide">{train.name}</h3>
                <p className="text-xs text-gray-500 font-mono">{train.id}</p>
              </div>
              {getStatusBadge(train.status, train.delay)}
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-700">
                <Clock className="h-4 w-4 text-blue-800" />
                <span className="font-semibold text-lg text-blue-900">{train.eta}</span>
                {train.delay > 0 && (
                  <span className="text-yellow-600 text-xs font-medium">
                    (was{" "}
                    {new Date(new Date(`2024-01-01 ${train.eta}`).getTime() - train.delay * 60000).toLocaleTimeString(
                      "en-US",
                      { hour12: false, hour: "2-digit", minute: "2-digit" },
                    )}
                    )
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 text-gray-700">
                <MapPin className="h-4 w-4 text-blue-800" />
                <span className="font-medium">Platform {train.platform}</span>
              </div>

              <div className="text-gray-600 font-medium">→ {train.destination}</div>
              <Link href = "/decision-panel" >
              {train.status === "conflict" && (
                <div className="flex items-center gap-2 text-red-700 bg-red-100/80 p-2 rounded-lg mt-2">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="text-xs font-semibold">Track conflict detected</span>
                </div>
              )}</Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
