const User = require("../models/user.model");

const usersSocket = require("../sockets/users.socket");

// [GET] /users/not-friend
module.exports.notFriend = async (req, res) => {
  // SocketIO
  usersSocket(res);
  // End SocketIO

  const userId = res.locals.user.id;

  const myUser = await User.findOne({
    _id: userId,
  });

  const requestFriends = myUser.requestFriends;
  const acceptFriends = myUser.acceptFriends;

  const users = await User.find({
    $and: [
      { _id: { $ne: userId } },
      { _id: { $nin: requestFriends } },
      { _id: { $nin: acceptFriends } },
    ],
    status: "active",
    deleted: false,
  }).select("id avatar fullName");

  res.render("pages/users/not-friend", {
    pageTitle: "Danh sách người dùng",
    users: users,
  });
};

// [GET] /users/request
module.exports.request = async (req, res) => {
  // Socket
  usersSocket(res);
  // End Socket

  const userId = res.locals.user.id;

  const myUser = await User.findOne({
    _id: userId,
  });

  const requestFriends = myUser.requestFriends;

  const users = await User.find({
    _id: { $in: requestFriends },
    status: "active",
    deleted: false,
  }).select("id avatar fullName");

  res.render("pages/users/request", {
    pageTitle: "Lời mời đã gửi",
    users: users,
  });
};
