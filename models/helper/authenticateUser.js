const User = require('../User');
const bcrypt = require('bcrypt');

const authenticateUser = async (email, password) => {

    const user = await User.findOne({ email });

    if (!user) {
        console.log("User not found");
        return null;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return null;
    }

    return user
 };

module.exports = authenticateUser;