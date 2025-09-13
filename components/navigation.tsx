"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Train } from "lucide-react"
import Link from "next/link"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import { User } from "lucide-react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { href: "/decision-panel", label: "Decision Panel" },
    { href: "/alerts", label: "Alerts" },
    { href: "/simulation", label: "Simulation Mode" },
    { href: "/reports", label: "KPIs/Reports" },
  ]

  return (
  <nav className="h-16 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white flex items-center justify-between px-6 rounded-b-2xl border-b border-blue-800/40 backdrop-blur-md">
      {/* Left side - Burger menu and logo */}
  <div className="flex items-center gap-6">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white hover:bg-blue-800">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700 text-white border-blue-800 rounded-r-2xl">
            <div className="flex flex-col gap-4 mt-10">
              <Link href = "/"><div className="flex items-center gap-2 mb-8">
                <Train className="h-7 w-7 text-green-400 drop-shadow-lg" />
                <span className="font-bold text-xl tracking-wide">TezRoute</span>
              </div></Link>
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-5 py-3 rounded-lg hover:bg-blue-800/80 hover:text-green-300 transition-colors font-medium text-base"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>

        <Link href = "/"><div className="flex items-center gap-2">
          <Train className="h-9 w-9 text-green-400" />
          <h1 className="text-2xl font-extrabold tracking-wide">TezRoute</h1>
        </div></Link>
      </div>

      {/* Right side - Status indicator */}
      <div className="flex items-center gap-4">
        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
        <span className="text-sm">System Online</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="relative flex items-center justify-center w-10 h-10 rounded-full bg-blue-800 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all group"
              aria-label="Open profile menu"
            >
              <User className="w-6 h-6 text-white group-hover:text-green-400 transition-colors" />
              <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 border-2 border-blue-900 rounded-full"></span>
            </button>
          </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white text-black rounded-xl p-2 min-w-[180px] border border-blue-100 mt-2 animate-fade-in z-[100]">
            <div className="px-3 py-2 border-b border-gray-200 mb-2 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-900" />
              <span className="font-semibold text-blue-900">Profile</span>
            </div>
            <DropdownMenuItem className="hover:bg-blue-50 px-3 py-2 rounded-lg font-medium cursor-pointer transition-colors">My Account</DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-blue-50 px-3 py-2 rounded-lg font-medium cursor-pointer transition-colors">Settings</DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-blue-50 px-3 py-2 rounded-lg font-medium cursor-pointer transition-colors text-red-600">Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
    </nav>
  )
}
