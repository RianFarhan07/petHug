const Controller = require("../controllers/controller");
const PetController = require("../controllers/PetController");
const UserController = require("../controllers/userController");

const router = require("express").Router();

const isAuthenticated = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/login?error=Please login first");
  }
  next();
};

const isAdopter = (req, res, next) => {
  if (req.session.user.userRole !== "adopter") {
    return res.redirect("/login?error=Please login as adopter");
  }
  next();
};

const isShelter = (req, res, next) => {
  if (req.session.user.userRole !== "shelter") {
    return res.redirect("/login?error=Please login as shelter");
  }
  next();
};

router.get("/register", UserController.registerForm);
router.post("/register", UserController.registerUser);
router.get("/login", UserController.loginForm);
router.post("/login", UserController.loginUser);

router.use(isAuthenticated);

router.get("/", isAdopter, Controller.home);
router.get("/logout", UserController.logOut);
router.get("/shelter", isShelter, PetController.getAllPet);

module.exports = router;
