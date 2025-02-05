class AdopterController {
  static async home(req, res) {
    try {
      res.render("adopter-home", { user: req.session.user });
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = AdopterController;
