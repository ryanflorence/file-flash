import { homePage } from "./templates";

export const handleHome = () => {
  return new Response(homePage, {
    headers: { "Content-Type": "text/html" },
  });
};
