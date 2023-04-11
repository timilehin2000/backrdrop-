const jwt = require("jsonwebtoken");
const { findUserByEmail } = require("../../services/user.services");

const getUser = async (token) => {
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            if (!decoded) {
                throw new Error("Invalid authentication was provided");
            }

            const user = await findUserByEmail(decoded.email);

            if (!user) {
                throw new Error(
                    "No account associated with this data found. Please sign up"
                );
            }

            return user;
        } catch (err) {
            throw new Error(
                "Invalid authentication was provided. Please login"
            );
        }
    } else {
        return new Error("Access denied. No authentication token was provided");
    }
};

module.exports = { getUser };
