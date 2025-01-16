const express = require("express");
const opn = require("opn");
const app = express();

const port = 8085;

// let history = require("connect-history-api-fallback");

// //重定向到index.html
// history({
//   rewrites: [
//     {
//       from: /^\/libs\/.*$/,
//       to: "/index.html",
//     },
//   ],
// });

// app.use(history());

app.use(express.static("./dist"));

app.listen(port, () => {
  console.log("Listening at http://localhost:" + port);
  opn(`http://localhost:${port}`);
});
