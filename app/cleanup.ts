import { storage } from "./file-storage";

export const cleanupOldFiles = async () => {
  try {
    const now = Date.now();

    const results = await storage.list();
    for (const item of results.files) {
      const file = await storage.get(item.key);
      if (!file) continue;

      const age = now - file.lastModified;
      if (age > 24 * 60 * 60 * 1000) {
        await storage.remove(item.key);
      }
    }
  } catch (error) {
    console.error("Cleanup error:", error);
  }
};

cleanupOldFiles();
