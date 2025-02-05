class Controller {
  static async home(req, res) {
    try {
      if (req.session.user) {
        return res.redirect(
          req.session.user.userRole === "adopter" ? "/adopter" : "/shelter"
        );
      }
      res.render("home");
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = Controller;
