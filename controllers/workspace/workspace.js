// const workspace = require('../../models/workspace');

const { Workspace } = require("./../../models");

//It create workspace in databases
const createWorkspace = async (name) => {
  try {
    // const { name } = req.body;
    const isExist = await isExistWorkSpace(name);
    console.log("--------------------->", isExist);
    if (isExist == true) {
      return false
    } else {
      const status = await saveWorkSpaceName(name);
      if (status)
        return status
      else return false;
    }
  } catch (error) {
    console.error("Error to save workspace in db", error);
    throw error; // or return an appropriate response
  }
};

//Helper function that help to save data in database
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

//----------------------------------------------

//Edit in workspace Table/////////////////////////////////

const editWorkspace = async (req, res) => {
  try {
    const { name, workspaceId } = req.body;
    if (name == null || workspaceId == null) {
      res.status(501).json("Name or workspaceId required");
    } else {
      const status = await updateNameInDatabase(workspaceId, name);
      if (status) res.status(200).json("Work space update");
      else res.status(500).json("Work space not updated");
    }
  } catch (error) {
    console.error("Error updating workspace name:");
    throw error; // or return an appropriate response
  }
};

//update Workspace name in Database
const updateNameInDatabase = async (id, newName) => {
  try {
    const result = await Workspace.update(
      { name: newName },
      { where: { id: id } }
    );
    console.log(result);
    return result[0] == 0 ? false : true;
  } catch (error) {
    console.error(`Error updating workspace name in database: ${error}`);
    throw error; // or return an appropriate response
  }
};

//---------------------------------------------

module.exports = { createWorkspace, editWorkspace };
