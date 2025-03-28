import { readdir, unlink } from "fs/promises";
import { join } from "path";

export const cleanupOldFiles = async () => {
  const uploadDir = join(process.cwd(), "uploads");
  try {
    const files = await readdir(uploadDir);
    const now = Date.now();

    for (const file of files) {
      const filePath = join(uploadDir, file);
      const stats = await Bun.file(filePath).stat();
      const age = now - stats.mtimeMs;

      if (age > 24 * 60 * 60 * 1000) {
        // 24 hours
        await unlink(filePath);
      }
    }
  } catch (error) {
    console.error("Cleanup error:", error);
  }
};
