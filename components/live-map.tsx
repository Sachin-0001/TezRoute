"use client"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useRouter, usePathname } from "next/navigation"
import { 
  MapPin, 
  Train, 
  AlertTriangle, 
  Clock, 
  Zap, 
  Maximize2,
  Minimize2,
  Layers,
  Settings
} from "lucide-react"

// Enhanced train data with more details
const trains = [
  { 
    id: "T001", 
    name: "Express North", 
    x: 25, 
    y: 30, 
    status: "on-time", 
    delay: 0,
    speed: 85,
    capacity: 1200,
    type: "passenger"
  },
  { 
    id: "T002", 
    name: "Local East", 
    x: 60, 
    y: 45, 
    status: "delayed", 
    delay: 5,
    speed: 45,
    capacity: 800,
    type: "passenger"
  },
  { 
    id: "T003", 
    name: "Freight West", 
    x: 40, 
    y: 70, 
    status: "conflict", 
    delay: 15,
    speed: 60,
    capacity: 2500,
    type: "freight"
  },
  { 
    id: "T004", 
    name: "Express South", 
    x: 75, 
    y: 20, 
    status: "on-time", 
    delay: 0,
    speed: 90,
    capacity: 1500,
    type: "passenger"
  },
  { 
    id: "T005", 
    name: "Regional North", 
    x: 35, 
    y: 60, 
    status: "on-time", 
    delay: 0,
    speed: 70,
    capacity: 600,
    type: "passenger"
  },
  { 
    id: "T006", 
    name: "Freight South", 
    x: 65, 
    y: 80, 
    status: "delayed", 
    delay: 8,
    speed: 55,
    capacity: 3000,
    type: "freight"
  }
]

const stations = [
  { id: "S001", name: "Central Hub", x: 50, y: 50, type: "major", capacity: "High" },
  { id: "S002", name: "North Terminal", x: 30, y: 20, type: "major", capacity: "High" },
  { id: "S003", name: "East Junction", x: 80, y: 40, type: "junction", capacity: "Medium" },
  { id: "S004", name: "West Depot", x: 20, y: 80, type: "depot", capacity: "Low" },
  { id: "S005", name: "South Station", x: 70, y: 85, type: "major", capacity: "High" },
  { id: "S006", name: "Industrial Zone", x: 85, y: 70, type: "industrial", capacity: "Medium" }
]

