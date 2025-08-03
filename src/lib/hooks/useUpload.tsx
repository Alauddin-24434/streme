export async function uploadMediaFile(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Upload failed");
  }

  const data = await res.json();
  return data.url;
}
export async function deleteMediaFile(url: string): Promise<void> {

  await fetch("/api/delete-media", {
    method: "POST",
    body: JSON.stringify({ url }),
    headers: { "Content-Type": "application/json" },
  });
}
