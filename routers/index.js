const AdopterController = require("../controllers/AdopterController");
const Controller = require("../controllers/Controller");

const ShelterController = require("../controllers/ShelterController");

const UserController = require("../controllers/userController");
const { isAuthenticated, isAdopter, isShelter } = require("../middleware/auth");

const router = require("express").Router();

router.get("/register", UserController.registerForm);
router.post("/register", UserController.registerUser);
router.get("/login", UserController.loginForm);
router.post("/login", UserController.loginUser);
router.get("/", Controller.home);

router.use(isAuthenticated);

router.get("/adopter", isAdopter, AdopterController.home);
router.get("/logout", UserController.logOut);
router.get("/shelter", isShelter, ShelterController.getAllPet);

module.exports = router;
