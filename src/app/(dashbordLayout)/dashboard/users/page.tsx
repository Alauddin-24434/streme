

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PrismaClient } from "@/generated/prisma"
import { columns } from "./columns";
import { DataTable } from "@/components/dashboard/table/table-data";
const prisma = new PrismaClient();
export default async function UsersPage() {
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  })

  const mappedUsers = users.map(user => ({
    ...user,
    password: user.password ?? "",
  }));

  return (
    <div className="container mx-auto py-10">
      <Card className="bg-gray-800 text-white border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">User Management</CardTitle>
          <CardDescription className="text-gray-300">Manage all users in your system.</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={mappedUsers} />
        </CardContent>
      </Card>
    </div>
  )
}
