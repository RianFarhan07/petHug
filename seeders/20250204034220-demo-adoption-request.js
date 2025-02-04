"use strict";
const fs = require("fs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let data = fs.readFileSync("./data/adoptionrequests.json", "utf-8");
    data = JSON.parse(data);

    data = data.map((el) => {
      delete el.id;
      return {
        ...el,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    await queryInterface.bulkInsert("AdoptionRequests", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("AdoptionRequests", null, {});
  },
};
