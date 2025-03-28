import { handleHome } from "./home";
import { handleUpload } from "./upload";
import { handleFile } from "./file";
import { handleDownload } from "./download";

// Define URL patterns
const patterns = {
  home: new URLPattern({ pathname: "/" }),
  upload: new URLPattern({ pathname: "/upload" }),
  file: new URLPattern({ pathname: "/f/:id" }),
  download: new URLPattern({ pathname: "/d/:id" }),
};

export async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);

  if (patterns.home.exec(url)) {
    return handleHome();
  }

  if (patterns.upload.exec(url) && req.method === "POST") {
    return handleUpload(req, url);
  }

  const fileMatch = patterns.file.exec(url);
  if (fileMatch?.pathname.groups.id) {
    return handleFile(fileMatch.pathname.groups.id);
  }

  const downloadMatch = patterns.download.exec(url);
  if (downloadMatch?.pathname.groups.id) {
    return handleDownload(downloadMatch.pathname.groups.id);
  }

  return new Response("Not Found", { status: 404 });
}
