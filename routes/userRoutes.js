const express = require("express");
const router = express.Router();
const registerUser = require("../controllers/userControllers/registerUser");
const { verifyOtp } = require("../controllers/userControllers/verifyOtp");
const loginUser = require("../controllers/userControllers/loginUser");
const userPic = require("../controllers/userControllers/userPic");
const userData = require("../controllers/userControllers/userData");
const upload = require("../utils/multerFileStorage");

// @desc        create user 
// route        http://localhost:6090/api/user/register
// method       post

router.route("/register").post(registerUser);

// @desc        get single user 
// route        http://localhost:6090/api/user/id
// method       post

router.route("/:id").get(userData);

// @desc        verify user
// route        http://localhost:6090/api/user/verifyotp
// method       post

router.route("/verifyotp").post(verifyOtp);

// @desc        login user 
// route        http://localhost:6090/api/user/login
// method       post
router.route("/login").post(loginUser);
// @desc        user pic 
// route        http://localhost:6090/api/user/pic
// method       post
// remember     to set image name in form field as profileImage
//  Don't forget the enctype="multipart/form-data" in your form.

router.route("/pic").post(upload.single("profileImage"), userPic);
module.exports = router;

