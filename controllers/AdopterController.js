const { Pet, Type, AdoptionRequest } = require("../models");
const { timeWaiting } = require("../helpers/timeWaiting");
const { Op, where } = require("sequelize");

class AdopterController {
  static async home(req, res) {
    try {
      const pets = await Pet.findLongest();
      res.render("adopters/adopter-home", {
        user: req.session.user,
        pets,
        timeWaiting,
      });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
  static async petDetail(req, res) {
    const { petId } = req.params;
    const { success } = req.query;
    try {
      const pet = await Pet.findByPk(petId, {
        include: {
          model: Type,
        },
      });
      res.render("adopters/adopter-pet-detail.ejs", {
        user: req.session.user,
        pet,
        timeWaiting,
        success,
      });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
  static async adoptPet(req, res) {
    const { petId } = req.params;
    try {
      const { reason } = req.body;
      await AdoptionRequest.create({
        PetId: petId,
        UserId: req.session.user.userId,
        reason,
      });
      res.redirect(`/adopter/${petId}?success=true`);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async myAdoption(req, res) {
    try {
      const adoptionRequests = await AdoptionRequest.findAll({
        where: {
          UserId: req.session.user.userId,
        },
        include: {
          model: Pet,
          include: {
            model: Type,
          },
        },
      });
      // res.send(adoptionRequests);
      res.render("adopters/adopter-my-adoption.ejs", {
        user: req.session.user,
        adoptionRequests,
      });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async searchForm(req, res) {
    try {
      const { type, name } = req.query;
      const options = {
        include: {
          model: Type,
        },
        where: {},
      };
      if (type) {
        options.where.TypeId = type;
      }
      if (name) {
        options.where.name = {
          [Op.iLike]: `%${name}%`,
        };
      }

      const types = await Type.findAll();
      const pets = await Pet.findAll(options);

      res.render("adopters/pet-search.ejs", {
        user: req.session.user,
        pets,
        types,
      });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
}

module.exports = AdopterController;
