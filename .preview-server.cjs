const http = require("http");
const fs = require("fs");
const path = require("path");
const root = process.cwd();
const port = 4174;
http.createServer((req, res) => {
  let reqPath = decodeURIComponent((req.url || "/").split("?")[0]);
  if (reqPath === "/") reqPath = "/index.html";
  const filePath = path.join(root, reqPath.replace(/^\//, ""));
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.statusCode = 404;
      res.end("Not found");
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    const types = {
      ".html": "text/html; charset=utf-8",
      ".css": "text/css",
      ".js": "application/javascript",
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".svg": "image/svg+xml",
      ".webp": "image/webp"
    };
    res.setHeader("Content-Type", types[ext] || "application/octet-stream");
    res.end(data);
  });
}).listen(port, "127.0.0.1", () => {
  console.log(`Preview running on http://127.0.0.1:${port}`);
});
