import { randomUUID } from "crypto";
import { storage } from "./file-storage";
import { confirmationPage } from "./templates";

export const handleUpload = async (req: Request, url: URL) => {
  const formData = await req.formData();
  const fileEntry = formData.get("file");

  if (!fileEntry || !(fileEntry instanceof File)) {
    return new Response("No file provided", { status: 400 });
  }

  const id = randomUUID();
  await storage.set(id, fileEntry);

  const shareUrl = `${url.origin}/f/${id}`;
  return new Response(confirmationPage(id, shareUrl), {
    headers: { "Content-Type": "text/html" },
  });
};
