import { filePage } from "./templates";
import { storage } from "./file-storage";

export const handleFile = async (id: string) => {
  if (!(await storage.has(id))) {
    return new Response("File not found or has expired", { status: 404 });
  }

  return new Response(filePage(id), {
    headers: { "Content-Type": "text/html" },
  });
};
