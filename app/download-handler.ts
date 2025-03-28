import { storage } from "./file-storage";

export const handleDownload = async (id: string) => {
  const file = await storage.get(id);

  if (!file) {
    return new Response("File not found or has expired", { status: 404 });
  }

  const fileStream = file.stream();

  const cleanupStream = new TransformStream({
    async flush() {
      await storage.remove(id);
    },
  });

  const finalStream = fileStream.pipeThrough(cleanupStream);

  return new Response(finalStream, {
    headers: {
      "Content-Type": file.type,
      "Content-Disposition": `attachment; filename="${encodeURIComponent(
        file.name,
      )}"`,
    },
  });
};
