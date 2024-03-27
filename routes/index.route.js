const homeRoutes = require("./home.route");
const chatRoutes = require("./chat.route");

module.exports = (app) => {
  app.use("/", homeRoutes);

  app.use("/chat", chatRoutes);
};
