import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PrismaClient } from "@/generated/prisma"
import { Users, Film, DollarSign } from "lucide-react"
const prisma = new PrismaClient();
export default async function DashboardOverviewPage() {
  // Fetch some basic counts for the overview
  const userCount = await prisma.user.count()
  const mediaContentCount = await prisma.mediaContent.count()
  const subscriptionCount = await prisma.subscription.count()

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="bg-gray-800 text-white border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          <Users className="h-4 w-4 text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{userCount}</div>
          <p className="text-xs text-gray-400">+20.1% from last month</p>
        </CardContent>
      </Card>
      <Card className="bg-gray-800 text-white border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Media Content</CardTitle>
          <Film className="h-4 w-4 text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{mediaContentCount}</div>
          <p className="text-xs text-gray-400">+15 new items this week</p>
        </CardContent>
      </Card>
      <Card className="bg-gray-800 text-white border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
          <DollarSign className="h-4 w-4 text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{subscriptionCount}</div>
          <p className="text-xs text-gray-400">+5% from last month</p>
        </CardContent>
      </Card>
      {/* Add more cards for other metrics like Advertisements, Reactions, etc. */}
    </div>
  )
}
