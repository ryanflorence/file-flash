import "urlpattern-polyfill";
import { handler } from "./handlers";
import { cleanupOldFiles } from "./handlers/cleanup";

// Run cleanup every hour
setInterval(cleanupOldFiles, 60 * 60 * 1000);

// Start server
Bun.serve({
  port: 3000,
  fetch: handler,
});

console.log("Server running at http://localhost:3000");
