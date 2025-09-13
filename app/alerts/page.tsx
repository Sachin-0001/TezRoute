import { Navigation } from "@/components/navigation"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  AlertTriangle, 
  AlertCircle, 
  Info, 
  CheckCircle, 
  Clock,
  Train,
  MapPin,
  Users,
  Zap,
  Shield,
  Activity,
  Filter,
  RefreshCw,
  Bell,
  Eye,
  MessageSquare,
  Phone
} from "lucide-react"

export default function AlertsPage() {
  const alerts = [
    {
      id: "A001",
      type: "critical",
      title: "Signal Failure - Track 3",
      message: "Automatic signaling system failure detected on Track 3, Section B. Manual control required immediately.",
      timestamp: "14:23:45",
      status: "active",
      priority: "critical",
      location: "Track 3, Section B",
      affectedTrains: [
        { id: "T003", name: "Express North", passengers: 1200, delay: 0 },
        { id: "T007", name: "Freight West", passengers: 0, delay: 5 },
        { id: "T012", name: "Local East", passengers: 450, delay: 0 }
      ],
      estimatedImpact: "High",
      responseTime: "2 minutes",
      assignedTo: "Signal Team Alpha",
      escalationLevel: 3
    },
    {
      id: "A002",
      type: "warning",
      title: "Weather Alert - Heavy Rain",
      message: "Heavy rain expected in 30 minutes. Reduce speed limits on outdoor sections to 40 km/h.",
      timestamp: "14:20:12",
      status: "active",
      priority: "high",
      location: "All outdoor sections",
      affectedTrains: [
        { id: "T001", name: "Express South", passengers: 1100, delay: 2 },
        { id: "T004", name: "Regional North", passengers: 680, delay: 1 },
        { id: "T009", name: "Local West", passengers: 320, delay: 0 }
      ],
      estimatedImpact: "Medium",
      responseTime: "15 minutes",
      assignedTo: "Weather Monitoring Team",
      escalationLevel: 2
    },
    {
      id: "A003",
      type: "info",
      title: "Maintenance Completed",
      message: "Scheduled maintenance on Platform A2 completed successfully. Platform now operational for all services.",
      timestamp: "14:15:30",
      status: "resolved",
      priority: "low",
      location: "Platform A2",
      affectedTrains: [],
      estimatedImpact: "None",
      responseTime: "0 minutes",
      assignedTo: "Maintenance Team Beta",
      escalationLevel: 0
    },
    {
      id: "A004",
      type: "critical",
      title: "Emergency Stop Activated",
      message: "Emergency stop button activated at Central Station. All trains in vicinity halted for safety inspection.",
      timestamp: "14:10:22",
      status: "active",
      priority: "critical",
      location: "Central Station",
      affectedTrains: [
        { id: "T002", name: "Express East", passengers: 1350, delay: 8 },
        { id: "T005", name: "Regional South", passengers: 520, delay: 5 },
        { id: "T008", name: "Local North", passengers: 380, delay: 3 }
      ],
      estimatedImpact: "Critical",
      responseTime: "1 minute",
      assignedTo: "Emergency Response Team",
      escalationLevel: 4
    },
    {
      id: "A005",
      type: "warning",
      title: "Passenger Overcrowding",
      message: "Platform B1 experiencing high passenger density (150% capacity). Consider additional trains or crowd management.",
      timestamp: "14:05:18",
      status: "acknowledged",
      priority: "medium",
      location: "Platform B1",
      affectedTrains: [
        { id: "T006", name: "Express West", passengers: 980, delay: 2 }
      ],
      estimatedImpact: "Medium",
      responseTime: "10 minutes",
      assignedTo: "Platform Management",
      escalationLevel: 1
    },
    {
      id: "A006",
      type: "warning",
      title: "Power Supply Fluctuation",
      message: "Voltage fluctuation detected in power grid section 7. Backup systems activated.",
      timestamp: "14:00:05",
      status: "monitoring",
      priority: "medium",
      location: "Power Grid Section 7",
      affectedTrains: [
        { id: "T010", name: "Freight Central", passengers: 0, delay: 1 },
        { id: "T014", name: "Express North", passengers: 1150, delay: 0 }
      ],
      estimatedImpact: "Low",
      responseTime: "5 minutes",
      assignedTo: "Electrical Team",
      escalationLevel: 1
    }
  ]

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <AlertTriangle className="h-6 w-6 text-red-600" />
      case "warning":
        return <AlertCircle className="h-6 w-6 text-yellow-600" />
      case "info":
        return <Info className="h-6 w-6 text-blue-600" />
      default:
        return <Info className="h-6 w-6 text-gray-600" />
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
        return <Badge className="bg-red-100 text-red-800 border-red-200 font-semibold">Active</Badge>
      case "acknowledged":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 font-semibold">Acknowledged</Badge>
      case "resolved":
        return <Badge className="bg-green-100 text-green-800 border-green-200 font-semibold">Resolved</Badge>
      case "monitoring":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200 font-semibold">Monitoring</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "Critical":
        return "text-red-600"
      case "High":
        return "text-orange-600"
      case "Medium":
        return "text-yellow-600"
      case "Low":
        return "text-green-600"
      case "None":
        return "text-gray-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <Navigation />
      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-slate-800 mb-2">Railway Alert Center</h1>
              <p className="text-slate-600">Real-time incident monitoring and response management</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="border-slate-300">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" className="border-slate-300">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Bell className="h-4 w-4 mr-2" />
                Alert Settings
              </Button>
            </div>
          </div>

          {/* Enhanced Alert Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6 border-l-4 border-l-red-500 bg-red-50/50 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Critical Alerts</p>
                  <p className="text-3xl font-bold text-red-600">{alerts.filter(a => a.priority === "critical").length}</p>
                  <p className="text-xs text-slate-500 mt-1">Require immediate action</p>
                </div>
                <div className="p-3 bg-red-100 rounded-xl">
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
              </div>
            </Card>
            <Card className="p-6 border-l-4 border-l-yellow-500 bg-yellow-50/50 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Warnings</p>
                  <p className="text-3xl font-bold text-yellow-600">{alerts.filter(a => a.priority === "high" || a.priority === "medium").length}</p>
                  <p className="text-xs text-slate-500 mt-1">Monitor closely</p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-xl">
                  <AlertCircle className="h-8 w-8 text-yellow-600" />
                </div>
              </div>
            </Card>
            <Card className="p-6 border-l-4 border-l-blue-500 bg-blue-50/50 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Active Incidents</p>
                  <p className="text-3xl font-bold text-blue-600">{alerts.filter(a => a.status === "active").length}</p>
                  <p className="text-xs text-slate-500 mt-1">Under investigation</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Activity className="h-8 w-8 text-blue-600" />
                </div>
              </div>
            </Card>
            <Card className="p-6 border-l-4 border-l-green-500 bg-green-50/50 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Resolved Today</p>
                  <p className="text-3xl font-bold text-green-600">{alerts.filter(a => a.status === "resolved").length}</p>
                  <p className="text-xs text-slate-500 mt-1">Successfully handled</p>
                </div>
                <div className="p-3 bg-green-100 rounded-xl">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </div>
            </Card>
          </div>

          {/* Enhanced Alert List */}
          <div className="space-y-6">
            {alerts.map((alert) => (
              <Card key={alert.id} className={`p-8 border-l-4 ${getAlertColor(alert.type)} bg-white/90 border-slate-200 shadow-lg hover:shadow-xl transition-shadow`}>
                {/* Alert Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white/80 rounded-xl">
                      {getAlertIcon(alert.type)}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-slate-800 mb-2">{alert.title}</h3>
                      <p className="text-slate-600 mb-4">{alert.message}</p>
                      <div className="flex items-center gap-6 text-sm text-slate-500">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {alert.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {alert.timestamp}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {alert.assignedTo}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <div className="flex gap-2">
                      <Badge className={`${getPriorityColor(alert.priority)} font-semibold`}>
                        {alert.priority.toUpperCase()}
                      </Badge>
                      {getStatusBadge(alert.status)}
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-slate-500 mb-1">Escalation Level</div>
                      <div className="flex items-center gap-2">
                        <Progress value={(alert.escalationLevel / 4) * 100} className="w-16 h-2" />
                        <span className="text-sm font-semibold text-slate-700">{alert.escalationLevel}/4</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Alert Details */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                  {/* Impact & Response */}
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                      <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        Impact Assessment
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-slate-600">Estimated Impact:</span>
                          <span className={`font-semibold ${getImpactColor(alert.estimatedImpact)}`}>
                            {alert.estimatedImpact}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-slate-600">Response Time:</span>
                          <span className="font-semibold text-slate-800">{alert.responseTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Affected Trains */}
                  {alert.affectedTrains.length > 0 && (
                    <div className="lg:col-span-2">
                      <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                        <Train className="h-4 w-4" />
                        Affected Trains ({alert.affectedTrains.length})
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {alert.affectedTrains.map((train, index) => (
                          <div key={index} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <span className="text-lg">{train.passengers > 0 ? "🚆" : "🚛"}</span>
                                <span className="font-semibold text-slate-800">{train.name}</span>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {train.id}
                              </Badge>
                            </div>
                            <div className="space-y-1 text-sm text-slate-600">
                              {train.passengers > 0 && (
                                <div className="flex justify-between">
                                  <span>Passengers:</span>
                                  <span>{train.passengers.toLocaleString()}</span>
                                </div>
                              )}
                              {train.delay > 0 && (
                                <div className="flex justify-between text-yellow-600">
                                  <span>Delay:</span>
                                  <span>+{train.delay}min</span>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t border-slate-200">
                  {alert.status === "active" && (
                    <>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Acknowledge
                      </Button>
                      <Button size="sm" variant="outline" className="border-slate-300">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <Button size="sm" variant="outline" className="border-slate-300">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Add Comment
                      </Button>
                      <Button size="sm" variant="outline" className="text-green-600 border-green-200 hover:bg-green-50">
                        <Zap className="h-4 w-4 mr-2" />
                        Resolve
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                        <Phone className="h-4 w-4 mr-2" />
                        Escalate
                      </Button>
                    </>
                  )}
                  {alert.status === "acknowledged" && (
                    <>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <Zap className="h-4 w-4 mr-2" />
                        Mark Resolved
                      </Button>
                      <Button size="sm" variant="outline" className="border-slate-300">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <Button size="sm" variant="outline" className="border-slate-300">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Add Comment
                      </Button>
                    </>
                  )}
                  {alert.status === "resolved" && (
                    <Button size="sm" variant="outline" disabled className="border-slate-300">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Resolved
                    </Button>
                  )}
                  {alert.status === "monitoring" && (
                    <>
                      <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">
                        <Activity className="h-4 w-4 mr-2" />
                        Continue Monitoring
                      </Button>
                      <Button size="sm" variant="outline" className="border-slate-300">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </>
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
