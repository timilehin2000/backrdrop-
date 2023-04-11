const { v4: uuidv4 } = require("uuid");
const { hashPassword } = require("../helpers/utils/utils");
const { db } = require("../models");

const User = db.users;

console.log(User);
const findUserByEmail = async (email) => {
    return await User.findOne({ where: { email } });
};

const findUserById = async (userId) => {
    return await User.findOne({ where: { id: userId } });
};

const createNewUser = async (email, name, password) => {
    return await User.create({
        id: uuidv4(),
        name,
        email,
        password,
    });
};

const updateUser = async (email, updateData) => {
    return await User.update(updateData, { where: { email } });
};

const findUserByAccountNumber = async (accountNumber) => {
    return await User.findOne({ where: { accountNumber } });
};
module.exports = {
    findUserByEmail,
    findUserById,
    createNewUser,
    updateUser,
    findUserByAccountNumber,
};
