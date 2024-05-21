const Chat = require("../models/chat.model");
const RoomChat = require("../models/rooms-chat.model");

const uploadToCloudinary = require("../helpers/uploadToCloudinary");

module.exports = (req, res) => {
  const userId = res.locals.user.id;
  const fullName = res.locals.user.fullName;

  const roomChatId = req.params.roomChatId;

  _io.once("connection", (socket) => {
    socket.join(roomChatId);

    socket.on("CLIENT_SEND_MESSAGE", async (data) => {
      let images = [];

      for (const imageBuffer of data.images) {
        const link = await uploadToCloudinary(imageBuffer);
        images.push(link);
      }

      // Lưu vào database
      const chat = new Chat({
        user_id: userId,
        room_chat_id: roomChatId,
        content: data.content,
        images: images,
      });
      await chat.save();

      // Trả data về client
      _io.to(roomChatId).emit("SERVER_RETURN_MESSAGE", {
        userId: userId,
        fullName: fullName,
        content: data.content,
        images: images,
      });

      // Gửi thông báo về client
      const roomChat = await RoomChat.findOne({ _id: roomChatId });
      const listUserId = roomChat.users
        .map((user) => user.user_id)
        .filter((id) => id !== userId);

      socket.broadcast.emit("SERVER_RETURN_ALERT", {
        roomChatId: roomChatId,
        listUserId: listUserId,
        fullName: fullName,
      });
    });

    // Typing
    socket.on("CLIENT_SEND_TYPING", async (type) => {
      socket.broadcast.to(roomChatId).emit("SERVER_RETURN_TYPING", {
        userId: userId,
        fullName: fullName,
        type: type,
      });
    });
    // End Typing
  });
};
