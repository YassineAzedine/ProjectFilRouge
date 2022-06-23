const router = require("express").Router();
const {

  userAuth,

  checkRole
} = require("../controllers/Auth");
const {
  addOffre,
  getOneOffre,
  getOffres,
  updateoffre,
  deleteoffre,
  recruteurOffres,

  getAllOffre
 
} = require("../controllers/jobofferController");
const { getUserById } = require("../controllers/userController");



const upload = require('../middlewares/upload')

// router.post("/add" , upload.single('image_cover'),  creatFood);



router.post("/api/offre/create/:userId",userAuth, addOffre);
///
router.get("/api/offres/:userId",userAuth, getOffres);
router.get("/api/offres",userAuth, getAllOffre);

router.patch("/api/offres/:offreId", updateoffre);
router.get("/api/offre/:offreId",userAuth, getOneOffre);

router.delete("/api/offres/:offreId",userAuth, deleteoffre);

router.get("/api/offres/by/:userId",userAuth, recruteurOffres);



module.exports = router;