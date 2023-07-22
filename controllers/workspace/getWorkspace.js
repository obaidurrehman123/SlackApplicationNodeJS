const { sequelize } = require("./../../models");

const getAllWorkspaceAgainstMember = async (req, res) => {
  try {
    const { id } = req.user;
    if (!id) return res.status(400).send({ message: "required user id" });
    const isWorkspaceExists = await sequelize.query(
      `Select w_u.w_id,w.name
        from workspace_users as w_u
        inner join workspaces as w
        on w_u.w_id = w.id
        where w_u.u_id=:id`,
      {
        replacements: { id },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    if (!isWorkspaceExists)
      return res.status(401).send({ message: "No workspaces exist" });

    console.log("--------->", isWorkspaceExists);
    res.status(200).send(isWorkspaceExists);
  } catch (error) {
    console.error("Error retrieving workspace:", error);
    res.sendStatus(500);
  }
};

module.exports = { getAllWorkspaceAgainstMember };
