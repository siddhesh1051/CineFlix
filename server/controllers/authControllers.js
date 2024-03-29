const User = require("../model/authModel");
const jwt = require("jsonwebtoken");

// const maxAge = '30d';
const createToken = (id) => {
  return jwt.sign({ id }, "sid", {
    expiresIn: '30d',
  });
};

const handleErrors = (err) => {
  let errors = { email: "", password: "" };

  // console.log(err);
  if (err.message === "incorrect email") {
    errors.email = "That email is not registered";
  }

  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }

  if (err.code === 11000) {
    errors.email = "Email is already registered";
    return errors;
  }

  if (err.message.includes("Users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};


//get info from jwt
module.exports.getUser = (req, res, next) => {
  // console.log(req.body)
  const  {token}  = req.body;
  console.log(token)
  
  
  if (token) {
    jwt.verify(
      token,
      "sid",
      async (err, decodedToken) => {
        if (err) {
          res.status(401).json({ msg:"Login to Proceed", status: false });
        } else {
          const user = await User.findById(decodedToken.id);
          if (user) res.json({ status: true, user: user.email, userid: user.username});
          else res.json({ status: false });
          next();
        }
      }
    );
  } else {
    res.status(401).json({ msg:"Login to Proceed", status: false });

  }
};

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.create({ username,email, password });
    const token = createToken(user._id);

    // res.cookie("jwt", token, {
    //   httpOnly: false,
    //   maxAge: maxAge * 1000,
    //   domain: "onrender.com",
    //   sameSite: "lax",
    //   secure: true
    // });

    res.status(201).json({ user: user._id, token: token, created: true });
  } catch (err) {
    // console.log(err);
    const errors = handleErrors(err);
    res.json({ errors, created: false });
  }
};

module.exports.login = async (req, res) => {
  const { email, password} = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    // res.cookie("jwt", token, {
    //   httpOnly: false,
    //   maxAge: maxAge * 1000 ,
    //   // domain: "onrender.com",
    //   sameSite: "lax",
    //   secure: true
    // });
    res.status(200).json({ user: user._id, token: token, status: true });
    
  } catch (err) {
    const errors = handleErrors(err);
    res.json({ errors, status: false });
  }
};

module.exports.addFav = async (req, res) => {
  
  try {
    const { email, data, token } = req.body;
    if(!email || !token ) return res.status(401).json({ msg: "Login to Proceed" });
    const user = await User.findOne({ email });
    if (user) {
      const { fav } = user;
      const movieAlreadyLiked = fav.find(({ id }) => id === data.id);
      if (!movieAlreadyLiked) {
        await User.findByIdAndUpdate(
          user._id,
          {
            fav: [...user.fav, data],
          },
          { new: true }
        );
      } else return res.json({ msg: "Movie already added to the liked list." });
    } else await User.create({ email, fav: [data] });
    return res.json({ msg: "Movie successfully added to liked list." });
  } catch (error) {
    return res.json({ msg: "Error adding movie to the liked list" });
  }
};

module.exports.removeFromLikedMovies = async (req, res) => {
  try {
    const { email, movieId } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const movies = user.fav;
      // console.log(movies);
      const movieIndex = movies.findIndex(movie => movie.id === movieId);
      // console.log(movieIndex);
      if (!movieIndex) {
        res.status(400).send({ msg: "Movie not found." });
      }
      movies.splice(movieIndex, 1);
      await User.findByIdAndUpdate(
        user._id,
        {
          fav: movies,
        },
        { new: true }
      );
      return res.json({ msg: "Movie successfully removed.", movies });
    } else return res.json({ msg: "User with given email not found." });
  } catch (error) {
    return res.json({ msg: "Error removing movie to the liked list" });
  }
};

module.exports.getLikedMovies = async (req, res) => {
  try {
    const { email } = req.params;
    const user =  await User.findOne({ email });
    if (user) {
      return res.json({ msg: "success", movies: user.fav });
    } else return res.json({ msg: "User with given email not found." });
  } catch (error) {
    return res.json({ msg: "Error fetching movies." });
  }
};
module.exports.checkLiked = async (req, res) => {
  try {
    const { email, data } = req.body;
    // if(!email || !data ){ return res.json({ msg: "Something is Missing" });}
    const user = await User.findOne({ email });
    if (user) {
      const { fav } = user;
      const movieAlreadyLiked = fav.find(({ id }) => id === data.id);
      
      if (movieAlreadyLiked) {
        return res.json({ movieAlreadyLiked: true }); 
      }
      else{
        return res.json({ movieAlreadyLiked: false });
    }
  }
  } catch (error) {
    return res.json({ msg: "Error occured" });
  }

}


//Watch Later

module.exports.addWatchLater = async (req, res) => {
  try {
    const { email, data } = req.body;
    // console.log(email, data);

    const user = await User.findOne({ email });
    if (user) {
      const { watch } = user;
      const movieAlreadyLiked = watch.find(({ id }) => id === data.id);
      if (!movieAlreadyLiked) {
        await User.findByIdAndUpdate(
          user._id,
          {
            watch: [...user.watch, data],
          },
          { new: true }
        );
        return res.status(200).json({ msg: "Movie successfully added to Watch Later." });
      } else {
        return res.status(400).json({ msg: "Movie already added to the Watch Later." });
      }
    } else {
      await User.create({ email, watch: [data] });
      return res.status(200).json({ msg: "Movie successfully added to Watch Later." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error adding movie to the Watch Later" });
  }
};


module.exports.removeFromWatchLater = async (req, res) => {
  try {
    const { email, movieId } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const movies = user.watch;
      // console.log(movies);
      const movieIndex = movies.findIndex(movie => movie.id === movieId);
      // console.log(movieIndex);
      if (!movieIndex) {
        res.status(400).send({ msg: "Movie not found." });
      }
      movies.splice(movieIndex, 1);
      await User.findByIdAndUpdate(
        user._id,
        {
          watch: movies,
        },
        { new: true }
      );
      return res.json({ msg: "Movie successfully removed.", movies });
    } else return res.json({ msg: "User with given email not found." });
  } catch (error) {
    return res.json({ msg: "Error removing movie to the liked list" });
  }
};

module.exports.getWatchLater = async (req, res) => {
  try {
    const { email } = req.params;
    const user =  await User.findOne({ email });
    if (user) {
      return res.json({ msg: "success", movies: user.watch });
    } else return res.json({ msg: "User with given email not found." });
  } catch (error) {
    return res.json({ msg: "Error fetching movies." });
  }
};

module.exports.checkWatchLater = async (req, res) => {
  try {
    const { email, data } = req.body;
    // if(!email || !data ){ return res.json({ msg: "Something is Missing" });}

    const user =  await User.findOne({ email });
    // console.log(user);
    if (user) {
      const { watch } = user;
      const movieAlreadyLiked = watch.find(({ id }) => id === data.id);
      
      if (movieAlreadyLiked) {
        return res.json({ movieAlreadyLiked: true }); 
    }
    else{
        return res.json({ movieAlreadyLiked: false });
    }
  }
  } catch (error) {
    return res.json({ msg: "Error occured" });
  }

}
