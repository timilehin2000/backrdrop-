const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { fetchApi } = require("./fetchApi");

const generateToken = (email) => {
    return jwt.sign(
        {
            email,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d",
        }
    );
};

const hashPassword = (password) => {
    return bcrypt.hashSync(password, 10);
};

const resolveUserAccount = async (accountNumber, bankCode) => {
    const apiURL = `https://api.paystack.co/bank/resolve/?account_number=${accountNumber}&bank_code=${bankCode}`;

    let requestHeaders = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.TEST_SECRET}`,
    };

    const getResponse = async () => {
        const { isError, errorMessage, data } = await fetchApi(
            {},
            "GET",
            apiURL,
            requestHeaders
        );

        if (isError) {
            return { isError, errorMessage };
        } else {
            return { isError, data: data.data.data };
        }
    };

    const response = await getResponse();

    return response;
};

const toTitleCase = (str) => {
    return str.toLowerCase().replace(/(^\w|\s\w)/g, function (c) {
        return c.toUpperCase();
    });
};

module.exports = {
    generateToken,
    resolveUserAccount,
    hashPassword,
    toTitleCase,
};
