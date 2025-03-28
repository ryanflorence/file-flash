import { LocalFileStorage } from "@mjackson/file-storage/local";
import { join } from "node:path";

const uploadDir = join(process.cwd(), "uploads");
const storage = new LocalFileStorage(uploadDir);

export { storage };
