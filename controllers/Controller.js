class Controller {
  static async home(req, res) {
    try {
      res.render("home", { user: req.session.user });
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = Controller;
