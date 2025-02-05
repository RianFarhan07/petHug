const { Pet, Type, AdoptionRequest } = require("../models");
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
  static async petDetail(req, res) {
    const { petId } = req.params;
    const { success } = req.query;
    try {
      const pet = await Pet.findByPk(petId, {
        include: {
          model: Type,
        },
      });
      res.render("adopter-pet-detail.ejs", {
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
      res.render("adopter-my-adoption.ejs", {
        user: req.session.user,
        adoptionRequests,
      });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
}

module.exports = AdopterController;
