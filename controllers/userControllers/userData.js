const { User } = require('../../models');

async function userData(req, res) {
    console.log(req.params.id)
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ message: 'Id is required.' });
    }
    const user = await findUserById(id);

    res.status(201).json({ user });
}

const findUserById = async (id) => {
    try {
        const user = await User.findOne({
            where: {
                id: id
            }
        });

        if (!user) {
            return false;
        }

        return user;
    } catch (error) {
        console.error('Error finding user by email:', error);
        throw error; // or return an appropriate response
    }
};

module.exports = userData;