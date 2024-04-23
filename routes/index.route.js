const userMiddleware = require("../middlewares/user.middleware");
const authMiddleware = require("../middlewares/auth.middleware");

const homeRoutes = require("./home.route");
const chatRoutes = require("./chat.route");
const userRoutes = require("./user.route");
const usersRoutes = require("./users.route");
const roomsChatRoutes = require("./rooms-chat.route");

module.exports = (app) => {
  app.use(userMiddleware.infoUser);

  app.use("/", homeRoutes);

  app.use("/chat", authMiddleware.requireAuth, chatRoutes);

  app.use("/user", userRoutes);

  app.use("/users", authMiddleware.requireAuth, usersRoutes);

  app.use("/rooms-chat", authMiddleware.requireAuth, roomsChatRoutes);
};
