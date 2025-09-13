"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, RotateCcw, Settings, Zap, AlertTriangle } from "lucide-react"

export default function SimulationPage() {
  const [isRunning, setIsRunning] = useState(false)
  const [speed, setSpeed] = useState([1])
  const [scenario, setScenario] = useState("")
  const [simulationTime, setSimulationTime] = useState("14:30:00")

  const scenarios = [
    { id: "rush-hour", name: "Rush Hour Traffic", description: "High volume passenger traffic simulation" },
    { id: "weather-delay", name: "Weather Delays", description: "Heavy rain causing system-wide delays" },
    {
      id: "signal-failure",
      name: "Signal System Failure",
      description: "Multiple signal failures requiring manual control",
    },
    { id: "emergency", name: "Emergency Response", description: "Emergency evacuation scenario" },
    { id: "maintenance", name: "Planned Maintenance", description: "Track maintenance with traffic rerouting" },
  ]

  const simulationMetrics = [
    { label: "Trains Active", value: "12", change: "+2" },
    { label: "On-Time Performance", value: "87%", change: "-5%" },
    { label: "Average Delay", value: "3.2 min", change: "+1.1 min" },
    { label: "Conflicts Resolved", value: "4", change: "+4" },
  ]

  const events = [
    { time: "14:32:15", type: "delay", message: "T005 delayed by 3 minutes due to passenger boarding" },
    { time: "14:31:45", type: "conflict", message: "Track conflict detected between T003 and T008" },
    { time: "14:30:30", type: "resolution", message: "T002 rerouted successfully via alternate track" },
    { time: "14:29:12", type: "alert", message: "Weather alert: Rain intensity increasing" },
  ]

  const getEventIcon = (type: string) => {
    switch (type) {
      case "conflict":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "delay":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "resolution":
        return <Zap className="h-4 w-4 text-green-500" />
      case "alert":
        return <AlertTriangle className="h-4 w-4 text-blue-500" />
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-blue-900 mb-2">Simulation Mode</h1>
            <p className="text-gray-600">Test scenarios and train decision-making in a safe environment</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Simulation Controls */}
            <div className="lg:col-span-1">
              <Card className="p-6 mb-6">
                <h2 className="text-xl font-semibold text-blue-900 mb-4">Simulation Controls</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Scenario</label>
                    <Select value={scenario} onValueChange={setScenario}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a scenario" />
                      </SelectTrigger>
                      <SelectContent>
                        {scenarios.map((s) => (
                          <SelectItem key={s.id} value={s.id}>
                            <div>
                              <div className="font-medium">{s.name}</div>
                              <div className="text-sm text-gray-500">{s.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Simulation Speed: {speed[0]}x
                    </label>
                    <Slider value={speed} onValueChange={setSpeed} max={10} min={0.5} step={0.5} className="w-full" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Time</label>
                    <div className="font-mono text-lg font-bold text-blue-900 bg-gray-100 p-2 rounded">
                      {simulationTime}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => setIsRunning(!isRunning)}
                      className={isRunning ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}
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
                    <Button variant="outline">
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Reset
                    </Button>
                    <Button variant="outline">
                      <Settings className="h-4 w-4 mr-2" />
                      Config
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Simulation Metrics */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Performance Metrics</h3>
                <div className="space-y-3">
                  {simulationMetrics.map((metric, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{metric.label}</span>
                      <div className="text-right">
                        <div className="font-semibold">{metric.value}</div>
                        <div
                          className={`text-xs ${metric.change.startsWith("+") && metric.label !== "Conflicts Resolved" ? "text-red-500" : "text-green-500"}`}
                        >
                          {metric.change}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Simulation Display */}
            <div className="lg:col-span-2">
              <Card className="p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-blue-900">Live Simulation</h2>
                  <Badge className={isRunning ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                    {isRunning ? "Running" : "Paused"}
                  </Badge>
                </div>

                {/* Simplified simulation display */}
                <div className="h-96 bg-gray-100 rounded-lg border-2 border-gray-300 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {scenario ? (
                      <div className="text-center">
                        <div className="text-lg font-semibold text-blue-900 mb-2">
                          {scenarios.find((s) => s.id === scenario)?.name}
                        </div>
                        <div className="text-gray-600 mb-4">
                          {scenarios.find((s) => s.id === scenario)?.description}
                        </div>
                        {isRunning ? (
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-green-600 font-medium">Simulation Active</span>
                          </div>
                        ) : (
                          <div className="text-gray-500">Click Start to begin simulation</div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center text-gray-500">
                        <Settings className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                        <div>Select a scenario to begin</div>
                      </div>
                    )}
                  </div>

                  {/* Animated elements when running */}
                  {isRunning && scenario && (
                    <>
                      <div className="absolute top-4 left-4 w-4 h-4 bg-green-500 rounded-full animate-bounce"></div>
                      <div className="absolute top-8 right-8 w-4 h-4 bg-yellow-500 rounded-full animate-pulse"></div>
                      <div className="absolute bottom-6 left-1/3 w-4 h-4 bg-blue-500 rounded-full animate-ping"></div>
                    </>
                  )}
                </div>
              </Card>

              {/* Event Log */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Event Log</h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {events.map((event, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      {getEventIcon(event.type)}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono text-sm text-gray-600">{event.time}</span>
                          <Badge variant="outline" className="text-xs">
                            {event.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-800">{event.message}</p>
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
