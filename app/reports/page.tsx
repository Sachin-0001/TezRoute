"use client"

import { Navigation } from "@/components/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
} from "recharts"
import { TrendingUp, TrendingDown, Clock, Train, AlertTriangle, CheckCircle, Download, Calendar } from "lucide-react"

export default function ReportsPage() {
  // Mock data for charts
  const performanceData = [
    { month: "Jan", onTime: 92, delayed: 8 },
    { month: "Feb", onTime: 89, delayed: 11 },
    { month: "Mar", onTime: 94, delayed: 6 },
    { month: "Apr", onTime: 87, delayed: 13 },
    { month: "May", onTime: 91, delayed: 9 },
    { month: "Jun", onTime: 88, delayed: 12 },
  ]

  const dailyTrafficData = [
    { hour: "06:00", trains: 8 },
    { hour: "07:00", trains: 15 },
    { hour: "08:00", trains: 22 },
    { hour: "09:00", trains: 18 },
    { hour: "10:00", trains: 12 },
    { hour: "11:00", trains: 14 },
    { hour: "12:00", trains: 16 },
    { hour: "13:00", trains: 19 },
    { hour: "14:00", trains: 17 },
    { hour: "15:00", trains: 20 },
    { hour: "16:00", trains: 25 },
    { hour: "17:00", trains: 28 },
    { hour: "18:00", trains: 24 },
  ]

  const incidentData = [
    { name: "Signal Issues", value: 35, color: "#EF4444" },
    { name: "Weather Delays", value: 28, color: "#F59E0B" },
    { name: "Mechanical", value: 20, color: "#3B82F6" },
    { name: "Track Maintenance", value: 12, color: "#10B981" },
    { name: "Other", value: 5, color: "#6B7280" },
  ]

  const kpis = [
    {
      title: "On-Time Performance",
      value: "88.5%",
      change: "-2.1%",
      trend: "down",
      icon: Clock,
      color: "text-yellow-600",
    },
    {
      title: "Daily Train Count",
      value: "247",
      change: "+12",
      trend: "up",
      icon: Train,
      color: "text-green-600",
    },
    {
      title: "Active Incidents",
      value: "3",
      change: "-2",
      trend: "down",
      icon: AlertTriangle,
      color: "text-red-600",
    },
    {
      title: "System Uptime",
      value: "99.7%",
      change: "+0.2%",
      trend: "up",
      icon: CheckCircle,
      color: "text-green-600",
    },
  ]

  const recentReports = [
    { name: "Monthly Performance Report - June 2024", date: "2024-06-30", type: "Performance", size: "2.4 MB" },
    { name: "Incident Analysis Q2 2024", date: "2024-06-28", type: "Incidents", size: "1.8 MB" },
    { name: "Traffic Pattern Analysis", date: "2024-06-25", type: "Traffic", size: "3.1 MB" },
    { name: "Maintenance Schedule Report", date: "2024-06-22", type: "Maintenance", size: "1.2 MB" },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-blue-900 mb-2">KPIs & Reports</h1>
              <p className="text-gray-600">Performance metrics and analytical reports</p>
            </div>
            <div className="flex gap-3">
              <Select defaultValue="last-30-days">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last-7-days">Last 7 Days</SelectItem>
                  <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                  <SelectItem value="last-90-days">Last 90 Days</SelectItem>
                  <SelectItem value="last-year">Last Year</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {kpis.map((kpi, index) => {
              const Icon = kpi.icon
              return (
                <Card key={index} className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Icon className={`h-8 w-8 ${kpi.color}`} />
                    <div
                      className={`flex items-center gap-1 text-sm ${kpi.trend === "up" ? "text-green-600" : "text-red-600"}`}
                    >
                      {kpi.trend === "up" ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                      {kpi.change}
                    </div>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                    <p className="text-sm text-gray-600">{kpi.title}</p>
                  </div>
                </Card>
              )
            })}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* On-Time Performance Chart */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Monthly On-Time Performance</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="onTime" fill="#10B981" name="On Time %" />
                  <Bar dataKey="delayed" fill="#EF4444" name="Delayed %" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Daily Traffic Pattern */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Daily Traffic Pattern</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dailyTrafficData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="trains" stroke="#3B82F6" strokeWidth={2} name="Trains per Hour" />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Incident Breakdown */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Incident Breakdown</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={incidentData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {incidentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            {/* Recent Reports */}
            <Card className="p-6 lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-blue-900">Recent Reports</h3>
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  View All
                </Button>
              </div>
              <div className="space-y-3">
                {recentReports.map((report, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{report.name}</h4>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                        <span>{report.date}</span>
                        <Badge variant="outline" className="text-xs">
                          {report.type}
                        </Badge>
                        <span>{report.size}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
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
