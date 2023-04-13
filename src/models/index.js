const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");

const dotenv = require("dotenv");

dotenv.config();

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require("../config/db.config")[env];

const db = {};

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);

fs.readdirSync(__dirname)
    .filter(
        (file) =>
            file.indexOf(".") !== 0 &&
            file !== basename &&
            file.slice(-3) === ".js"
    )
    .forEach((file) => {
        const model = require(path.join(__dirname, file))(
            sequelize,
            Sequelize.DataTypes
        );
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

// const establishConnection = async () => {
//     try {
//         await sequelize.authenticate();

//         console.log("Database is connected.");
//     } catch (err) {
//         console.error("Unable to connect to the database:", err);
//     }
// };

// console.log(establishConnection);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
