"use client"
import { useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Clock, 
  MapPin, 
  AlertTriangle, 
  Train, 
  Users, 
  Zap, 
  Settings,
  ArrowRight,
  RefreshCw,
  Filter
} from "lucide-react"

// Enhanced schedule data with more railway-specific details
const upcomingTrains = [
  {
    id: "T001",
    name: "Express North",
    eta: "14:25",
    platform: "A1",
    status: "on-time",
    delay: 0,
    destination: "North Terminal",
    type: "passenger",
    capacity: 1200,
    speed: 85,
    priority: "high",
    operator: "Indian Railways",
    route: "Main Line",
    estimatedPassengers: 850
  },
  {
    id: "T005",
    name: "Regional East",
    eta: "14:32",
    platform: "B2",
    status: "delayed",
    delay: 3,
    destination: "East Junction",
    type: "passenger",
    capacity: 600,
    speed: 70,
    priority: "medium",
    operator: "Regional Rail",
    route: "Branch Line",
    estimatedPassengers: 450
  },
  {
    id: "T002",
    name: "Local East",
    eta: "14:40",
    platform: "A3",
    status: "delayed",
    delay: 5,
    destination: "East Junction",
    type: "passenger",
    capacity: 800,
    speed: 45,
    priority: "medium",
    operator: "Local Transport",
    route: "Local Line",
    estimatedPassengers: 720
  },
  {
    id: "T006",
    name: "Express South",
    eta: "14:45",
    platform: "C1",
    status: "on-time",
    delay: 0,
    destination: "South Terminal",
    type: "passenger",
    capacity: 1500,
    speed: 90,
    priority: "high",
    operator: "Indian Railways",
    route: "Main Line",
    estimatedPassengers: 1200
  },
  {
    id: "T003",
    name: "Freight West",
    eta: "14:55",
    platform: "D1",
    status: "conflict",
    delay: 15,
    destination: "West Depot",
    type: "freight",
    capacity: 2500,
    speed: 60,
    priority: "low",
    operator: "Freight Corp",
    route: "Freight Line",
    estimatedPassengers: 0,
    cargo: "Container Goods"
  },
  {
    id: "T007",
    name: "Local North",
    eta: "15:10",
    platform: "A2",
    status: "on-time",
    delay: 0,
    destination: "North Terminal",
    type: "passenger",
    capacity: 600,
    speed: 50,
    priority: "medium",
    operator: "Local Transport",
    route: "Local Line",
    estimatedPassengers: 520
  },
]

export function SchedulePanel() {
  const [priorityFilter, setPriorityFilter] = useState("all")

  // Filter trains based on priority
  const filteredTrains = priorityFilter === "all" 
    ? upcomingTrains 
    : upcomingTrains.filter(train => train.priority === priorityFilter)

  const getStatusBadge = (status: string, delay: number) => {
    switch (status) {
      case "on-time":
        return <Badge className="bg-green-100 text-green-800 border-green-200 font-semibold">On Time</Badge>
      case "delayed":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 font-semibold">+{delay}min</Badge>
      case "conflict":
        return <Badge className="bg-red-100 text-red-800 border-red-200 font-semibold animate-pulse">Conflict</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800 border-red-200"
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low": return "bg-green-100 text-green-800 border-green-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getTypeIcon = (type: string) => {
    return type === "freight" ? "🚛" : "🚆"
  }

  return (
    <div className="h-full p-6 overflow-y-auto bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-1">Train Schedule</h2>
            <p className="text-sm text-slate-600">Next arrivals at Central Hub</p>
          </div>
          <div className="flex gap-2">
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-32 border-slate-300">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
                <SelectItem value="medium">Medium Priority</SelectItem>
                <SelectItem value="low">Low Priority</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-800 hover:bg-slate-100">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white/80 rounded-lg p-3 text-center border border-slate-200">
            <div className="text-lg font-bold text-slate-800">{filteredTrains.length}</div>
            <div className="text-xs text-slate-600">Filtered</div>
          </div>
          <div className="bg-white/80 rounded-lg p-3 text-center border border-slate-200">
            <div className="text-lg font-bold text-green-600">{filteredTrains.filter(t => t.status === "on-time").length}</div>
            <div className="text-xs text-slate-600">On Time</div>
          </div>
          <div className="bg-white/80 rounded-lg p-3 text-center border border-slate-200">
            <div className="text-lg font-bold text-red-600">{filteredTrains.filter(t => t.status === "conflict").length}</div>
            <div className="text-xs text-slate-600">Issues</div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {filteredTrains.map((train) => (
          <Card key={train.id} className="p-5 bg-white/90 border border-slate-200 hover:shadow-md transition-all duration-200 hover:border-slate-300">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className="text-2xl">{getTypeIcon(train.type)}</div>
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">{train.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-slate-500 font-mono">{train.id}</span>
                    <Badge className={`text-xs ${getPriorityColor(train.priority)}`}>
                      {train.priority.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </div>
              {getStatusBadge(train.status, train.delay)}
            </div>

            <div className="space-y-3">
              {/* Arrival Time */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-slate-700">Arrival</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-lg text-slate-800">{train.eta}</span>
                  {train.delay > 0 && (
                    <div className="text-xs text-yellow-600 font-medium">
                      was {new Date(new Date(`2024-01-01 ${train.eta}`).getTime() - train.delay * 60000).toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" })}
                    </div>
                  )}
                </div>
              </div>

              {/* Platform */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-slate-700">Platform</span>
                </div>
                <span className="font-semibold text-slate-800">{train.platform}</span>
              </div>

              {/* Destination */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-purple-600" />
                  <span className="text-sm font-medium text-slate-700">Destination</span>
                </div>
                <span className="font-medium text-slate-800">{train.destination}</span>
              </div>

              {/* Train Details */}
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-200">
                <div className="flex items-center gap-2">
                  <Train className="h-3 w-3 text-slate-500" />
                  <span className="text-xs text-slate-600">{train.speed} km/h</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-3 w-3 text-slate-500" />
                  <span className="text-xs text-slate-600">
                    {train.type === "freight" ? "Cargo" : `${train.estimatedPassengers}/${train.capacity}`}
                  </span>
                </div>
              </div>

              {/* Operator & Route */}
              <div className="text-xs text-slate-500 pt-2 border-t border-slate-100">
                <div className="flex justify-between">
                  <span>{train.operator}</span>
                  <span>{train.route}</span>
                </div>
              </div>

              {/* Conflict Alert */}
              {train.status === "conflict" && (
                <Link href="/decision-panel">
                  <div className="flex items-center gap-2 text-red-700 bg-red-50 p-3 rounded-lg mt-3 border border-red-200 hover:bg-red-100 transition-colors cursor-pointer">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <div>
                      <div className="text-sm font-semibold">Track Conflict Detected</div>
                      <div className="text-xs text-red-600">Click to resolve in Decision Panel</div>
                    </div>
                    <ArrowRight className="h-4 w-4 ml-auto" />
                  </div>
                </Link>
              )}

              {/* Cargo Info for Freight */}
              {train.type === "freight" && train.cargo && (
                <div className="bg-blue-50 p-3 rounded-lg mt-3 border border-blue-200">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">Cargo: {train.cargo}</span>
                  </div>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
