const { v4: uuidv4 } = require("uuid");
const dotenv = require("dotenv").config();
const { hashPassword } = require("../helpers/utils/util");
const db = require("../models");

const User = db.users;

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
    const result = await User.update(updateData, {
        where: { email },
        returning: true,
        plain: true,
    });

    return result[1];
};

const findUserByAccountNumber = async (accountNumber) => {
    return await User.findOne({ where: { account_number: accountNumber } });
};
module.exports = {
    findUserByEmail,
    findUserById,
    createNewUser,
    updateUser,
    findUserByAccountNumber,
    User,
};
