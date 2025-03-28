import { readFile, unlink } from "fs/promises";
import { join } from "path";

interface FileMetadata {
  originalName: string;
  contentType: string;
  size: number;
  uploadedAt: string;
}

export const handleDownload = async (id: string) => {
  const uploadDir = join(process.cwd(), "uploads");
  const filePath = join(uploadDir, id);
  const metaPath = join(uploadDir, `${id}.meta.json`);

  try {
    // Read both the file and its metadata
    const [file, metaJson] = await Promise.all([
      readFile(filePath),
      readFile(metaPath, "utf-8"),
    ]);

    const meta: FileMetadata = JSON.parse(metaJson);

    // Clean up both files
    await Promise.all([unlink(filePath), unlink(metaPath)]);

    return new Response(file, {
      headers: {
        "Content-Type": meta.contentType || "application/octet-stream",
        "Content-Disposition": `attachment; filename="${encodeURIComponent(
          meta.originalName,
        )}"`,
      },
    });
  } catch {
    return new Response("File not found or has expired", { status: 404 });
  }
};
