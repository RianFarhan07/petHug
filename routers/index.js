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
router.get("/adopter/request", isAdopter, AdopterController.myAdoption);
router.get("/adopter/:petId", isAdopter, AdopterController.petDetail);
router.post("/adopter/:petId/adopt", isAdopter, AdopterController.adoptPet);
router.get("/shelter", isShelter, ShelterController.getAllPet);
router.get("/shelter/addPet", ShelterController.addPetForm);
router.post("/shelter/addPet", ShelterController.addPet);
router.get("/shelter/:petId/edit", ShelterController.editPetForm);
router.post("/shelter/:petId/edit", ShelterController.editPet);
router.get("/shelter/:petId/delete", ShelterController.deletePet);
// router.get("/shelter/:petId", ShelterController.petDetail);
router.get("/logout", UserController.logOut);

module.exports = router;
