//EXPRESS SHORT
const express = require("express");
const { join } = require("path");
const app = express();

app.use(express.static(__dirname))

app.get("/:page", (req, res, next) => {
    res.sendFile(join(__dirname, `${req.params.page}.html`), (err) => {
      if (err) next();
    });
  });

app.get("/", (req, res) => {
    res.sendFile(join(__dirname, `index.html`));
  });

app.use((req, res) => {
  res.status(404).sendFile(join(__dirname, `404.html`));
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

//EXPRESS: MANUALEST VERSION
// const express = require("express");
// const fs = require("fs");
// const { join } = require("path");
// const app = express();

// app.get("/", (req, res) => {
//   fs.readFile(join(__dirname, "index.html"), "utf8", (err, data) => {
//     if (err) {
//       throw err;
//     }
//     res.end(data);
//   });
// });

// app.get("/about", (req, res) => {
//   fs.readFile(join(__dirname, "about.html"), "utf8", (err, data) => {
//     if (err) {
//       throw err;
//     }
//     res.end(data);
//   });
// });

// app.get("/contact-me", (req, res) => {
//   fs.readFile(join(__dirname, "contact-me.html"), "utf8", (err, data) => {
//     if (err) {
//       throw err;
//     }
//     res.end(data);
//   });
// });

// app.use((req, res) => {
//   if (res.status(404)) {
//     fs.readFile(join(__dirname, "404.html"), "utf8", (err, data) => {
//       if (err) {
//         throw err;
//       }
//       res.end(data);
//     });
//   }
// });

// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Listening at port ${PORT}`);
// });
