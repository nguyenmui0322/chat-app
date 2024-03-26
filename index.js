const express = require("express");

require("dotenv").config();

const route = require("./routes/index.route");

const app = express();
const port = process.env.PORT;

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

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
