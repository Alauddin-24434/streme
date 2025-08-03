import { columns } from "./columns"


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/dashboard/table/table-data"
import { PrismaClient } from "@/generated/prisma";
const prisma =new PrismaClient();
export default async function SubscriptionsPage() {
  const rawSubscriptions = await prisma.subscription.findMany({
    include: {
      user: true, // Select all fields from user
      plan: true, // Select all fields from plan
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  // Ensure user.password is always a string
  const subscriptions = rawSubscriptions.map(sub => ({
    ...sub,
    user: {
      ...sub.user,
      password: sub.user.password ?? "",
    }
  }))

  return (
    <div className="container mx-auto py-10">
      <Card className="bg-gray-800 text-white border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Subscription Management</CardTitle>
          <CardDescription className="text-gray-300">Manage all user subscriptions.</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={subscriptions} />
        </CardContent>
      </Card>
    </div>
  )
}
