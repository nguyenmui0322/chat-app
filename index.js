const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const { Server } = require("socket.io");

require("dotenv").config();

const database = require("./config/database");
const route = require("./routes/index.route");

database.connect();

const app = express();
const port = process.env.PORT;

// SocketIO
const server = http.createServer(app);
const io = new Server(server);
global._io = io;
// End SocketIO

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

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
