const ShelterController = require("../controllers/ShelterController");
const { isShelter } = require("../middleware/auth");
const router = require("express").Router();

router.get("/", isShelter, ShelterController.getAllPet);
router.get("/addPet", ShelterController.addPetForm);
router.post("/addPet", ShelterController.addPet);
router.get("/myPetRequest", isShelter, ShelterController.myPetRequest);
router.get("/:petId/edit", ShelterController.editPetForm);
router.post("/:petId/edit", ShelterController.editPet);
router.get("/:petId/delete", ShelterController.deletePet);
router.get("/:requestId/detail", ShelterController.requestDetail);
router.post("/requests/:requestId/reject", ShelterController.rejectRequest);
router.post("/requests/:requestId/approve", ShelterController.acceptRequest);

module.exports = router;
