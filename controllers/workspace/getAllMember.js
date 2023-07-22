const { sequelize, workspace_user } = require("./../../models");

const getAllMemberAgainstWorkspace = async (req, res) => {
  try {
    const { w_id } = req.params;
    if (!w_id)
      return res.status(400).send({ message: "required workspace id" });
    if (w_id.toString().length != 36)
      return res.status(400).send({ message: "required valid id" });
    const isWorkspaceExists = workspace_user.findOne({
      where: { w_id: w_id },
    });
    if (!isWorkspaceExists)
      return res.status(401).send({ message: "required valid workspace id" });

    const users = await sequelize.query(
      `SELECT u.id , u.email, u.name , u.photo , u.role FROM users AS u INNER JOIN workspace_users AS w ON u.id = w.u_id WHERE w.w_id = :w_id`,
      {
        replacements: { w_id },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    console.log(users);
    res.send(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.sendStatus(500);
  }
};

module.exports = { getAllMemberAgainstWorkspace };
