const { User } = require("../models");
const bcrypt = require("bcryptjs");

class UserController {
  static async registerForm(req, res) {
    try {
      res.render("auth-pages/register-form");
    } catch (error) {
      res.send(error);
    }
  }
  static async registerUser(req, res) {
    try {
      const { email, password, role } = req.body;
      await User.create({ email, password, role });

      res.redirect("/login");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
  static async loginForm(req, res) {
    try {
      const { error } = req.query;
      res.render("auth-pages/login-form", { error });
    } catch (error) {
      res.send(error);
    }
  }
  static async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        res.redirect("/login?error=Email not found");
      } else {
        const isValidPassword = bcrypt.compareSync(password, user.password);
        if (isValidPassword) {
          req.session.user = {
            userId: user.id,
            userRole: user.role,
          };
          if (user.role === "shelter") {
            return res.redirect("/shelter");
          } else {
            return res.redirect("/");
          }
        } else {
          res.redirect("/login?error=Wrong Password");
        }
      }
    } catch (error) {
      console.log(error);

      res.send(error);
    }
  }
  static async logOut(req, res) {
    try {
      req.session.destroy();
      res.redirect("/login");
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = UserController;
