const User = require('../User');
const bcrypt = require('bcrypt');

const authenticateUser = async (email, password) => {
    try {
        const initial_user = await User.findOne({ email: email });
        if (!initial_user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, initial_user.password);
        if (!isMatch) {
            return initial_user;
        }
        throw new Error('Invalid credentials');
    } catch (error) {
        throw new Error(error.message);
    }
};
module.exports = authenticateUser;