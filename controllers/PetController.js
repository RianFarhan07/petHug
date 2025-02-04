class PetController {
  static async getAllPet(req, res) {
    try {
      res.render("shelter-home");
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = PetController;
