// [GET] /
module.exports.index = async (req, res) => {
  // SocketIO
  _io.on("connection", (socket) => {
    console.log("a user connected", socket.id);
  });
  // End SocketIO

  res.render("pages/chat/index", {
    pageTitle: "Chat",
  });
};
