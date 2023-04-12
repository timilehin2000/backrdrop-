"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("users", {
            id: {
                type: Sequelize.UUID,
                primaryKey: true,
                allowNull: false,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            account_number: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            account_name: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            is_verified: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("user");
    },
};
