const bcrypt = require("bcryptjs");
const { distance } = require("fastest-levenshtein");
const {
    generateToken,
    hashPassword,
    resolveUserAccount,
    toTitleCase,
} = require("../helpers/utils/utils");
const {
    createNewUser,
    findUserByEmail,
    updateUser,
    findUserByAccountNumber,
} = require("../services/user.services");

const resolvers = {
    Query: {
        fetchAccountName: async (_, args, context) => {
            const { bank_code, account_number } = args;

            try {
                const user = await findUserByAccountNumber(account_number);
                if (user) {
                    return toTitleCase(user?.account_name);
                } else {
                    const { isError, data } = await resolveUserAccount(
                        account_number,
                        bank_code
                    );

                    if (isError) {
                        throw new Error(
                            "Something went wrong, Could not resolve account number. Please try again"
                        );
                    }

                    return toTitleCase(data.account_name);
                }
            } catch (err) {
                console.log("Error occured", err);
                throw err;
            }
        },
    },

    Mutation: {
        registerUser: async (_, args) => {
            const { email, name, password } = args;

            try {
                const existingUser = await findUserByEmail(email);

                if (existingUser) {
                    throw new Error("User already exists");
                }

                const hashedPassword = hashPassword(password);

                const newUser = await createNewUser(
                    email,
                    name,
                    hashedPassword
                );

                console.log(newUser);
                if (newUser) {
                    return newUser;
                } else {
                    throw new Error("An unknow error occured");
                }
            } catch (err) {
                console.log("Error occured", err);
                throw err;
            }
        },

        login: async (_, args) => {
            const { email, password } = args;
            try {
                const existingUser = await findUserByEmail(email);

                if (!existingUser) {
                    throw new Error("Invalid login details");
                }

                const isPasswordValid = await bcrypt.compare(
                    password,
                    existingUser.password
                );

                if (!isPasswordValid) {
                    throw new Error("Invalid login details");
                }

                const token = generateToken(email);

                return { user: existingUser, token };
            } catch (err) {
                console.log("Error occured", err);
                throw err;
            }
        },

        addBankAccount: async (_, args, context) => {
            const { user_account_number, user_bank_code, user_account_name } =
                args;

            if (!context.user) {
                throw new Error("User is not authenticated. Please log in");
            }

            try {
                const { isError, data } = await resolveUserAccount(
                    user_account_number,
                    user_bank_code
                );

                if (isError) {
                    throw new Error(
                        "Something went wrong, Could not resolve account number. Please try again"
                    );
                }

                const levenshteinDistance = distance(
                    data.account_name.toLowerCase(),
                    user_account_name.toLowerCase()
                );

                if (levenshteinDistance > 2) {
                    throw new Error(
                        "Could not add bank account. Please check your account name again"
                    );
                }

                const updateData = {
                    account_number: user_account_number,
                    account_name: user_account_name,
                    is_verified: true,
                };

                const verifyUser = await updateUser(
                    context.user.email,
                    updateData
                );

                return verifyUser;
            } catch (err) {
                console.log("Error occured", err);
                throw err;
            }
        },
    },
};

module.exports = { resolvers };
