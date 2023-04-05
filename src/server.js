const express = require("express");
const cors = require("cors");
const establishDbConnection = require("./model");
const { handleRouting } = require("./routing");
const dotenv = require("dotenv").config();

const startApplication = async (app) => {
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(cors());

    // await establishDbConnection();

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on ${PORT}`);
    });

    handleRouting(app);
};

module.exports = { startApplication };
