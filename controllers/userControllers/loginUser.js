const generateOTP = require("../../services/OTP");
const sendMail = require("../../services/MAIL");
const generateToken = require("../../utils/generateToken");
const { User } = require('../../models');

async function loginUser(req, res) {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: 'Email is required.' });
    }

    const updatedUser = await updateUser(email);

    res.status(201).json({
        id: updatedUser.id,
        email: updatedUser.email,
        role: updatedUser.role,
        token: generateToken(updatedUser.id),
    });
}

// update existing user
const updateUser = async (email) => {
    const otpGenerated = generateOTP();
    const now = new Date();
    const expiration_time = addMinutesToDate(now, 3);

    // find existing user from db
    const isExisting = await findUserByEmail(email);
    if (!isExisting) {
        return res.send("User does not exist");
    }
    const [_, updatedRows] = await User.update(
        {
            otp: otpGenerated,
            otp_expires: expiration_time
        },
        {
            where: { email: isExisting.email },
            returning: true // Include the updated user object in the result
        }
    );

    if (updatedRows.length === 0) {
        return [false, 'Update not successful'];
    }

    const updatedUser = updatedRows[0]; // Retrieve the updated user object

    const sentEmail = await sendMail({ to: email, OTP: otpGenerated });
    if (sentEmail) {
        console.log("Email has been sent");
    }

    return updatedUser;
};

// function call is in isExisting function
const findUserByEmail = async (email) => {
    try {
        const user = await User.findOne({
            where: {
                email: email
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

// To add minutes to the current time
function addMinutesToDate(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
}

module.exports = loginUser;
