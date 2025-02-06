const AdopterController = require("../controllers/AdopterController");
const { isAdopter } = require("../middleware/auth");

const router = require("express").Router();

router.get("/", isAdopter, AdopterController.home);
router.get("/request", isAdopter, AdopterController.myAdoption);
router.get("/search", isAdopter, AdopterController.searchForm);
router.get("/:petId", isAdopter, AdopterController.petDetail);
router.post("/:petId/adopt", isAdopter, AdopterController.adoptPet);

module.exports = router;
