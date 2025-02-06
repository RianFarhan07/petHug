const { default: Swal } = require("sweetalert2");
const { Pet, Type, AdoptionRequest, User, Profile } = require("../models");
const { Op } = require("sequelize");
const { timeWaiting } = require("../helpers/timeWaiting");
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

      res.render("shelters/shelter-home", {
        pets,
        user: req.session.user,
        timeWaiting,
      });
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
        //   text: "test",
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

  // static async myPetRequest(req, res) {
  //   try {
  //     const myPets = await Pet.findAll({
  //       where: {
  //         UserId: req.session.user.userId,
  //       },
  //     });

  //     const petIds = myPets.map((pet) => pet.id);
  //     console.log(petIds);

  //     const requests = await AdoptionRequest.findAll({
  //       where: {
  //         PetId: {
  //           [Op.in]: petIds,
  //         },
  //       },
  //       include: [
  //         {
  //           model: Pet,
  //         },
  //         {
  //           model: User,
  //         },
  //       ],
  //     });
  //     // res.render("shelters/my-pet-request.ejs", {
  //     //   requests,
  //     //   user: req.session.user,
  //     // });
  //     res.send(requests);
  //   } catch (error) {
  //     console.log(error);
  //     res.send(error);
  //   }
  // }

  static async myPetRequest(req, res) {
    try {
      const { petId } = req.query;
      const options = {
        include: {
          model: AdoptionRequest,
          include: {
            model: User,
          },
        },
        where: {
          UserId: req.session.user.userId,
        },
      };
      if (petId) {
        options.where.id = petId;
      }
      const myPets = await Pet.findAll(options);

      const myPetsName = await Pet.findAll({
        where: {
          UserId: req.session.user.userId,
        },
      });
      console.log(myPetsName);

      // res.send(myPets);
      res.render("shelters/my-pet-request.ejs", {
        myPets,
        myPetsName,
        petId,
        user: req.session.user,
      });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async requestDetail(req, res) {
    try {
      const { requestId } = req.params;
      const request = await AdoptionRequest.findByPk(requestId, {
        include: [
          {
            model: Pet,
            include: {
              model: Type,
            },
          },
          {
            model: User,
            include: {
              model: Profile,
            },
          },
        ],
      });
      // res.send(request);
      res.render("shelters/request-detail.ejs", {
        request,
        user: req.session.user,
      });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
  static async rejectRequest(req, res) {
    try {
      const { requestId } = req.params;
      await AdoptionRequest.update(
        {
          status: "Rejected",
        },
        {
          where: {
            id: requestId,
          },
        }
      );
      res.redirect("/shelter/myPetRequest");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
  static async acceptRequest(req, res) {
    try {
      const { requestId } = req.params;
      await AdoptionRequest.update(
        {
          status: "Approved",
        },
        {
          where: {
            id: requestId,
          },
        }
      );

      const request = await AdoptionRequest.findByPk(requestId, {
        attributes: ["PetId"],
      });
      // console.log(petId);

      await Pet.update(
        {
          adopted: true,
        },
        { where: { id: request.PetId } }
      );
      res.redirect("/shelter/myPetRequest");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
}

module.exports = ShelterController;
