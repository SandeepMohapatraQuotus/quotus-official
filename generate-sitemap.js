import { SitemapStream, streamToPromise } from "sitemap";
import { createWriteStream } from "fs";
import { pipeline } from "stream";
import { promisify } from "util";

const hostname = "https://quotus.co.in/";

const routes = [
  "/",
  "/about",
  "/services/ui-ux-design",
  "/services/web-development",
  "/services/mobile-app-development",
  "/services/blockchain-development",
  "/services/ai-solutions",
  "/gallery",
  "/product/naturopura",
  "/product/arthaProAi",
  "/product/feedora",
  "/product/swiftrooms",
  "/contact",
];

const streamPipeline = promisify(pipeline);

(async () => {
  const sitemapStream = new SitemapStream({ hostname });
  const writeStream = createWriteStream("./public/sitemap.xml");

  routes.forEach((url) =>
    sitemapStream.write({ url, changefreq: "weekly", priority: 0.7,lastmod: new Date().toISOString() })
  );
  sitemapStream.end();

  await streamPipeline(sitemapStream, writeStream);

  console.log("✅ Sitemap generated at public/sitemap.xml");
})();
