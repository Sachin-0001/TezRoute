"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Settings, 
  Zap, 
  AlertTriangle,
  Train,
  Clock,
  Activity,
  TrendingUp,
  BarChart3,
  Map,
  Layers,
  Maximize2,
  Save,
  Download
} from "lucide-react"

export default function SimulationPage() {
  const [isRunning, setIsRunning] = useState(false)
  const [speed, setSpeed] = useState([1])
  const [scenario, setScenario] = useState("")
  const [simulationTime, setSimulationTime] = useState("14:30:00")
  const [selectedView, setSelectedView] = useState("network")

  const scenarios = [
    { 
      id: "rush-hour", 
      name: "Rush Hour Traffic", 
      description: "High volume passenger traffic simulation",
      complexity: "Medium",
      duration: "2 hours",
      trains: "45+ trains"
    },
    { 
      id: "weather-delay", 
      name: "Weather Delays", 
      description: "Heavy rain causing system-wide delays",
      complexity: "High",
      duration: "4 hours",
      trains: "30+ trains"
    },
    {
      id: "signal-failure",
      name: "Signal System Failure",
      description: "Multiple signal failures requiring manual control",
      complexity: "Critical",
      duration: "1 hour",
      trains: "20+ trains"
    },
    { 
      id: "emergency", 
      name: "Emergency Response", 
      description: "Emergency evacuation scenario",
      complexity: "Critical",
      duration: "30 min",
      trains: "15+ trains"
    },
    { 
      id: "maintenance", 
      name: "Planned Maintenance", 
      description: "Track maintenance with traffic rerouting",
      complexity: "Low",
      duration: "3 hours",
      trains: "25+ trains"
    },
  ]

  const simulationMetrics = [
    { label: "Trains Active", value: "12", change: "+2", trend: "up", icon: Train, color: "text-blue-600" },
    { label: "On-Time Performance", value: "87%", change: "-5%", trend: "down", icon: Clock, color: "text-yellow-600" },
    { label: "Average Delay", value: "3.2 min", change: "+1.1 min", trend: "down", icon: AlertTriangle, color: "text-red-600" },
    { label: "Conflicts Resolved", value: "4", change: "+4", trend: "up", icon: Zap, color: "text-green-600" },
    { label: "System Efficiency", value: "94%", change: "+2%", trend: "up", icon: TrendingUp, color: "text-purple-600" },
    { label: "Network Utilization", value: "78%", change: "+3%", trend: "up", icon: Activity, color: "text-indigo-600" },
  ]

  const events = [
    { time: "14:32:15", type: "delay", message: "T005 delayed by 3 minutes due to passenger boarding", severity: "medium" },
    { time: "14:31:45", type: "conflict", message: "Track conflict detected between T003 and T008", severity: "high" },
    { time: "14:30:30", type: "resolution", message: "T002 rerouted successfully via alternate track", severity: "low" },
    { time: "14:29:12", type: "alert", message: "Weather alert: Rain intensity increasing", severity: "medium" },
    { time: "14:28:05", type: "optimization", message: "AI suggested route optimization for 3 trains", severity: "low" },
    { time: "14:27:33", type: "maintenance", message: "Platform A2 maintenance completed ahead of schedule", severity: "low" },
  ]

  const networkData = [
    { section: "North Line", utilization: 85, trains: 8, status: "busy" },
    { section: "South Line", utilization: 72, trains: 6, status: "normal" },
    { section: "East Line", utilization: 95, trains: 10, status: "congested" },
    { section: "West Line", utilization: 68, trains: 5, status: "normal" },
    { section: "Central Hub", utilization: 98, trains: 15, status: "critical" },
  ]

  const getEventIcon = (type: string) => {
    switch (type) {
      case "conflict":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "delay":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "resolution":
        return <Zap className="h-4 w-4 text-green-500" />
      case "alert":
        return <AlertTriangle className="h-4 w-4 text-blue-500" />
      case "optimization":
        return <TrendingUp className="h-4 w-4 text-purple-500" />
      case "maintenance":
        return <Settings className="h-4 w-4 text-indigo-500" />
      default:
        return <Activity className="h-4 w-4 text-gray-500" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "bg-red-100 text-red-800 border-red-200"
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low": return "bg-green-100 text-green-800 border-green-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical": return "bg-red-500"
      case "congested": return "bg-orange-500"
      case "busy": return "bg-yellow-500"
      case "normal": return "bg-green-500"
      default: return "bg-gray-500"
    }
  }

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "Critical": return "bg-red-100 text-red-800 border-red-200"
      case "High": return "bg-orange-100 text-orange-800 border-orange-200"
      case "Medium": return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Low": return "bg-green-100 text-green-800 border-green-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <Navigation />
      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-4xl font-bold text-slate-800 mb-2">Railway Simulation Center</h1>
                <p className="text-slate-600">Advanced scenario testing and optimization modeling</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="border-slate-300 hover:bg-slate-50">
                  <Save className="h-4 w-4 mr-2" />
                  Save Scenario
                </Button>
                <Button variant="outline" className="border-slate-300 hover:bg-slate-50">
                  <Download className="h-4 w-4 mr-2" />
                  Export Results
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Simulation Controls */}
            <div className="lg:col-span-1">
              <Card className="p-6 mb-6 bg-white/90 border-slate-200 shadow-lg">
                <div className="flex items-center gap-2 mb-6">
                  <Settings className="h-5 w-5 text-slate-600" />
                  <h2 className="text-xl font-semibold text-slate-800">Simulation Controls</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">Scenario Selection</label>
                    <Select value={scenario} onValueChange={setScenario}>
                      <SelectTrigger className="border-slate-300">
                        <SelectValue placeholder="Choose simulation scenario" />
                      </SelectTrigger>
                      <SelectContent>
                        {scenarios.map((s) => (
                          <SelectItem key={s.id} value={s.id}>
                            <div className="flex flex-col">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{s.name}</span>
                                <Badge className={`text-xs ${getComplexityColor(s.complexity)}`}>
                                  {s.complexity}
                                </Badge>
                              </div>
                              <div className="text-sm text-slate-500 mt-1">{s.description}</div>
                              <div className="flex gap-4 text-xs text-slate-400 mt-1">
                                <span>⏱️ {s.duration}</span>
                                <span>🚆 {s.trains}</span>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">
                      Simulation Speed: {speed[0]}x
                    </label>
                    <Slider value={speed} onValueChange={setSpeed} max={10} min={0.5} step={0.5} className="w-full" />
                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                      <span>0.5x</span>
                      <span>5x</span>
                      <span>10x</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Simulation Time</label>
                    <div className="font-mono text-xl font-bold text-slate-800 bg-slate-100 p-3 rounded-lg border border-slate-200">
                      {simulationTime}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      onClick={() => setIsRunning(!isRunning)}
                      className={isRunning ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}
                      size="sm"
                    >
                      {isRunning ? (
                        <>
                          <Pause className="h-4 w-4 mr-2" />
                          Pause
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          Start
                        </>
                      )}
                    </Button>
                    <Button variant="outline" size="sm" className="border-slate-300">
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Reset
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Network Status */}
              <Card className="p-6 bg-white/90 border-slate-200 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Map className="h-5 w-5 text-slate-600" />
                  <h3 className="text-lg font-semibold text-slate-800">Network Status</h3>
                </div>
                <div className="space-y-3">
                  {networkData.map((section, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-slate-700">{section.section}</span>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(section.status)}`}></div>
                          <span className="text-xs text-slate-600">{section.trains} trains</span>
                        </div>
                      </div>
                      <Progress value={section.utilization} className="h-2" />
                      <div className="text-xs text-slate-500">{section.utilization}% utilization</div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Simulation Display & Metrics */}
            <div className="lg:col-span-2">
              {/* Performance Metrics Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {simulationMetrics.map((metric, index) => {
                  const Icon = metric.icon
                  return (
                    <Card key={index} className="p-4 bg-white/90 border-slate-200 shadow-lg">
                      <div className="flex items-center justify-between mb-2">
                        <Icon className={`h-5 w-5 ${metric.color}`} />
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            metric.trend === "up" && metric.label !== "Average Delay" ? "text-green-600 border-green-300 bg-green-50" : "text-red-600 border-red-300 bg-red-50"
                          }`}
                        >
                          {metric.change}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-xl font-bold text-slate-800">{metric.value}</p>
                        <p className="text-xs text-slate-600 font-medium">{metric.label}</p>
                      </div>
                    </Card>
                  )
                })}
              </div>

              {/* Simulation Visualization */}
              <Card className="p-6 mb-6 bg-white/90 border-slate-200 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-100 rounded-lg">
                      <BarChart3 className="h-5 w-5 text-slate-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-slate-800">Simulation Visualization</h2>
                      <p className="text-sm text-slate-600">Real-time railway network modeling</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={isRunning ? "bg-green-100 text-green-800 border-green-200" : "bg-slate-100 text-slate-800 border-slate-200"}>
                      {isRunning ? "Running" : "Paused"}
                    </Badge>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="border-slate-300">
                        <Layers className="h-4 w-4 mr-2" />
                        Layers
                      </Button>
                      <Button variant="outline" size="sm" className="border-slate-300">
                        <Maximize2 className="h-4 w-4 mr-2" />
                        Fullscreen
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Enhanced Simulation Display */}
                <div className="h-80 bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200 rounded-xl border border-slate-300 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {scenario ? (
                      <div className="text-center">
                        <div className="text-2xl font-bold text-slate-800 mb-3">
                          {scenarios.find((s) => s.id === scenario)?.name}
                        </div>
                        <div className="text-slate-600 mb-6 max-w-md">
                          {scenarios.find((s) => s.id === scenario)?.description}
                        </div>
                        {isRunning ? (
                          <div className="flex flex-col items-center gap-3">
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                              <span className="text-green-700 font-semibold">Simulation Active</span>
                            </div>
                            <div className="text-sm text-slate-600">
                              Processing {scenarios.find((s) => s.id === scenario)?.trains} in real-time
                            </div>
                          </div>
                        ) : (
                          <div className="text-slate-500">Click Start to begin simulation</div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center text-slate-500">
                        <div className="p-4 bg-slate-200 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                          <Settings className="h-10 w-10 text-slate-400" />
                        </div>
                        <div className="text-lg font-medium">Select a scenario to begin</div>
                        <div className="text-sm mt-1">Choose from the available simulation scenarios</div>
                      </div>
                    )}
                  </div>

                  {/* Animated railway elements when running */}
                  {isRunning && scenario && (
                    <>
                      <div className="absolute top-6 left-6 w-6 h-6 bg-green-500 rounded-full animate-bounce shadow-lg"></div>
                      <div className="absolute top-12 right-12 w-4 h-4 bg-yellow-500 rounded-full animate-pulse shadow-lg"></div>
                      <div className="absolute bottom-8 left-1/3 w-5 h-5 bg-blue-500 rounded-full animate-ping shadow-lg"></div>
                      <div className="absolute bottom-16 right-1/4 w-3 h-3 bg-purple-500 rounded-full animate-bounce shadow-lg"></div>
                      <div className="absolute top-1/2 left-8 w-4 h-4 bg-red-500 rounded-full animate-pulse shadow-lg"></div>
                    </>
                  )}

                  {/* Network overlay */}
                  <div className="absolute inset-0 opacity-20">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <line x1="20" y1="50" x2="80" y2="50" stroke="#64748B" strokeWidth="0.5" strokeDasharray="2,2" />
                      <line x1="50" y1="20" x2="50" y2="80" stroke="#64748B" strokeWidth="0.5" strokeDasharray="2,2" />
                      <circle cx="50" cy="50" r="3" fill="#64748B" />
                    </svg>
                  </div>
                </div>
              </Card>

              {/* Event Log */}
              <Card className="p-6 bg-white/90 border-slate-200 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Activity className="h-5 w-5 text-slate-600" />
                  <h3 className="text-lg font-semibold text-slate-800">Simulation Events</h3>
                </div>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {events.map((event, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors">
                      {getEventIcon(event.type)}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-mono text-sm text-slate-600">{event.time}</span>
                          <div className="flex gap-2">
                            <Badge className={`text-xs ${getSeverityColor(event.severity)}`}>
                              {event.severity}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {event.type}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-slate-800">{event.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
