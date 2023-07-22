const generateOTP = require("../../services/OTP");
const sendMail = require("../../services/MAIL")
const generateToken = require("../../utils/generateToken")
const { User } = require('../../models')


async function registerUser(req, res) {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: 'Email is required.' });
    }

    // find existing user from db
    const isExisting = await findUserByEmail(email);
    if (isExisting) {
        return res.send('Already existing');
    }
    // create new user
    const newUser = await createUser(email);
    if (!newUser) {
        return res.status(400).send({
            message: 'Unable to create new user',
        });
    }
    res.status(201).json({
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
        token: generateToken(newUser.id),
    });
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
// function call is in newUser function

const createUser = async (email) => {
    const otpGenerated = generateOTP();

    const now = new Date();
    const expiration_time = addMinutesToDate(now, 3);
    const newUser = await User.create({
        email: email,
        otp: otpGenerated,
        otp_expires: expiration_time
    });
    if (!newUser) {
        return [false, 'Unable to sign you up'];
    }
    const sentEmail = await sendMail({ to: email, OTP: otpGenerated });
    if (sentEmail) { console.log("email has been sent") }
    return newUser;
};
// To add minutes to the current time
function addMinutesToDate(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
}


module.exports = registerUser;

