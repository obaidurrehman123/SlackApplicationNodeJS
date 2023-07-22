const express = require("express");
const router = express.Router();
const {
  createWorkspace,
  editWorkspace,
} = require("../controllers/workspace/workspace");

const { saveWorkSpaceOfUser } = require("../controllers/workspace/workspace_user");
const { addMembersInWorkspace } = require("../controllers/workspace/addMember");
const { getAllMemberAgainstWorkspace } = require("../controllers/workspace/getAllMember");
const { getAllWorkspaceAgainstMember } = require("../controllers/workspace/getWorkspace");
const { protect } = require('./../middlewares/authMiddleware')


// @desc        create workspace
// route        http://localhost:6090/api/workspace/create
// required

//      body        w_name,
//      header      token
// method       post
router.route("/create").post(protect, saveWorkSpaceOfUser);

// router.route("/create").post(createWorkspace);

// @desc        edit workspace
// route        http://localhost:6090/api/workspace/edit
// required
//      body        name,workspaceId
// method       post
router.route("/edit").post(protect, editWorkspace);


// @desc        edit workspace
// route        http://localhost:6090/api/workspace/addMember
// required
//      body        u_email,w_id
// method       post
router.route("/addMember").post(protect, addMembersInWorkspace);

// @desc        edit workspace
// route        http://localhost:6090/api/workspace/getUsers:w_id
// required
//      params        w_id
// method       get
router.route("/getUsers/:w_id").get(protect, getAllMemberAgainstWorkspace);

// @desc        get workspaces
// route        http://localhost:6090/api/workspace/getWorkspace
// required
//      token required
// method       get
router.route("/getworkspace").get(protect, getAllWorkspaceAgainstMember);


module.exports = router;
