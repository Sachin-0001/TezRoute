import { Navigation } from "@/components/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Route,
  Train,
  MapPin,
  Users,
  Zap,
  Settings,
  BarChart3,
  TrendingUp,
  Activity,
  Shield,
  ArrowRight,
  AlertCircle,
  Timer
} from "lucide-react"

export default function DecisionPanel() {
  const decisions = [
    {
      id: "D001",
      type: "conflict",
      title: "Track Conflict Resolution",
      description: "T003 Freight West and T008 Express East approaching same junction",
      priority: "high",
      timeRemaining: "2:30",
      affectedTrains: [
        { id: "T003", name: "Freight West", type: "freight", priority: "low", passengers: 0, delay: 0 },
        { id: "T008", name: "Express East", type: "passenger", priority: "high", passengers: 1200, delay: 0 }
      ],
      options: [
        { 
          id: "opt1", 
          title: "Delay T003 Freight by 5 minutes", 
          impact: "low", 
          description: "Minimal passenger impact, freight can accommodate delay",
          aiRecommendation: 85
        },
        { 
          id: "opt2", 
          title: "Reroute T008 Express via alternate track", 
          impact: "medium", 
          description: "Adds 3 minutes to journey, but maintains schedule integrity",
          aiRecommendation: 92
        },
        { 
          id: "opt3", 
          title: "Hold T008 at previous station", 
          impact: "high", 
          description: "Significant delay but ensures safety priority",
          aiRecommendation: 65
        }
      ],
      location: "Junction Point Alpha",
      estimatedCost: "₹45,000",
      riskLevel: "Medium"
    },
    {
      id: "D002",
      type: "delay",
      title: "Platform Assignment Conflict",
      description: "T005 Regional East delayed, platform A3 now available for reassignment",
      priority: "medium",
      timeRemaining: "5:45",
      affectedTrains: [
        { id: "T005", name: "Regional East", type: "passenger", priority: "medium", passengers: 450, delay: 3 },
        { id: "T012", name: "Local South", type: "passenger", priority: "low", passengers: 320, delay: 0 }
      ],
      options: [
        { 
          id: "opt1", 
          title: "Assign T005 to platform A3", 
          impact: "low", 
          description: "Quick resolution, minimal disruption to other services",
          aiRecommendation: 88
        },
        { 
          id: "opt2", 
          title: "Keep original platform B2", 
          impact: "medium", 
          description: "Maintains planned flow but increases delay",
          aiRecommendation: 72
        },
        { 
          id: "opt3", 
          title: "Move T012 to platform C1", 
          impact: "low", 
          description: "Alternative solution with good passenger flow",
          aiRecommendation: 79
        }
      ],
      location: "Central Hub",
      estimatedCost: "₹15,000",
      riskLevel: "Low"
    },
    {
      id: "D003",
      type: "maintenance",
      title: "Emergency Track Maintenance",
      description: "Critical track defect detected on Track 2, requires immediate attention",
      priority: "critical",
      timeRemaining: "1:15",
      affectedTrains: [
        { id: "T007", name: "Express North", type: "passenger", priority: "high", passengers: 1100, delay: 0 },
        { id: "T015", name: "Freight Central", type: "freight", priority: "medium", passengers: 0, delay: 0 },
        { id: "T021", name: "Local West", type: "passenger", priority: "medium", passengers: 280, delay: 0 }
      ],
      options: [
        { 
          id: "opt1", 
          title: "Immediate track closure for repair", 
          impact: "critical", 
          description: "Ensures safety but causes major disruption",
          aiRecommendation: 95
        },
        { 
          id: "opt2", 
          title: "Reduce speed to 30 km/h", 
          impact: "high", 
          description: "Allows continued operation with safety margin",
          aiRecommendation: 78
        },
        { 
          id: "opt3", 
          title: "Reroute all traffic via Track 1", 
          impact: "medium", 
          description: "Alternative routing with capacity constraints",
          aiRecommendation: 82
        }
      ],
      location: "Track 2, Section B",
      estimatedCost: "₹120,000",
      riskLevel: "High"
    },
  ]

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
      case "critical":
        return "bg-red-500"
      case "high":
        return "bg-orange-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "conflict":
        return <AlertTriangle className="h-6 w-6 text-red-600" />
      case "delay":
        return <Clock className="h-6 w-6 text-yellow-600" />
      case "maintenance":
        return <Settings className="h-6 w-6 text-blue-600" />
      default:
        return <CheckCircle className="h-6 w-6 text-gray-600" />
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "High":
        return "text-red-600"
      case "Medium":
        return "text-yellow-600"
      case "Low":
        return "text-green-600"
      default:
        return "text-gray-600"
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
                <h1 className="text-4xl font-bold text-slate-800 mb-2">Decision Support Panel</h1>
                <p className="text-slate-600">AI-powered railway conflict resolution and optimization</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-lg border border-green-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-green-700">AI Active</span>
                </div>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">
                  {decisions.length} Active Decisions
                </Badge>
              </div>
            </div>
          </div>

          <div className="grid gap-6">
            {decisions.map((decision) => (
              <Card key={decision.id} className="p-8 bg-white/90 border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-slate-100 rounded-xl">
                      {getIcon(decision.type)}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-800 mb-2">{decision.title}</h3>
                      <p className="text-slate-600 mb-3">{decision.description}</p>
                      <div className="flex items-center gap-4 text-sm text-slate-500">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {decision.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Timer className="h-4 w-4" />
                          {decision.estimatedCost}
                        </div>
                        <div className={`font-medium ${getRiskColor(decision.riskLevel)}`}>
                          Risk: {decision.riskLevel}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <Badge className={`${getPriorityColor(decision.priority)} text-sm font-semibold px-3 py-1`}>
                      {decision.priority.toUpperCase()} PRIORITY
                    </Badge>
                    <div className="text-right">
                      <div className="text-sm text-slate-500 mb-1">Time Remaining</div>
                      <div className="font-mono text-2xl font-bold text-red-600">{decision.timeRemaining}</div>
                    </div>
                  </div>
                </div>

                {/* Affected Trains */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
                    <Train className="h-5 w-5" />
                    Affected Trains
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {decision.affectedTrains.map((train, index) => (
                      <div key={index} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{train.type === "freight" ? "🚛" : "🚆"}</span>
                            <span className="font-semibold text-slate-800">{train.name}</span>
                          </div>
                          <Badge className={`text-xs ${getPriorityColor(train.priority)}`}>
                            {train.priority}
                          </Badge>
                        </div>
                        <div className="space-y-1 text-sm text-slate-600">
                          <div className="flex justify-between">
                            <span>ID:</span>
                            <span className="font-mono">{train.id}</span>
                          </div>
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

                {/* Decision Options */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    AI Recommended Options
                  </h4>
                  <div className="space-y-4">
                    {decision.options.map((option, index) => (
                      <div key={option.id} className="p-4 border border-slate-200 rounded-lg hover:border-blue-300 hover:bg-blue-50/30 transition-all cursor-pointer">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                            </div>
                            <div className="flex-1">
                              <h5 className="font-semibold text-slate-800 mb-1">{option.title}</h5>
                              <p className="text-sm text-slate-600">{option.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <div className="text-xs text-slate-500 mb-1">AI Score</div>
                              <div className="flex items-center gap-2">
                                <Progress value={option.aiRecommendation} className="w-16 h-2" />
                                <span className="text-sm font-semibold text-slate-700">{option.aiRecommendation}%</span>
                              </div>
                            </div>
                            <div className={`w-3 h-3 rounded-full ${getImpactColor(option.impact)}`}></div>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full hover:bg-blue-600 hover:text-white transition-colors"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Select This Option
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t border-slate-200">
                  <Button className="bg-green-600 hover:bg-green-700 flex-1">
                    <Zap className="h-4 w-4 mr-2" />
                    Execute Recommended Decision
                  </Button>
                  <Button variant="outline" className="border-slate-300">
                    <Settings className="h-4 w-4 mr-2" />
                    Request More Info
                  </Button>
                  <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                    <AlertCircle className="h-4 w-4 mr-2" />
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
