//Helper function that help to save data in database

const {
  Workspace,
  sequelize,
  User,
  workspace_user,
} = require("./../../models");
const saveWorkSpaceName = async (name) => {
  const isSave = await Workspace.create({
    name: name,
  });
  return isSave == null ? false : isSave;
};

//this will check workspace is exist in database ornot
const isExistWorkSpace = async (name) => {
  try {
    const isFind = await Workspace.findOne({
      where: {
        name: name,
      },
    });
    console.log(`is find `, isFind);
    return isFind == null ? false : true;
  } catch (error) {
    console.error("Error finding workspace by name:", error);
    throw error; // or return an appropriate response
  }
};

const checkUserHavWorkspace = async (u_id, w_name) => {
  const isExist = await workspace_user.findAll({
    include: [
      {
        model: Workspace,
        required: true,
        where: { name: w_name },
      },
    ],
    where: { u_id: u_id },
  });
  //     await sequelize.query(`SELECT * FROM workspace_users AS wu  INNER JOIN workspaces AS w ON wu.w_id = w.id WHERE w.name = '${w_name}' and wu.u_id='${u_id}';
  // `);
  // console.log("exist");
  return isExist.length == 0 ? false : true;
};

module.exports = { saveWorkSpaceName, isExistWorkSpace, checkUserHavWorkspace };