export function LiveMap() {
  const router = useRouter()
  const pathname = usePathname()

  const handleToggle = () => {
    if (pathname === "/")
      router.push("/network-map")
    else
      router.push("/")
  }
  const getStatusColor = (status: string) => {
    switch (status) {
      case "on-time":
        return "bg-green-500 shadow-green-500/50"
      case "delayed":
        return "bg-yellow-500 shadow-yellow-500/50"
      case "conflict":
        return "bg-red-500 shadow-red-500/50"
      default:
        return "bg-gray-500 shadow-gray-500/50"
    }
  }

  const getStationIcon = (type: string) => {
    switch (type) {
      case "major": return "🏢"
      case "junction": return "🔀"
      case "depot": return "🏭"
      case "industrial": return "🏗️"
      default: return "📍"
    }
  }

  const getTrainIcon = (type: string) => {
    return type === "freight" ? "🚛" : "🚆"
  }

  return (
    <Card className="h-full bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 border-0 shadow-2xl rounded-3xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-200/50 bg-gradient-to-r from-white via-blue-50/30 to-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-800 mb-1">Railway Network Map</h2>
            <p className="text-slate-600">Real-time train positions and track status</p>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={handleToggle}
              variant="outline" 
              size="sm" 
              className="border-slate-300 hover:bg-blue-200"
            >
              {pathname === "/" ? <Maximize2 className="h-4 w-4 mr-2" /> : <Minimize2 className="h-4 w-4 mr-2" />}
              {pathname === "/" ? "Fullscreen" : "Minimize"}
            </Button>
          </div>
        </div>

        {/* Status Legend */}
        <div className="flex gap-8 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-full shadow-lg shadow-green-500/50"></div>
            <span className="font-semibold text-slate-700">On Time</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-500 rounded-full shadow-lg shadow-yellow-500/50"></div>
            <span className="font-semibold text-slate-700">Delayed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded-full shadow-lg shadow-red-500/50 animate-pulse"></div>
            <span className="font-semibold text-slate-700">Conflict</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50"></div>
            <span className="font-semibold text-slate-700">Stations</span>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative h-[600px] bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200 overflow-hidden">
        {/* Railway Network - Enhanced SVG */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Main railway lines with different styles */}
          <defs>
            <pattern id="railway-tracks" patternUnits="userSpaceOnUse" width="4" height="4">
              <rect width="4" height="4" fill="none"/>
              <line x1="0" y1="2" x2="4" y2="2" stroke="#64748B" strokeWidth="0.3"/>
              <line x1="0" y1="2.5" x2="4" y2="2.5" stroke="#64748B" strokeWidth="0.3"/>
            </pattern>
            <pattern id="high-speed-tracks" patternUnits="userSpaceOnUse" width="6" height="6">
              <rect width="6" height="6" fill="none"/>
              <line x1="0" y1="3" x2="6" y2="3" stroke="#3B82F6" strokeWidth="0.4"/>
              <line x1="0" y1="3.3" x2="6" y2="3.3" stroke="#3B82F6" strokeWidth="0.4"/>
            </pattern>
          </defs>
          
          {/* Main horizontal trunk line */}
          <line x1="10" y1="50" x2="90" y2="50" stroke="url(#high-speed-tracks)" strokeWidth="1.2" />
          
          {/* Main vertical trunk line */}
          <line x1="50" y1="10" x2="50" y2="90" stroke="url(#high-speed-tracks)" strokeWidth="1.2" />
          
          {/* Secondary lines */}
          <line x1="20" y1="20" x2="80" y2="80" stroke="url(#railway-tracks)" strokeWidth="0.8" />
          <line x1="80" y1="20" x2="20" y2="80" stroke="url(#railway-tracks)" strokeWidth="0.8" />
          
          {/* Branch lines */}
          <line x1="30" y1="30" x2="70" y2="70" stroke="url(#railway-tracks)" strokeWidth="0.6" />
          <line x1="70" y1="30" x2="30" y2="70" stroke="url(#railway-tracks)" strokeWidth="0.6" />
          
          {/* Junction markers */}
          <circle cx="50" cy="50" r="2" fill="#1E40AF" stroke="#ffffff" strokeWidth="0.5"/>
          <circle cx="30" cy="30" r="1.5" fill="#1E40AF" stroke="#ffffff" strokeWidth="0.3"/>
          <circle cx="70" cy="70" r="1.5" fill="#1E40AF" stroke="#ffffff" strokeWidth="0.3"/>
        </svg>

        {/* Stations */}
        {stations.map((station) => (
          <div
            key={station.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            style={{ left: `${station.x}%`, top: `${station.y}%` }}
          >
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full border-3 border-white shadow-lg flex items-center justify-center text-xs group-hover:scale-110 transition-transform duration-200">
                {getStationIcon(station.type)}
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
            </div>
            <div className="absolute top-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
              <div className="bg-slate-800 text-white text-xs px-3 py-2 rounded-xl border border-slate-600 shadow-xl">
                <div className="font-semibold text-blue-300">{station.name}</div>
                <div className="text-slate-300">{station.type.toUpperCase()}</div>
                <div className="text-green-300">Capacity: {station.capacity}</div>
              </div>
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
            <div className="relative">
              <div
                className={`w-10 h-10 ${getStatusColor(train.status)} rounded-xl border-3 border-white flex items-center justify-center transition-all duration-200 group-hover:scale-125 shadow-lg`}
              >
                <span className="text-sm">{getTrainIcon(train.type)}</span>
              </div>
              {train.status === "conflict" && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-ping"></div>
              )}
            </div>
            <div className="absolute top-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
              <div className="bg-slate-900 text-white text-xs px-4 py-3 rounded-xl border border-slate-700 shadow-2xl min-w-[200px]">
                <div className="flex items-center gap-2 mb-2">
                  <Train className="h-3 w-3 text-blue-400" />
                  <span className="font-bold text-blue-300">{train.name}</span>
                  <Badge className={`text-xs ${
                    train.status === "on-time" ? "bg-green-100 text-green-800" :
                    train.status === "delayed" ? "bg-yellow-100 text-yellow-800" :
                    "bg-red-100 text-red-800"
                  }`}>
                    {train.status === "on-time" ? "On Time" :
                     train.status === "delayed" ? `+${train.delay}min` : "Conflict"}
                  </Badge>
                </div>
                <div className="space-y-1 text-slate-300">
                  <div className="flex justify-between">
                    <span>ID:</span>
                    <span className="font-mono">{train.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Speed:</span>
                    <span>{train.speed} km/h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Capacity:</span>
                    <span>{train.capacity.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Type:</span>
                    <span className="capitalize">{train.type}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Network Status Overlay */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-slate-200">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-semibold text-slate-700">Network Status</span>
          </div>
          <div className="text-xs text-slate-600 space-y-1">
            <div>Active Trains: {trains.length}</div>
            <div>Stations: {stations.length}</div>
            <div>Conflicts: {trains.filter(t => t.status === "conflict").length}</div>
          </div>
        </div>
      </div>
    </Card>
  )
}
