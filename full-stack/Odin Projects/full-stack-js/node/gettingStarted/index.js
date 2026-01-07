const http = require("http");
const fs = require("fs");
const path = require("path");

//to avoid nested ifs
const routes = {
  "/": "index.html",
  "/about": "about.html",
  "/contact-me": "contact-me.html",
};

const server = http.createServer((req, res) => {
  //req.url -> the route after '/'
  //req.headers.host -> default host route
  //.pathname -> just returns what we need, in this case the route of the routes object
  const urlPath = new URL(req.url, `http://${req.headers.host}`).pathname;

  //if the urlPath is in the routes object then return the value for that, else return 404
  const fileName = routes[urlPath] || "404.html";
  //joins the current dir of the index.js and filename (returned route)
  const filePath = path.join(__dirname, fileName);

  //if something is returned then 200, otherwise 404
  const statusCode = routes[urlPath] ? 200 : 404;

  res.writeHead(statusCode, { "Content-Type": "text/html" });

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      res.end("Server error");
      return;
    }
    res.end(data);
  });
});

const port = 8080;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
