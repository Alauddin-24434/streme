"use client"

import type { ColumnDef } from "@tanstack/react-table"

import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { ISubscription } from "@/lib/interface"

// Extend Subscription type to include relations for display
type SubscriptionWithRelations = ISubscription & {
  user: { email: string }
  plan: { name: string }
}

export const columns: ColumnDef<SubscriptionWithRelations>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "user.email",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          User Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.original.user.email}</div>,
  },
  {
    accessorKey: "plan.name",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Plan Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.original.plan.name}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className={
          row.getValue("status") === "Active"
            ? "bg-green-500 hover:bg-green-600 text-white"
            : "bg-gray-600 hover:bg-gray-700 text-white"
        }
      >
        {row.getValue("status")}
      </Badge>
    ),
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("startDate"))
      return <div>{date.toLocaleDateString()}</div>
    },
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    cell: ({ row }) => {
      const date = row.getValue("endDate") ? new Date(row.getValue("endDate") as string) : null
      return <div>{date ? date.toLocaleDateString() : "N/A"}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const subscription = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-gray-800 text-white border-gray-700">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(subscription.id)}
              className="hover:bg-gray-700"
            >
              Copy Subscription ID
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-gray-700" />
            <DropdownMenuItem className="hover:bg-gray-700">View Details</DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-gray-700">Edit Subscription</DropdownMenuItem>
            <DropdownMenuItem className="text-red-400 hover:bg-gray-700 hover:text-red-500">
              Delete Subscription
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
