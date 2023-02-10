const { register, login , addFav, removeFromLikedMovies } = require("../controllers/authControllers");
const { checkUser } = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.post("/", checkUser); 
router.post("/register", register);
router.post("/login", login);
router.post("/addFav", addFav);
router.post("/removeFav", removeFromLikedMovies);

module.exports = router;
