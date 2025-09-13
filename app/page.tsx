"use client"
import { Navigation } from "@/components/navigation"
import { LiveMap } from "@/components/live-map"
import { SchedulePanel } from "@/components/schedule-panel"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import ChatArea from "@/components/ChatArea"
import { useState } from "react"
import { MessageCircle } from "lucide-react"
import { 
  Activity, 
  Clock, 
  AlertTriangle, 
  TrendingUp, 
  Train, 
  Zap, 
  Shield,
  BarChart3,
  Settings,
  RefreshCw
} from "lucide-react"

export default function Dashboard() {
  const [showChat, setShowChat] = useState(false)
  // Mock real-time metrics
  const systemMetrics = [
    {
      title: "Active Trains",
      value: "47",
      change: "+3",
      trend: "up",
      icon: Train,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      title: "On-Time Performance",
      value: "94.2%",
      change: "+2.1%",
      trend: "up",
      icon: Clock,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      title: "Active Conflicts",
      value: "2",
      change: "-1",
      trend: "down",
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200"
    },
    {
      title: "System Efficiency",
      value: "97.8%",
      change: "+0.5%",
      trend: "up",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    }
  ]

  const recentActivities = [
    { time: "14:25:30", type: "resolution", message: "Track conflict resolved - T003 rerouted successfully", priority: "high" },
    { time: "14:23:15", type: "delay", message: "T008 Express delayed by 2 minutes due to passenger boarding", priority: "medium" },
    { time: "14:20:45", type: "maintenance", message: "Platform A2 maintenance completed ahead of schedule", priority: "low" },
    { time: "14:18:12", type: "weather", message: "Weather alert cleared - normal operations resumed", priority: "medium" },
    { time: "14:15:30", type: "optimization", message: "Route optimization applied - 3 trains benefited", priority: "low" }
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "resolution": return <Shield className="h-4 w-4 text-green-600" />
      case "delay": return <Clock className="h-4 w-4 text-yellow-600" />
      case "maintenance": return <Settings className="h-4 w-4 text-blue-600" />
      case "weather": return <AlertTriangle className="h-4 w-4 text-orange-600" />
      case "optimization": return <Zap className="h-4 w-4 text-purple-600" />
      default: return <Activity className="h-4 w-4 text-gray-600" />
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <Navigation />
      <main className="flex h-[calc(100vh-80px)]">
        {/* Left Sidebar - System Metrics */}
        <div className="w-80 border-r border-blue-200/50 bg-gradient-to-b from-white via-blue-50/30 to-white p-6 overflow-y-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-slate-800">System Overview</h2>
              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
            <p className="text-sm text-slate-600">Real-time railway control metrics</p>
          </div>

          {/* Metrics Grid */}
          <div className="space-y-4 mb-8">
            {systemMetrics.map((metric, index) => {
              const Icon = metric.icon
              return (
                <Card key={index} className={`p-4 ${metric.bgColor} ${metric.borderColor} border-2 hover:shadow-md transition-all duration-200`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                      <Icon className={`h-5 w-5 ${metric.color}`} />
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        metric.trend === "up" ? "text-green-600 border-green-300 bg-green-50" : "text-red-600 border-red-300 bg-red-50"
                      }`}
                    >
                      {metric.change}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-800">{metric.value}</p>
                    <p className="text-sm text-slate-600 font-medium">{metric.title}</p>
                  </div>
                </Card>
              )
            })}
          </div>

          {/* Recent Activities */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-600" />
              Recent Activities
            </h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {recentActivities.map((activity, index) => (
                <Card key={index} className="p-4 bg-white border border-slate-200 hover:shadow-sm transition-shadow">
                  <div className="flex items-start gap-3">
                    {getActivityIcon(activity.type)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-xs text-slate-500">{activity.time}</span>
                        <Badge className={`text-xs ${getPriorityColor(activity.priority)}`}>
                          {activity.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-700 leading-relaxed">{activity.message}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Main Map Area */}
        <div className="flex-1 p-6">
          <LiveMap />
        </div>

        {/* Right Sidebar - Schedule Panel */}
        <div className="w-96 border-l border-blue-200/50 bg-gradient-to-b from-white via-blue-50/30 to-white">
          <SchedulePanel />
        </div>
      </main>

      {/* Chat Bubble Toggle (Bottom Right) */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-2">
        {showChat && (
          <div className="mb-2">
            <ChatArea />
          </div>
        )}
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg p-4 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={() => setShowChat((prev) => !prev)}
          aria-label={showChat ? "Close chat" : "Open chat"}
        >
          <MessageCircle className="w-7 h-7" />
        </button>
      </div>
    </div>
  )
}
