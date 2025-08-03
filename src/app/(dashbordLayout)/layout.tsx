import type React from "react"
import Link from "next/link"
import { Home, Users, Film, Tv, DollarSign, Settings, LayoutDashboard } from "lucide-react"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[220px_1fr] bg-gray-950 text-white">
      <aside className="hidden border-r border-gray-800 bg-gray-900 lg:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b border-gray-800 px-6">
            <Link className="flex items-center gap-2 font-semibold" href="/dashboard">
              <LayoutDashboard className="h-6 w-6 text-red-500" />
              <span className="text-lg">Admin Dashboard</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 transition-all hover:text-red-500"
                href="/dashboard"
              >
                <Home className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 transition-all hover:text-red-500"
                href="/dashboard/users"
              >
                <Users className="h-4 w-4" />
                Users
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 transition-all hover:text-red-500"
                href="/dashboard/media-content"
              >
                <Film className="h-4 w-4" />
                Media Content
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 transition-all hover:text-red-500"
                href="/dashboard/subscriptions"
              >
                <DollarSign className="h-4 w-4" />
                Subscriptions
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 transition-all hover:text-red-500"
                href="/dashboard/advertisements"
              >
                <Tv className="h-4 w-4" />
                Advertisements
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 transition-all hover:text-red-500"
                href="/dashboard/settings"
              >
                <Settings className="h-4 w-4" />
                Settings
              </Link>
            </nav>
          </div>
        </div>
      </aside>
      <div className="flex flex-col">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b border-gray-800 bg-gray-900 px-6">
          <Link className="lg:hidden flex items-center gap-2 font-semibold" href="/dashboard">
            <LayoutDashboard className="h-6 w-6 text-red-500" />
            <span className="sr-only">Admin Dashboard</span>
          </Link>
          <div className="w-full flex-1">{/* Search or other header elements can go here */}</div>
          {/* User profile/logout can go here */}
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">{children}</main>
      </div>
    </div>
  )
}
