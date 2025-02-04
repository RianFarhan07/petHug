const { Pet } = require("../models");
class PetController {
  static async getAllPet(req, res) {
    try {
      // console.log(req.session.user);

      const pets = await Pet.findAll({
        where: {
          UserId: req.session.user.userId,
        },
      });
      console.log(pets);

      res.render("shelter-home", { pets, user: req.session.user });
    } catch (error) {
      console.log(error);

      res.send(error);
    }
  }
}

module.exports = PetController;
