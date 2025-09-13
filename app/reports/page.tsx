"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  RadialBarChart,
  RadialBar
} from "recharts"
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Train, 
  AlertTriangle, 
  CheckCircle, 
  Download, 
  Calendar,
  BarChart3,
  Activity,
  Users,
  MapPin,
  Zap,
  Shield,
  Target,
  Award,
  RefreshCw,
  Filter,
  Eye
} from "lucide-react"

export default function ReportsPage() {
  // Enhanced mock data for railway analytics
  const allPerformanceData = [
    { month: "Jan", onTime: 92, delayed: 8, cancelled: 0, avgDelay: 2.1 },
    { month: "Feb", onTime: 89, delayed: 11, cancelled: 0, avgDelay: 3.2 },
    { month: "Mar", onTime: 94, delayed: 6, cancelled: 0, avgDelay: 1.8 },
    { month: "Apr", onTime: 87, delayed: 13, cancelled: 0, avgDelay: 4.1 },
    { month: "May", onTime: 91, delayed: 9, cancelled: 0, avgDelay: 2.8 },
    { month: "Jun", onTime: 88, delayed: 12, cancelled: 0, avgDelay: 3.5 },
  ]

  const dailyTrafficData = [
    { hour: "06:00", trains: 8, passengers: 2400, revenue: 48000 },
    { hour: "07:00", trains: 15, passengers: 7500, revenue: 150000 },
    { hour: "08:00", trains: 22, passengers: 13200, revenue: 264000 },
    { hour: "09:00", trains: 18, passengers: 7200, revenue: 144000 },
    { hour: "10:00", trains: 12, passengers: 3600, revenue: 72000 },
    { hour: "11:00", trains: 14, passengers: 4200, revenue: 84000 },
    { hour: "12:00", trains: 16, passengers: 4800, revenue: 96000 },
    { hour: "13:00", trains: 19, passengers: 5700, revenue: 114000 },
    { hour: "14:00", trains: 17, passengers: 5100, revenue: 102000 },
    { hour: "15:00", trains: 20, passengers: 6000, revenue: 120000 },
    { hour: "16:00", trains: 25, passengers: 7500, revenue: 150000 },
    { hour: "17:00", trains: 28, passengers: 8400, revenue: 168000 },
    { hour: "18:00", trains: 24, passengers: 7200, revenue: 144000 },
  ]

  const incidentData = [
    { name: "Signal Issues", value: 35, color: "#EF4444", impact: "High" },
    { name: "Weather Delays", value: 28, color: "#F59E0B", impact: "Medium" },
    { name: "Mechanical", value: 20, color: "#3B82F6", impact: "High" },
    { name: "Track Maintenance", value: 12, color: "#10B981", impact: "Low" },
    { name: "Passenger Issues", value: 5, color: "#8B5CF6", impact: "Medium" },
  ]

  const routePerformance = [
    { route: "North Line", onTime: 94, utilization: 78, revenue: 1250000 },
    { route: "South Line", onTime: 89, utilization: 85, revenue: 1180000 },
    { route: "East Line", onTime: 92, utilization: 72, revenue: 980000 },
    { route: "West Line", onTime: 87, utilization: 68, revenue: 820000 },
    { route: "Central Hub", onTime: 96, utilization: 95, revenue: 2100000 },
  ]

  const efficiencyMetrics = [
    { name: "Energy Efficiency", value: 87, target: 90, unit: "%" },
    { name: "Track Utilization", value: 76, target: 80, unit: "%" },
    { name: "Passenger Satisfaction", value: 92, target: 85, unit: "%" },
    { name: "Safety Score", value: 98, target: 95, unit: "%" },
  ]

  const allKpis = [
    {
      title: "On-Time Performance",
      value: "88.5%",
      change: "-2.1%",
      trend: "down",
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      target: "92%"
    },
    {
      title: "Daily Train Count",
      value: "247",
      change: "+12",
      trend: "up",
      icon: Train,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      target: "250"
    },
    {
      title: "Active Incidents",
      value: "3",
      change: "-2",
      trend: "down",
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      target: "< 5"
    },
    {
      title: "System Uptime",
      value: "99.7%",
      change: "+0.2%",
      trend: "up",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      target: "99.5%"
    },
    {
      title: "Passenger Volume",
      value: "45.2K",
      change: "+8.3%",
      trend: "up",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      target: "40K"
    },
    {
      title: "Revenue Efficiency",
      value: "94.8%",
      change: "+1.5%",
      trend: "up",
      icon: Award,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200",
      target: "90%"
    },
  ]

  const recentReports = [
    { name: "Monthly Performance Report - June 2024", date: "2024-06-30", type: "Performance", size: "2.4 MB", downloads: 45 },
    { name: "Incident Analysis Q2 2024", date: "2024-06-28", type: "Incidents", size: "1.8 MB", downloads: 32 },
    { name: "Traffic Pattern Analysis", date: "2024-06-25", type: "Traffic", size: "3.1 MB", downloads: 67 },
    { name: "Maintenance Schedule Report", date: "2024-06-22", type: "Maintenance", size: "1.2 MB", downloads: 28 },
    { name: "Revenue Optimization Study", date: "2024-06-20", type: "Revenue", size: "2.8 MB", downloads: 51 },
    { name: "Safety Compliance Report", date: "2024-06-18", type: "Safety", size: "1.5 MB", downloads: 39 },
  ]
  const [performanceData, setPerformanceData] = useState(allPerformanceData)
  const [selectedPeriod, setSelectedPeriod] = useState("last-7-days")

  // Calculate dynamic stats based on selected period
  const getDynamicStats = () => {
    const data = performanceData
    const avgOnTime = data.reduce((sum, item) => sum + item.onTime, 0) / data.length
    const avgDelayed = data.reduce((sum, item) => sum + item.delayed, 0) / data.length
    const totalTrains = data.length * 40 // Approximate trains per month
    const avgDelay = data.reduce((sum, item) => sum + item.avgDelay, 0) / data.length

    return {
      onTime: avgOnTime.toFixed(1),
      trains: totalTrains.toString(),
      incidents: Math.max(1, Math.floor(avgDelayed / 4)).toString(), // Rough calculation
      uptime: (99.5 + Math.random() * 0.5).toFixed(1), // Simulate uptime
      passengers: Math.floor(totalTrains * 1800 * (avgOnTime / 100)).toLocaleString(), // Passengers affected
      revenue: (avgOnTime * 1000).toFixed(1) // Revenue efficiency
    }
  }

  const dynamicStats = getDynamicStats()

  const kpis = [
    {
      title: "On-Time Performance",
      value: `${dynamicStats.onTime}%`,
      change: selectedPeriod === "last-7-days" ? "+2.1%" : "-2.1%",
      trend: selectedPeriod === "last-7-days" ? "up" : "down",
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      target: "92%"
    },
    {
      title: "Daily Train Count",
      value: dynamicStats.trains,
      change: "+12",
      trend: "up",
      icon: Train,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      target: "250"
    },
    {
      title: "Active Incidents",
      value: dynamicStats.incidents,
      change: "-2",
      trend: "down",
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      target: "< 5"
    },
    {
      title: "System Uptime",
      value: `${dynamicStats.uptime}%`,
      change: "+0.2%",
      trend: "up",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      target: "99.5%"
    },
    {
      title: "Passenger Volume",
      value: dynamicStats.passengers,
      change: "+8.3%",
      trend: "up",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      target: "40K"
    },
    {
      title: "Revenue Efficiency",
      value: `${dynamicStats.revenue}%`,
      change: "+1.5%",
      trend: "up",
      icon: Award,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200",
      target: "90%"
    },
  ]

  const handleSelect = (value: string) => {
    setSelectedPeriod(value)
    console.log("Filter", value)
    if (value === "last-7-days") {
      setPerformanceData(allPerformanceData.slice(0, 7))
    } else if (value === "last-30-days") {
      setPerformanceData(allPerformanceData.slice(0, 30))
    } else if (value === "last-90-days") {
      setPerformanceData(allPerformanceData.slice(0, 90))
    } else {
      setPerformanceData(allPerformanceData)
    }
  }
  const handleExport = () => {
    const exportData = {
      performance: allPerformanceData,
      traffic: dailyTrafficData,
      incidents: incidentData,
      routes: routePerformance,
      efficiency: efficiencyMetrics,
    };
  
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement("a");
    a.href = url;
    a.download = "railway_report.json";
    a.click();
    URL.revokeObjectURL(url);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <Navigation />
      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-slate-800 mb-2">Railway Analytics & Reports</h1>
              <p className="text-slate-600">Comprehensive performance metrics and operational insights</p>
            </div>
            <div className="flex gap-3">
              <Select value={selectedPeriod} onValueChange={handleSelect}>
                <SelectTrigger className="w-48 border-slate-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last-7-days">Last 7 Days</SelectItem>
                  <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                  <SelectItem value="last-90-days">Last 90 Days</SelectItem>
                  <SelectItem value="last-year">Last Year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="border-slate-300">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button onClick={handleExport} className="bg-blue-600 hover:bg-blue-700">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>

          {/* Enhanced KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {kpis.map((kpi, index) => {
              const Icon = kpi.icon
              return (
                <Card key={index} className={`p-6 ${kpi.bgColor} ${kpi.borderColor} border-2 hover:shadow-lg transition-all duration-200`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-white/80 rounded-xl">
                      <Icon className={`h-6 w-6 ${kpi.color}`} />
                    </div>
                    <div className="flex flex-col items-end">
                      <div
                        className={`flex items-center gap-1 text-sm ${kpi.trend === "up" ? "text-green-600" : "text-red-600"}`}
                      >
                        {kpi.trend === "up" ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                        {kpi.change}
                      </div>
                      <div className="text-xs text-slate-500 mt-1">Target: {kpi.target}</div>
                    </div>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-slate-800 mb-1">{kpi.value}</p>
                    <p className="text-sm font-medium text-slate-700">{kpi.title}</p>
                  </div>
                </Card>
              )
            })}
          </div>

          {/* Enhanced Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Performance Trend Chart */}
            <Card className="p-6 bg-white/90 border-slate-200 shadow-lg">
              <div className="flex items-center gap-2 mb-6">
                <BarChart3 className="h-5 w-5 text-slate-600" />
                <h3 className="text-lg font-semibold text-slate-800">Monthly Performance Trends</h3>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="month" stroke="#64748B" />
                  <YAxis stroke="#64748B" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #E2E8F0', 
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                  <Area type="monotone" dataKey="onTime" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} name="On Time %" />
                  <Area type="monotone" dataKey="delayed" stackId="2" stroke="#EF4444" fill="#EF4444" fillOpacity={0.6} name="Delayed %" />
                </AreaChart>
              </ResponsiveContainer>
            </Card>

            {/* Traffic & Revenue Pattern */}
            <Card className="p-6 bg-white/90 border-slate-200 shadow-lg">
              <div className="flex items-center gap-2 mb-6">
                <Activity className="h-5 w-5 text-slate-600" />
                <h3 className="text-lg font-semibold text-slate-800">Peak Hour Analysis</h3>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dailyTrafficData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="hour" stroke="#64748B" />
                  <YAxis yAxisId="left" stroke="#64748B" />
                  <YAxis yAxisId="right" orientation="right" stroke="#64748B" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #E2E8F0', 
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                  <Line yAxisId="left" type="monotone" dataKey="trains" stroke="#3B82F6" strokeWidth={3} name="Trains" />
                  <Line yAxisId="right" type="monotone" dataKey="passengers" stroke="#8B5CF6" strokeWidth={2} name="Passengers (K)" />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Incident Analysis */}
            <Card className="p-6 bg-white/90 border-slate-200 shadow-lg">
              <div className="flex items-center gap-2 mb-6">
                <Shield className="h-5 w-5 text-slate-600" />
                <h3 className="text-lg font-semibold text-slate-800">Incident Analysis</h3>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={incidentData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }: any) => `${(percent * 100).toFixed(0)}%`}
                  >
                    {incidentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {incidentData.map((incident, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: incident.color }}></div>
                      <span className="text-slate-700">{incident.name}</span>
                    </div>
                    <Badge className={`text-xs ${
                      incident.impact === "High" ? "bg-red-100 text-red-800" :
                      incident.impact === "Medium" ? "bg-yellow-100 text-yellow-800" :
                      "bg-green-100 text-green-800"
                    }`}>
                      {incident.impact}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recent Reports */}
            <Card className="p-6 lg:col-span-2 bg-white/90 border-slate-200 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-slate-600" />
                  <h3 className="text-lg font-semibold text-slate-800">Recent Reports</h3>
                </div>
                <Button variant="outline" size="sm" className="border-slate-300">
                  <Eye className="h-4 w-4 mr-2" />
                  View All
                </Button>
              </div>
              <div className="space-y-3">
                {recentReports.map((report, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-800 mb-1">{report.name}</h4>
                      <div className="flex items-center gap-4 text-sm text-slate-600">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {report.date}
                        </span>
                        <Badge variant="outline" className="text-xs border-slate-300">
                          {report.type}
                        </Badge>
                        <span>{report.size}</span>
                        <span className="flex items-center gap-1">
                          <Download className="h-3 w-3" />
                          {report.downloads} downloads
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="hover:bg-slate-200">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="hover:bg-slate-200">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            {/* Efficiency Metrics */}
            <Card className="p-6 bg-white/90 border-slate-200 shadow-lg">
              <div className="flex items-center gap-2 mb-6">
                <Target className="h-5 w-5 text-slate-600" />
                <h3 className="text-lg font-semibold text-slate-800">Efficiency Metrics</h3>
              </div>
              <div className="space-y-4">
                {efficiencyMetrics.map((metric, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700">{metric.name}</span>
                      <span className="text-sm font-bold text-slate-800">{metric.value}{metric.unit}</span>
                    </div>
                    <Progress value={metric.value} className="h-2" />
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>Target: {metric.target}{metric.unit}</span>
                      <span className={metric.value >= metric.target ? "text-green-600" : "text-yellow-600"}>
                        {metric.value >= metric.target ? "✓ Achieved" : "⚠ Below Target"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            {/* Route Performance */}
            <Card className="p-6 bg-white/90 border-slate-200 shadow-lg">
              <div className="flex items-center gap-2 mb-6">
                <MapPin className="h-5 w-5 text-slate-600" />
                <h3 className="text-lg font-semibold text-slate-800">Route Performance Analysis</h3>
              </div>
              <div className="space-y-4">
                {routePerformance.map((route, index) => (
                  <div key={index} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-slate-800">{route.route}</span>
                      <div className="flex gap-4 text-sm text-slate-600">
                        <span>₹{(route.revenue / 100000).toFixed(1)}L</span>
                        <span>{route.utilization}% util</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <Progress value={route.onTime} className="h-2" />
                        <div className="text-xs text-slate-500 mt-1">{route.onTime}% on-time</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
