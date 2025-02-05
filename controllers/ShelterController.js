const { Pet, Type } = require("../models");
class ShelterController {
  static async getAllPet(req, res) {
    try {
      // console.log(req.session.user);

      const pets = await Pet.findAll({
        include: {
          model: Type,
        },
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
  static async addPetForm(req, res) {
    const { errors } = req.query;
    try {
      const types = await Type.findAll();
      res.render("add-pet.ejs", { user: req.session.user, types, errors });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async addPet(req, res) {
    try {
      const {
        name,
        TypeId,
        breed,
        age,
        price,
        gender,
        description,
        healthStatus,
        image,
      } = req.body;
      await Pet.create({
        name,
        TypeId,
        breed,
        age,
        price,
        gender,
        description,
        healthStatus,
        image,
        UserId: req.session.user.userId,
      });
      res.redirect("/shelter");
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        const errors = error.errors.map((err) => err.message);
        res.redirect(`/shelter/addPet?errors=` + errors.join(";"));
      } else {
        console.log(error);
        res.send(error);
      }
    }
  }
}

module.exports = ShelterController;
