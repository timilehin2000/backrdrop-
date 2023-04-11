const gql = require("graphql-tag");

const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        email: String!
        password: String!
        account_number: String
        account_name: String
        bank_name: String
        is_verified: Boolean
    }

    type UserToken {
        user: User!
        token: String!
    }

    type Query {
        fetchAccountName(bank_code: String, account_number: String): String!
    }

    type Mutation {
        registerUser(name: String, email: String, password: String): User
        login(email: String, password: String): UserToken
        addBankAccount(
            user_account_number: String
            user_bank_code: String
            user_account_name: String
        ): User
    }
`;

module.exports = { typeDefs };
