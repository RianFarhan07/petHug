const { Pet } = require("../models");
const { timeWaiting } = require("../helpers/timeWaiting");

class AdopterController {
  static async home(req, res) {
    try {
      const pets = await Pet.findLongest();
      res.render("adopter-home", { user: req.session.user, pets, timeWaiting });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
}

module.exports = AdopterController;
