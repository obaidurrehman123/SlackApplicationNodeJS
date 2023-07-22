const { Message } = require("../../models");

const deleteMessage = async (req, res) => {
  const { id } = req.user;
  const { m_id } = req.params;
  

  try {
    // Find existing message from the database
    const isExisting = await Message.findByPk(m_id);

    if (!isExisting) {
      return res.status(400).send("Message does not exist.");
    }

    if (isExisting.from !== id) {
      return res.status(403).send("You are not authorized.");
    }

    const destroy = await Message.destroy({
      where: { id: isExisting.id },
      returning: true, // Include the updated message object in the result
    });

    // if (updatedRows.length === 0) {
    //   return res
    //     .status(500)
    //     .json({ success: false, message: "Update not successful." });
    // }

    // const updatedMessage = updatedRows[0]; // Retrieve the updated message object

    !destroy
      ? res.status(401).send("cannot delete due to technical issue")
      : res.status(200).json({
          destroy,
        });
  } catch (error) {
    console.error("Error updating message:", error);
    return res
      .status(500)
      .json({ success: false, message: "An error occurred." });
  }
};

const findUserByEmail = async (m_id) => {
  try {
    const message = await Message.findOne({
      where: {
        id: m_id,
      },
    });
    return !message ? false : message;
  } catch (error) {
    console.error("Error finding message by ID:", error);
    throw error; // or return an appropriate response
  }
};

module.exports = { deleteMessage };
