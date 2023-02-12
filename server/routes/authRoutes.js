const { register, login , addFav, removeFromLikedMovies, getLikedMovies, removeFromWatchLater } = require("../controllers/authControllers");
const { checkUser } = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.post("/", checkUser); 
router.post("/register", register);
router.post("/login", login);
router.post("/addFav", addFav);
router.post("/removeFav", removeFromLikedMovies);
router.put("/removewatch", removeFromWatchLater);
router.get("/liked/:email", getLikedMovies);
router.get("/watch/:email", getLikedMovies);
module.exports = router;
