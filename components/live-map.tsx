"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Mock train data
const trains = [
  { id: "T001", name: "Express North", x: 25, y: 30, status: "on-time", delay: 0 },
  { id: "T002", name: "Local East", x: 60, y: 45, status: "delayed", delay: 5 },
  { id: "T003", name: "Freight West", x: 40, y: 70, status: "conflict", delay: 15 },
  { id: "T004", name: "Express South", x: 75, y: 20, status: "on-time", delay: 0 },
]

const stations = [
  { id: "S001", name: "Central Station", x: 50, y: 50 },
  { id: "S002", name: "North Terminal", x: 30, y: 20 },
  { id: "S003", name: "East Junction", x: 80, y: 40 },
  { id: "S004", name: "West Depot", x: 20, y: 80 },
]

export function LiveMap() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "on-time":
        return "bg-green-500"
      case "delayed":
        return "bg-yellow-500"
      case "conflict":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <>
  <Card className="h-full p-8 bg-gradient-to-br from-blue-50 via-white to-blue-100 border-0 rounded-3xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-extrabold text-blue-900 tracking-tight">Live Railway Map</h2>
        <div className="flex gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <span className="font-semibold text-green-700">On Time</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
            <span className="font-semibold text-yellow-700">Delayed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
            <span className="font-semibold text-red-700">Conflict</span>
          </div>
        </div>
      </div>

      {/* Map Container */}
  <div className="relative h-[500px] bg-gradient-to-br from-blue-100 via-white to-blue-50 rounded-2xl border border-blue-200 overflow-hidden">
        {/* Railway tracks - simplified representation */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Main horizontal track */}
          <line x1="10" y1="50" x2="90" y2="50" stroke="#4B5563" strokeWidth="0.5" strokeDasharray="2,1" />
          {/* Vertical track */}
          <line x1="50" y1="10" x2="50" y2="90" stroke="#4B5563" strokeWidth="0.5" strokeDasharray="2,1" />
          {/* Diagonal tracks */}
          <line x1="20" y1="20" x2="80" y2="80" stroke="#4B5563" strokeWidth="0.3" strokeDasharray="1,1" />
          <line x1="80" y1="20" x2="20" y2="80" stroke="#4B5563" strokeWidth="0.3" strokeDasharray="1,1" />
        </svg>

        {/* Stations */}
        {stations.map((station) => (
          <div
            key={station.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${station.x}%`, top: `${station.y}%` }}
          >
            <div className="w-5 h-5 bg-blue-900 rounded-full border-2 border-white"></div>
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
              <Badge variant="secondary" className="text-xs bg-white text-blue-900 border border-blue-300 shadow">
                {station.name}
              </Badge>
            </div>
          </div>
        ))}

        {/* Trains */}
        {trains.map((train) => (
          <div
            key={train.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            style={{ left: `${train.x}%`, top: `${train.y}%` }}
          >
            <div
              className={`w-7 h-7 ${getStatusColor(train.status)} rounded-xl border-2 border-white flex items-center justify-center transition-transform group-hover:scale-110`}
            >
              <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
            </div>
            <div className="absolute top-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-blue-900 text-white text-xs px-3 py-2 rounded-xl border border-blue-300">
                <div className="font-semibold text-green-300">{train.name}</div>
                <div className="text-blue-100">{train.id}</div>
                {train.delay > 0 && <div className="text-yellow-300 font-bold">+{train.delay}min</div>}
              </div>
            </div>
          </div>
        ))}
      </div>
      </Card>
    </>
  )
}
