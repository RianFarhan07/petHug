const { default: Swal } = require("sweetalert2");
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

      res.render("shelters/shelter-home", { pets, user: req.session.user });
    } catch (error) {
      console.log(error);

      res.send(error);
    }
  }
  static async addPetForm(req, res) {
    const { errors } = req.query;
    try {
      const types = await Type.findAll();
      res.render("shelters/add-pet.ejs", {
        user: req.session.user,
        types,
        errors,
      });
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
        // Swal.fire({
        //   icon: "error",
        //   title: "Validation Error",
        //   text: errors.join(";"),
        //   confirmButtonColor: "#3498db",
        // });
        res.redirect(`/shelter/addPet?errors=` + errors.join(";"));
      } else {
        console.log(error);
        res.send(error);
      }
    }
  }
  static async editPetForm(req, res) {
    try {
      const { errors } = req.query;
      const { petId } = req.params;
      const pet = await Pet.findByPk(petId);
      const types = await Type.findAll();
      const genderOption = Pet.gender();
      const healthStatusOption = Pet.healthStatus();
      console.log(pet);

      res.render("shelters/edit-pet.ejs", {
        pet,
        types,
        user: req.session.user,
        genderOption,
        healthStatusOption,
        errors,
      });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async editPet(req, res) {
    try {
      const { petId } = req.params;
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

      await Pet.update(
        {
          name,
          TypeId,
          breed,
          age,
          price,
          gender,
          description,
          healthStatus,
          image,
        },
        {
          where: {
            id: petId,
          },
        },
        res.redirect("/shelter")
      );
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

  static async deletePet(req, res) {
    try {
      const { petId } = req.params;
      await Pet.destroy({
        where: {
          id: petId,
        },
      });
      res.redirect("/shelter");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
}

module.exports = ShelterController;
