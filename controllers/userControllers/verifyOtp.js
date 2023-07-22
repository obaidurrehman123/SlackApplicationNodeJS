const { User } = require("../../models");
const validator = require("validator");
const generateToken = require("../../utils/generateToken");
const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .send({ success: false, message: "email is not valid" });
    }
    if (!otp) {
      return res
        .status(400)
        .send({ success: false, message: "otp cannot be null" });
    }
    const user = await User.findOne({ where: { email: email } });
    console.log("user", user.dataValues.email);
    if (!user) {
      return res
        .status(400)
        .send({ success: false, message: "user is invalid" });
    }
    let currentTime = new Date();
    //console.log(user.otp);
    //console.log(user.otp_expires);
    if (user && user.otp === otp && currentTime < user.otp_expires) {
      return res.status(200).json({
        id: user.id,
        email: user.email,
        role: user.role,
        token: generateToken(),
      });
    } else {
      return res
        .status(404)
        .send({ success: false, message: "otp is expired or incorrect" });
    }
  } catch (error) {
    res.status(404).send({ success: false, err: error });
  }
};

module.exports = { verifyOtp };
