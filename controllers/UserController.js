const { User, Pet, Profile } = require("../models");
const bcrypt = require("bcryptjs");

class UserController {
  static async registerForm(req, res) {
    const { errors } = req.query;
    try {
      if (req.session.user) {
        return res.redirect(
          req.session.user.userRole === "adopter" ? "/adopter" : "/shelter"
        );
      }
      res.render("auth-pages/register-form", { errors });
    } catch (error) {
      res.send(error);
    }
  }
  static async registerUser(req, res) {
    try {
      const { email, password, role } = req.body;
      const user = await User.create({ email, password, role });

      await Profile.create({
        UserId: user.id,
        fullname: " ",
        phoneNumber: " ",
        address: " ",
        gender: " ",
        profilePicture: " ",
      });

      res.redirect("/login");
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        const errors = error.errors.map((err) => err.message);
        res.redirect(`/register?errors=Email Already Exists`);
        // res.send(error);
      } else if (error.name === "SequelizeValidationError") {
        const errors = error.errors.map((err) => err.message);
        res.redirect(`/register?errors=${errors}`);
      } else {
        console.log(error);
        res.send(error);
      }
    }
  }
  static async loginForm(req, res) {
    try {
      if (req.session.user) {
        return res.redirect(
          req.session.user.userRole === "adopter" ? "/adopter" : "/shelter"
        );
      }
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
            return res.redirect("/adopter");
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
      res.redirect("/");
    } catch (error) {
      res.send(error);
    }
  }

  static async profile(req, res) {
    try {
      const userId = req.session.user.userId;
      const user = await User.findByPk(userId, {
        include: {
          model: Profile,
        },
      });
      const genderOption = Pet.gender();
      // res.send(user);
      res.render("auth-pages/profile-form", { user, genderOption });
    } catch (error) {
      console.log(error);

      res.send(error);
    }
  }

  static async updateProfile(req, res) {
    try {
      const { fullname, phoneNumber, address, gender, profilePicture } =
        req.body;
      const userId = req.session.user.userId;
      await Profile.update(
        {
          fullname,
          phoneNumber,
          address,
          gender,
          profilePicture,
        },
        {
          where: { UserId: userId },
        }
      );
      res.redirect("/profile");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
}

module.exports = UserController;
