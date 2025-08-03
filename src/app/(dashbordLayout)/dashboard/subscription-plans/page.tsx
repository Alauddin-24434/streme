import { columns } from "./columns"

const prisma = new PrismaClient()
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/dashboard/table/table-data"
import { PrismaClient } from "@/generated/prisma"

export default async function SubscriptionPlansPage() {
  const subscriptionPlans = await prisma.subscriptionPlan.findMany({
    orderBy: {
      createdAt: "desc",
    },
  })

  return (
    <div className="container mx-auto py-10">
      <Card className="bg-gray-800 text-white border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Subscription Plan Management</CardTitle>
          <CardDescription className="text-gray-300">Manage all available subscription plans.</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={subscriptionPlans} />
        </CardContent>
      </Card>
    </div>
  )
}
