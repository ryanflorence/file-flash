import { readFile } from "fs/promises";
import { join } from "path";
import { filePage } from "./templates";

export const handleFile = async (id: string) => {
  const filePath = join(process.cwd(), "uploads", id);

  try {
    await readFile(filePath);
    return new Response(filePage(id), {
      headers: { "Content-Type": "text/html" },
    });
  } catch {
    return new Response("File not found or has expired", { status: 404 });
  }
};
