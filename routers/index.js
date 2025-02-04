const Controller = require("../controllers/controller");
const PetController = require("../controllers/PetController");
const UserController = require("../controllers/userController");
const { isAuthenticated, isAdopter, isShelter } = require("../middleware/auth");

const router = require("express").Router();

router.get("/register", UserController.registerForm);
router.post("/register", UserController.registerUser);
router.get("/login", UserController.loginForm);
router.post("/login", UserController.loginUser);

router.use(isAuthenticated);

router.get("/", isAdopter, Controller.home);
router.get("/logout", UserController.logOut);
router.get("/shelter", isShelter, PetController.getAllPet);

module.exports = router;
