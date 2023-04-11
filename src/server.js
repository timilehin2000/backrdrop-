const dotenv = require("dotenv").config();
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");
const { establishConnection } = require("./models");
const { typeDefs } = require("./gql/typeDefs");
const { resolvers } = require("./gql/resolvers");
const { getUser } = require("./helpers/middleware/auth");

const startApplication = async () => {
    try {
        const server = new ApolloServer({
            typeDefs,
            resolvers,
        });

        // await establishConnection();

        const { url } = await startStandaloneServer(server, {
            listen: { port: 3000 },
            context: async ({ req, res }) => {
                let token = req.headers.authorization;

                if (!token) {
                    return new Error(
                        "Access denied. No authentication token was provided"
                    );
                }

                token = req.headers.authorization.startsWith("Bearer")
                    ? req.headers.authorization.split("Bearer ")[1]
                    : req.headers.authorization;

                const user = await getUser(token);

                if (!user)
                    throw new GraphQLError("User is not authenticated", {
                        extensions: {
                            code: "UNAUTHENTICATED",
                            http: { status: 401 },
                        },
                    });

                return { user };
            },
        });

        console.log(`Server is running at ${url}`);
    } catch (err) {
        console.log("Error Occured", err);
    }
};

module.exports = { startApplication };
