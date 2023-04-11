"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.removeColumn("users", "createdAt");
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.addColumn("users", "createdAt", {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        });
    },
};
