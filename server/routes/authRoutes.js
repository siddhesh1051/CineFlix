const { getUser,register, login , addFav, removeFromLikedMovies, getLikedMovies, removeFromWatchLater, getWatchLater, addWatchLater, checkLiked, checkWatchLater } = require("../controllers/authControllers");
const { checkUser } = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.post("/", getUser); 
router.post("/register", register);
router.post("/login", login);
router.post("/addFav",checkUser, addFav);
router.post("/addWatchLater", checkUser, addWatchLater);
router.post("/checkLiked", checkLiked);
router.post("/checkWatchLater", checkWatchLater);
router.put("/removeFav", removeFromLikedMovies);
router.put("/removeWatchLater", removeFromWatchLater);
router.get("/liked/:email",checkUser, getLikedMovies);
router.get("/watchLater/:email",checkUser, getWatchLater);
module.exports = router;
