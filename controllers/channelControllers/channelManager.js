const { Channel, Workspace, User } = require("../../models");

// create channel controller

const createChannel = async (req, res) => {
  try {
    const { name, workspaceid } = req.body;
    //console.log(req.user.id);
    if (!name) {
      return res
        .status(400)
        .send({ success: false, message: "Name cannot be null." });
    }
    if (!workspaceid) {
      return res
        .status(400)
        .send({ success: false, message: "Workspace ID cannot be null." });
    }
    const workspace = await Workspace.findOne({ where: { id: workspaceid } });
    if (!workspace) {
      return res
        .status(404)
        .json({ success: false, message: "workspace not found" });
    }
    const channel = await Channel.create({
      channel_name: name,
      workspace_id: workspaceid,
    });
    return res.status(201).send({
      success: true,
      message: "Channel created successfully.",
      channel,
    });
  } catch (error) {
    console.error("Error creating channel:", error);
    return res
      .status(500)
      .send({ success: false, error: "Internal server error." });
  }
};

// getting the channel name and it's workspace name

const getWorkSpaceChannel = async (req, res) => {
  try {
    const workspaceId = req.params.id;
    console.log(workspaceId);
    const workspace = await Workspace.findOne({
      where: { id: workspaceId },
      include: {
        model: Channel,
        attributes: ["channel_name"],
      },
      attributes: ["name"],
    });
    return res.status(200).send({ success: true, workspace });
  } catch (error) {
    console.error("Error retrieving channels in workspace:", error);
    return res
      .status(500)
      .send({ success: false, error: "Internal server error." });
  }
};

// adding members in to channel

const registerUserInChannel = async (req, res) => {
  try {
    const { channelId, userID } = req.body;
    const user = await User.findByPk(userID);
    const channel = await Channel.findByPk(channelId);

    if (!user || !channel) {
      return res.status(404).json({ message: "User or channel not found" });
    }
    const isUserRegistered = await channel.hasUser(user);
    if (isUserRegistered) {
      return res
        .status(400)
        .json({ message: "User already registered in the channel" });
    }
    await channel.addUser(user);
    return res
      .status(200)
      .json({ message: "User registered in channel successfully" });
  } catch (error) {
    console.error("Error adding user to channel:", error);
    return res
      .status(500)
      .send({ success: false, error: "Internal server error." });
  }
};

// remove user from channel

const removeUserFromChannel = async (req, res) => {
  try {
    const { userID, channelId } = req.body;
    //console.log(userId, channelId);
    const user = await User.findByPk(userID);
    const channel = await Channel.findByPk(channelId);
    //console.log(user);
    if (!user || !channel) {
      return res.status(404).json({ message: "User or channel not found" });
    }
    await channel.removeUser(user);
    return res
      .status(200)
      .json({ message: "User removed from channel successfully" });
  } catch (error) {
    console.error("Error removing in channel:", error);
    return res
      .status(500)
      .send({ success: false, error: "Internal server error." });
  }
};

module.exports = {
  createChannel,
  getWorkSpaceChannel,
  registerUserInChannel,
  removeUserFromChannel,
};
