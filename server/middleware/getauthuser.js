const jwt = require("jsonwebtoken");
const users = require("../models/userSchema");
const secretkey = process.env.KEY;

const getauthuser = async (req, res, next) => {
  try {
    const tokens = req.cookies.amazonclone;
    //console.log(tokens);
    const valuserid = jwt.verify(tokens, secretkey);
   // console.log(valuserid);
    const user = await users.findOne({ _id: valuserid._id });

    if (!user) {
      throw new Error("user not found");
      return
    }
    req.token = tokens;
    req.user = user;
    req.userid = user._id;
    next();
  } catch (error) {
    res.status(404).json(error);
  }
};

module.exports = getauthuser;
