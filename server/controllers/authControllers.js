const User = require("../model/authModel");
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "kishan sheth super secret key", {
    expiresIn: maxAge,
  });
};

const handleErrors = (err) => {
  let errors = { email: "", password: "" };

  console.log(err);
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

module.exports.register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.create({ email, password });
    const token = createToken(user._id);

    res.cookie("jwt", token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: maxAge * 1000,
    });

    res.status(201).json({ user: user._id, created: true });
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.json({ errors, created: false });
  }
};

module.exports.login = async (req, res) => {
  const { email, password} = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id, status: true });
    // user.fav.push(movieId);
    // user.fav.push(movieId);
    
    console.log(user.fav)
  } catch (err) {
    const errors = handleErrors(err);
    res.json({ errors, status: false });
  }
};

module.exports.addFav = async (req, res) => {
  // const { email, movieId} = req.body;
  // try{
  //     const user =  await User.find({email : email});
  //     if(!user)
  //     {
  //       return res.status(400).json({message : "User not found"});
  //     }
  //     else{
        
  //       // user.fav.push(movieId);
        
  //       console.log(user.email);
  //       // console.log(user);
  //       console.log(user.fav);
        
  //       console.log(movieId);
  //      user.fav.push(movieId);
  //     return res.status(200).json({message : "Movie added to fav"});
  //     }
      
  // }
  // catch(err){
  //   console.log(err);
  // }
  try {
    const { email, movieId } = req.body;
    const user = await await User.findOne({ email });
    if (user) {
      const { fav } = user;
      const movieAlreadyLiked = fav.find(({ id }) => id === movieId);
      if (!movieAlreadyLiked) {
        await User.findByIdAndUpdate(
          user._id,
          {
            fav: [...user.fav, movieId],
          },
          { new: true }
        );
      } 
      else 
      return res.json({ msg: "Movie already added to the liked list." });
    } 
    
    else 
    await User.create({ email, fav: [movieId] });
    
    return res.json({ msg: "Movie successfully added to liked list." });
  } 
  catch (error) {
    return res.json({ msg: "Error adding movie to the liked list" });
  }
 };
