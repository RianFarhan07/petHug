class PetController {
  static async getAllPet(req, res) {
    try {
      res.render("shelter-home", { user: req.session.user });
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = PetController;
