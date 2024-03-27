const userMiddleware = require("../middlewares/user.middleware");

const homeRoutes = require("./home.route");
const chatRoutes = require("./chat.route");
const userRoutes = require("./user.route");

module.exports = (app) => {
  app.use(userMiddleware.infoUser);

  app.use("/", homeRoutes);

  app.use("/chat", chatRoutes);

  app.use("/user", userRoutes);
};
