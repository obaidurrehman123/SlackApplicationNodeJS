const { Workspace, User, workspace_user } = require("./../../models");
const {
  isExistWorkSpace,
  saveWorkSpaceName,
  checkUserHavWorkspace,
} = require("./workspaceDatabaseCrud");

const findUserNameByName = async (email) => {
  try {
    const isExist = User.findByEmail({ email });
  } catch (error) {
    console.log("----------->findUserNameByName", error);
    throw error;
  }
};

//It save Workspace according to id who has access
const saveWorkSpaceOfUser = async (req, res) => {
  try {

    const u_id = req.user.id; // get required data
    const w_name = req.body.w_name;
    if (w_name == null) res.status(400).send({ message: "field required" });
    else {
      const haveWorkspace = await checkUserHavWorkspace(u_id, w_name); // check if user have already workspace with its name or not
      if (haveWorkspace) {
        res.status(203).send("Already exists");
      } else {
        const saveWorkSpace = await saveWorkSpaceName(w_name); // save workspace in workspace table
        if (saveWorkSpace == false) {
          res.status(500).send("Cannot save data in workspace");
        } else {
          const user = await User.findByPk(u_id);
          const status = await workspace_user.create({
            w_id: saveWorkSpace.dataValues.id,
            u_id: user.dataValues.id,
          }); //
          status == null
            ? res.status(500).send("cannot save workspace in workspace_user")
            : res.status(200).send(status);
        }

      }
    }
  } catch (error) {
    console.log("---------------------->saveWorkSpaceOfUSer", error);
    throw error;
  }
};

module.exports = { saveWorkSpaceOfUser };
