const { register, login , addFav, removeFromLikedMovies, getLikedMovies, removeFromWatchLater, getWatchLater, addWatchLater } = require("../controllers/authControllers");
const { checkUser } = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.post("/", checkUser); 
router.post("/register", register);
router.post("/login", login);
router.post("/addFav", addFav);
router.post("/addWatchLater", addWatchLater);
router.put("/removeFav", removeFromLikedMovies);
router.put("/removeWatchLater", removeFromWatchLater);
router.get("/liked/:email", getLikedMovies);
router.get("/watchLater/:email", getWatchLater);
module.exports = router;
