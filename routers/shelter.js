const ShelterController = require("../controllers/ShelterController");
const { isShelter } = require("../middleware/auth");
const router = require("express").Router();

router.get("/", isShelter, ShelterController.getAllPet);
router.get("/addPet", isShelter, ShelterController.addPetForm);
router.post("/addPet", isShelter, ShelterController.addPet);
router.get("/myPetRequest", isShelter, ShelterController.myPetRequest);
router.get("/:petId/edit", isShelter, ShelterController.editPetForm);
router.post("/:petId/edit", isShelter, ShelterController.editPet);
router.get("/:petId/delete", isShelter, ShelterController.deletePet);
router.get("/:requestId/detail", isShelter, ShelterController.requestDetail);
router.post(
  "/requests/:requestId/reject",
  isShelter,
  ShelterController.rejectRequest
);
router.post(
  "/requests/:requestId/approve",
  isShelter,
  ShelterController.acceptRequest
);

module.exports = router;
