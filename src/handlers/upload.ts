import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import { join } from "path";

export const handleUpload = async (req: Request, url: URL) => {
  const formData = await req.formData();
  const fileEntry = formData.get("file");

  if (!fileEntry || !(fileEntry instanceof File)) {
    return new Response("No file provided", { status: 400 });
  }

  const file = fileEntry;
  const id = randomUUID();
  const uploadDir = join(process.cwd(), "uploads");
  await mkdir(uploadDir, { recursive: true });

  // Store the file
  const filePath = join(uploadDir, id);
  await writeFile(filePath, Buffer.from(await file.arrayBuffer()));

  // Store metadata
  const metaData = {
    originalName: file.name,
    contentType: file.type,
    size: file.size,
    uploadedAt: new Date().toISOString(),
  };
  const metaPath = join(uploadDir, `${id}.meta.json`);
  await writeFile(metaPath, JSON.stringify(metaData, null, 2));

  return Response.redirect(`${url.origin}/f/${id}`);
};
