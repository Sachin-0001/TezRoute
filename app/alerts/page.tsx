import { Navigation } from "@/components/navigation"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, AlertCircle, Info, CheckCircle, Clock } from "lucide-react"

export default function AlertsPage() {
  const alerts = [
    {
      id: "A001",
      type: "critical",
      title: "Signal Failure - Track 3",
      message: "Automatic signaling system failure detected on Track 3, Section B. Manual control required.",
      timestamp: "14:23:45",
      status: "active",
      affectedTrains: ["T003", "T007", "T012"],
    },
    {
      id: "A002",
      type: "warning",
      title: "Weather Alert",
      message: "Heavy rain expected in 30 minutes. Reduce speed limits on outdoor sections.",
      timestamp: "14:20:12",
      status: "active",
      affectedTrains: ["T001", "T004", "T009"],
    },
    {
      id: "A003",
      type: "info",
      title: "Maintenance Completed",
      message: "Scheduled maintenance on Platform A2 completed successfully. Platform now operational.",
      timestamp: "14:15:30",
      status: "resolved",
      affectedTrains: [],
    },
    {
      id: "A004",
      type: "critical",
      title: "Emergency Stop Activated",
      message: "Emergency stop button activated at Central Station. All trains in vicinity halted.",
      timestamp: "14:10:22",
      status: "active",
      affectedTrains: ["T002", "T005", "T008"],
    },
    {
      id: "A005",
      type: "warning",
      title: "Passenger Overcrowding",
      message: "Platform B1 experiencing high passenger density. Consider additional trains.",
      timestamp: "14:05:18",
      status: "acknowledged",
      affectedTrains: ["T006"],
    },
  ]

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <AlertTriangle className="h-5 w-5 text-red-600" />
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-600" />
      case "info":
        return <Info className="h-5 w-5 text-blue-600" />
      default:
        return <Info className="h-5 w-5 text-gray-600" />
    }
  }

  const getAlertColor = (type: string) => {
    switch (type) {
      case "critical":
        return "border-l-red-500 bg-red-50"
      case "warning":
        return "border-l-yellow-500 bg-yellow-50"
      case "info":
        return "border-l-blue-500 bg-blue-50"
      default:
        return "border-l-gray-500 bg-gray-50"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Active</Badge>
      case "acknowledged":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Acknowledged</Badge>
      case "resolved":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Resolved</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="p-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-blue-900 mb-2">System Alerts</h1>
            <p className="text-gray-600">Real-time system notifications and warnings</p>
          </div>

          {/* Alert Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="p-4 border-l-4 border-l-red-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Critical</p>
                  <p className="text-2xl font-bold text-red-600">2</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </Card>
            <Card className="p-4 border-l-4 border-l-yellow-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Warnings</p>
                  <p className="text-2xl font-bold text-yellow-600">2</p>
                </div>
                <AlertCircle className="h-8 w-8 text-yellow-600" />
              </div>
            </Card>
            <Card className="p-4 border-l-4 border-l-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Info</p>
                  <p className="text-2xl font-bold text-blue-600">1</p>
                </div>
                <Info className="h-8 w-8 text-blue-600" />
              </div>
            </Card>
            <Card className="p-4 border-l-4 border-l-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Resolved</p>
                  <p className="text-2xl font-bold text-green-600">1</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </Card>
          </div>

          {/* Alert List */}
          <div className="space-y-4">
            {alerts.map((alert) => (
              <Card key={alert.id} className={`p-6 border-l-4 ${getAlertColor(alert.type)}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {getAlertIcon(alert.type)}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{alert.title}</h3>
                      <p className="text-gray-600 mt-1">{alert.message}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusBadge(alert.status)}
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        {alert.timestamp}
                      </div>
                    </div>
                  </div>
                </div>

                {alert.affectedTrains.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Affected Trains:</p>
                    <div className="flex gap-2">
                      {alert.affectedTrains.map((train) => (
                        <Badge key={train} variant="outline" className="text-blue-700 border-blue-300">
                          {train}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  {alert.status === "active" && (
                    <>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Acknowledge
                      </Button>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-green-600 border-green-200 hover:bg-green-50 bg-transparent"
                      >
                        Resolve
                      </Button>
                    </>
                  )}
                  {alert.status === "acknowledged" && (
                    <>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Mark Resolved
                      </Button>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </>
                  )}
                  {alert.status === "resolved" && (
                    <Button size="sm" variant="outline" disabled>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Resolved
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
