const Controller = require("../controllers/Controller");

const UserController = require("../controllers/userController");
const { isAuthenticated, isAdopter, isShelter } = require("../middleware/auth");

const router = require("express").Router();

router.get("/register", UserController.registerForm);
router.post("/register", UserController.registerUser);
router.get("/login", UserController.loginForm);
router.post("/login", UserController.loginUser);
router.get("/", Controller.home);

router.use(isAuthenticated);

router.use("/shelter", require("./shelter"));
router.use("/adopter", require("./adopter"));

router.get("/logout", UserController.logOut);
router.get("/profile", UserController.profile);
router.post("/profile/edit", UserController.updateProfile);

module.exports = router;
