"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Menu,
  Train,
  Activity,
  Settings,
  LogOut,
  User,
  Shield,
  Wifi,
} from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import axios from "axios"; // Added: import axios
import { useRouter } from "next/navigation"; // Add this import

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [firstName, setFirstName] = useState<string | null>(null);
  const router = useRouter(); // Add this line

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get("/api/users/about");
        if (res.data && res.data.firstName) {
          setFirstName(res.data.firstName);
        } else {
          setFirstName(null);
        }
      } catch {
        setFirstName(null);
      }
    }
    fetchUser();
  }, []);

  const menuItems = [
    {
      href: "/decision-panel",
      label: "Decision Panel",
      icon: Settings,
      description: "Critical decisions & controls",
    },
    {
      href: "/alerts",
      label: "System Alerts",
      icon: Shield,
      description: "Notifications & incidents",
    },
    {
      href: "/simulation",
      label: "Simulation Mode",
      icon: Train,
      description: "Test scenarios safely",
    },
    {
      href: "/reports",
      label: "Analytics & Reports",
      icon: Activity,
      description: "Performance metrics & KPIs",
    },
    {
      href: "/createUser",
      label: "Create User",
      icon: User,
      description: "Create a new user",
    },
  ];

  // Add logout handler
  const handleLogout = async () => {
    try {
      await axios.post("/api/users/logout");
      router.push("/login");
    } catch (err) {
      // Optionally handle error
    }
  };

  return (
    <nav className="h-20 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white flex items-center justify-between px-8 shadow-2xl border-b-2 border-blue-500/30 backdrop-blur-md relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-transparent to-blue-600/10 animate-pulse"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>

      {/* Left side - Burger menu and logo */}
      <div className="flex items-center gap-8 relative z-10">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-blue-800/50 hover:scale-105 transition-all duration-200"
            >
              <Menu className="h-7 w-7" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-80 bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 text-white border-blue-500/30 backdrop-blur-xl"
          >
            <div className="flex flex-col gap-6 mt-12">
              <Link href="/" onClick={() => setIsOpen(false)}>
                <div className="flex items-center gap-3 mb-12 p-4 bg-gradient-to-r from-blue-800/30 to-blue-600/30 rounded-2xl border border-blue-500/30">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                    <Train className="h-8 w-8 text-white drop-shadow-lg" />
                  </div>
                  <div>
                    <span className="font-bold text-2xl tracking-wide bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                      TezRoute
                    </span>
                    <p className="text-xs text-blue-200">
                      Railway Control System
                    </p>
                  </div>
                </div>
              </Link>

              <div className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block group"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="flex items-center gap-4 px-5 py-4 rounded-xl hover:bg-blue-800/50 hover:border-blue-500/50 border border-transparent transition-all duration-200 group-hover:shadow-lg group-hover:shadow-blue-500/20">
                        <div className="p-2 bg-blue-800/30 rounded-lg group-hover:bg-blue-700/50 transition-colors">
                          <Icon className="h-5 w-5 text-blue-300 group-hover:text-white transition-colors" />
                        </div>
                        <div>
                          <div className="font-semibold text-base group-hover:text-blue-200 transition-colors">
                            {item.label}
                          </div>
                          <div className="text-xs text-blue-300 group-hover:text-blue-100 transition-colors">
                            {item.description}
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <Link href="/">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-200">
              <Train className="h-8 w-8 text-white drop-shadow-lg" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent">
                TezRoute
              </h1>
              <p className="text-xs text-blue-200 font-medium tracking-wide">
                RAILWAY CONTROL CENTER
              </p>
            </div>
          </div>
        </Link>
      </div>

      {/* Center - System Status */}
      <div className="flex items-center gap-6 relative z-10">
        <div className="flex items-center gap-3 px-4 py-2 bg-green-500/20 rounded-full border border-green-500/30">
          <Wifi className="h-4 w-4 text-green-400" />
          <span className="text-sm font-medium text-green-200">
            System Online
          </span>
        </div>
      </div>

      {/* Right side - User menu */}
      <div className="flex items-center gap-4 relative z-10">
        <Badge
          variant="secondary"
          className="bg-blue-500/20 text-blue-200 border-blue-500/30 px-3 py-1"
        >
          Controller Mode
        </Badge>

        {/* Show user's first name if available */}
        {firstName && (
          <span className="text-blue-100 font-semibold text-base px-2">
            {firstName}
          </span>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-200 group shadow-lg hover:shadow-xl"
              aria-label="Open profile menu"
            >
              <User className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-slate-900 rounded-full animate-pulse shadow-lg"></span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-slate-800 text-white rounded-xl p-3 min-w-[200px] border border-blue-500/30 mt-2 shadow-2xl backdrop-blur-xl">
            <div className="px-3 py-3 border-b border-blue-500/30 mb-3 flex items-center gap-3">
              <div className="p-2 bg-blue-600/30 rounded-lg">
                <User className="w-5 h-5 text-blue-300" />
              </div>
              <div>
                <div className="font-semibold text-white">
                  {/* Show user's first name instead of "Railway Controller" */}
                  {firstName ? firstName : "Railway Controller"}
                </div>
                <div className="text-xs text-blue-300">
                  Senior Traffic Manager
                </div>
              </div>
            </div>
            <DropdownMenuItem className="hover:bg-blue-500/20 px-3 py-2 rounded-lg font-medium cursor-pointer transition-colors flex items-center gap-3">
              <User className="w-4 h-4" />
              <Link href="/profile">My Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-blue-500/20 px-3 py-2 rounded-lg font-medium cursor-pointer transition-colors flex items-center gap-3">
              <Settings className="w-4 h-4" />
              System Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-blue-500/30" />
            <DropdownMenuItem
              onClick={handleLogout} // <-- Add this
              className="hover:bg-red-500/20 px-3 py-2 rounded-lg font-medium cursor-pointer transition-colors flex items-center gap-3 text-red-400"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
