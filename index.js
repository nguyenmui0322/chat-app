const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

require("dotenv").config();

const route = require("./routes/index.route");

const app = express();
const port = process.env.PORT;

// SocketIO
const server = http.createServer(app);
const io = new Server(server);
global._io = io;
// End SocketIO

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

app.use(express.static(`${__dirname}/public`));

// route
route(app);

app.get("*", (req, res) => {
  res.render("pages/errors/404", {
    pageTitle: "404 Not Found",
  });
});

server.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
