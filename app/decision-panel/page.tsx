import { Navigation } from "@/components/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, CheckCircle, Clock, Route } from "lucide-react"

export default function DecisionPanel() {
  const decisions = [
    {
      id: "D001",
      type: "conflict",
      title: "Track Conflict Resolution",
      description: "T003 Freight West and T008 Express East approaching same junction",
      priority: "high",
      options: ["Delay T003 by 5 minutes", "Reroute T008 via alternate track", "Hold T008 at previous station"],
      timeRemaining: "2:30",
    },
    {
      id: "D002",
      type: "delay",
      title: "Platform Assignment",
      description: "T005 Regional East delayed, platform A3 now available",
      priority: "medium",
      options: ["Assign to platform A3", "Keep original platform B2", "Move to platform C1"],
      timeRemaining: "5:45",
    },
    {
      id: "D003",
      type: "maintenance",
      title: "Track Maintenance Window",
      description: "Scheduled maintenance on Track 2 requires traffic rerouting",
      priority: "low",
      options: ["Proceed with maintenance", "Delay maintenance by 1 hour", "Use alternate maintenance window"],
      timeRemaining: "15:20",
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "conflict":
        return <AlertTriangle className="h-5 w-5 text-red-600" />
      case "delay":
        return <Clock className="h-5 w-5 text-yellow-600" />
      case "maintenance":
        return <Route className="h-5 w-5 text-blue-600" />
      default:
        return <CheckCircle className="h-5 w-5 text-gray-600" />
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="p-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-blue-900 mb-2">Decision Panel</h1>
            <p className="text-gray-600">Critical decisions requiring immediate attention</p>
          </div>

          <div className="grid gap-6">
            {decisions.map((decision) => (
              <Card key={decision.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {getIcon(decision.type)}
                    <div>
                      <h3 className="text-xl font-semibold text-blue-900">{decision.title}</h3>
                      <p className="text-gray-600 mt-1">{decision.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={getPriorityColor(decision.priority)}>
                      {decision.priority.toUpperCase()} PRIORITY
                    </Badge>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">Time Remaining</div>
                      <div className="font-mono text-lg font-bold text-red-600">{decision.timeRemaining}</div>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Available Options:</h4>
                  <div className="space-y-2">
                    {decision.options.map((option, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="w-full justify-start text-left h-auto p-3 hover:bg-blue-50 hover:border-blue-300 bg-transparent"
                      >
                        <span className="font-medium text-blue-900 mr-2">{index + 1}.</span>
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button className="bg-green-600 hover:bg-green-700">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Execute Decision
                  </Button>
                  <Button variant="outline">Request More Info</Button>
                  <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent">
                    Escalate to Supervisor
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
