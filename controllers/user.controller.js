const md5 = require("md5");
const User = require("../models/user.model");

// [GET] /user/register
module.exports.register = async (req, res) => {
  res.render("pages/user/register", {
    pageTitle: "Đăng kí tài khoản",
  });
};

// [POST] /user/register
module.exports.registerPost = async (req, res) => {
  const existEmail = await User.findOne({
    email: req.body.email,
  });

  if (existEmail) {
    res.redirect("back");
    return;
  }

  req.body.password = md5(req.body.password);

  const user = new User(req.body);
  await user.save();

  res.cookie("tokenUser", user.tokenUser);

  res.redirect("/");
};