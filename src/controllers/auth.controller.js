const User = require("../models/User");

exports.signIn = async function (req, res, next) {
  //email이 db에 있는지 확인 -> find 쿼리
  //없으면 db에 추가
  //있으면 Token 발행
  try {
    const { email, avatarImgURL } = req.body;
    const foundUserByEmail = await User.findOne({ email });
    console.log(email, foundUserByEmail, avatarImgURL);
    if (!foundUserByEmail) {
      await User.create({ email, avatarImgURL });
      console.log("created!");
    } else {
      console.log("exist!");
    }

    res.json("signup");
  } catch (error) {
    next(error);
  }
};

exports.signOut = async function (req, res, next) {
  try {
    //write your code ..
  } catch (error) {
    next(error);
  }
};
