const { Workspace, User, workspace_user } = require("./../../models");

const addMembersInWorkspace = async (req, res) => {
  try {
    const w_id = req.body.w_id;
    const u_email = req.body.u_email;
    if (!w_id || !u_email)
      return res
        .status(400)
        .send({ message: "required workspace id and user ids" });

    const isWorkspaceExist = await workspace_user.findOne({
      where: { w_id: w_id },
    });
    if (isWorkspaceExist == null)
      return res.status(400).send({ message: "Invalid Workspace" });

    const isUserExist = await User.findOne({
      where: { email: u_email },
    });
    if (isUserExist == null)
      return res.status(400).send({ message: "Invalid User" });

    const isUserAdded = await workspace_user.findOne({
      where: { w_id: isWorkspaceExist.w_id, u_id: isUserExist.id },
    });
    if (isUserAdded != null)
      return res.status(400).send({ message: "already add" });
    // console.log(isWorkspaceExist.id, isUserExist.id);
    const status = await workspace_user.create({
      u_id: isUserExist.id,
      w_id: isWorkspaceExist.w_id,
    });
    status == null
      ? res.status(400).send({ message: "Invalid to save user" })
      : res.status(200).send({ message: "added", data: status });
  } catch (error) {
    console.error("Error saving data:", error);
    res.sendStatus(500);
  }
};

module.exports = { addMembersInWorkspace };
