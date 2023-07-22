const { User } = require('../../models');

async function userPic(req, res) {
    const path = req.file.cloudinaryUrl;
    const { id, name } = req.body;
    if (!id && !name) {
        return res.status(400).json({ message: 'id and name is required.' });
    }

    // find existing user from db
    const isExisting = await findUserById(id);
    if (!isExisting) {
        return res.status(404).json({ message: 'User does not exist' });
    }
    const [_, [updatedUser]] = await User.update(
        {
            name,
            photo: path
        },
        {
            where: { id: isExisting.id },
            returning: true // Include the updated user object in the result
        }
    );

    if (!updatedUser) {
        return res.send("updation not successful");
    }

    console.log(`filename: ${req.file}`);

    res.status(201).json({
        id: updatedUser.id,
        email: updatedUser.email,
        URL: path
    });

}

// function call is in isExisting function
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

module.exports = userPic