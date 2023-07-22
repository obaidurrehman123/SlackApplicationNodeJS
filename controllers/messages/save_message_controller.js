const { User, Message } = require("./../../models");
const redisClient = require("./../../config/redis");

const saveMessageInDatabase = async (objects) => {
  try {
    const saveStatus = Message.bulkCreate(objects);
    return saveStatus ? saveStatus : false;
  } catch (error) {
    console.log("--------->Error saveMessageInDatabase");
  }
};

const sendMessage = async (req, res) => {
  try {
    const from = req.user.id;
    const { to, message } = req.body;
    // console.log("to:", to, "from:", from, "message:", message);
    if (to == undefined || message == undefined)
      return res
        .status(401)
        .send({ message: "Required to userid and message" });
    const toUser = await User.findByPk(to);
    const fromUser = await User.findByPk(from);
    if (!toUser) return res.status(401).send({ message: "To user not exist" });
    if (!fromUser)
      return res.status(401).send({ message: "from user not exist" });

    const s_value = {
      to: to,
      from: from,
      messages: message,
    };
    const data = await storeRedis(s_value);
    data
      ? res.status(200).send("saved")
      : res.status(500).send("failed to save");
  } catch (error) {
    console.log("Error in sendMessage:", error);
    res.status(401).send({ message: "Error sending message", error: error });
    throw error;
  }
};

async function storeRedis(s_value) {
  const existingValue = await redisClient.get(process.env.REDIS_KEY);
  const mergedValue = existingValue
    ? existingValue + JSON.stringify(s_value)
    : JSON.stringify(s_value);
  const status = await redisClient.set(process.env.REDIS_KEY, mergedValue);

  return status ? CheckRedisLength() : false;
}
async function CheckRedisLength() {
  const get = await redisClient.get(process.env.REDIS_KEY);
  const objectStrings = get.split("{");
  if (objectStrings.length >= 10)
    return await destructureRedisData(objectStrings);
  else return true;
}

async function destructureRedisData(objectStrings) {
  const objects = await objectStrings
    .slice(1, objectStrings.length)
    .map((objectString) => {
      console.log("--->||", objectString);
      if (objectString != null) return JSON.parse("{" + objectString);
    });

  const isSave = await saveMessageInDatabase(objects);
  if (isSave) {
    await redisClient.del(process.env.REDIS_KEY);
    return "message save in database";
  } else return "not saved";
}

module.exports = { sendMessage };
