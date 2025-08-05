import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { DataTable } from "@/components/dashboard/table/table-data";
import { columns } from "./columns";
import MediaContentToggleForm from "./toggoleMediaForm";

export default async function MediaContentPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/media`, {
    cache: "no-store",
  });
  const mediaContent = await res.json();
 
  return (
    <div className="container mx-auto py-10 space-y-8">
      {/* Form এখানে বসাও */}
      <MediaContentToggleForm />

      <Card className="bg-gray-800 text-white border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Media Content Management</CardTitle>
          <CardDescription className="text-gray-300">
            Manage all movies, series, and other media.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={mediaContent} />
        </CardContent>
      </Card>
    </div>
  );
}
