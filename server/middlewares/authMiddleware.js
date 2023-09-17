const User = require("../model/authModel");
const jwt = require("jsonwebtoken");

module.exports.checkUser = (req, res, next) => {
  // console.log(req.body)
  const  {token}  = req.body;
  const {email} = req.params;
  console.log("token : " +  token , "path : " + req.path )
  
  if(token){
    jwt.verify(
      token,
      "sid",
      async (err, decodedToken) => {
        if(err){
          res.status(401).json({ msg:"Login to Proceed", status: false });
        }
        else{
          const user = await User.findById(decodedToken.id);
          if(user) next();
          else next();


        }
      }
    )
  }
  else if(req.path === `/liked/${email}` || req.path === `/watchLater/${email}`){
    next();
  }
  else{
    res.status(401).json({ msg:"Login to Proceed", status: false });
  }
    
  // if (token) {
  //   jwt.verify(
  //     token,
  //     "sid",
  //     async (err, decodedToken) => {
  //       if (err) {
  //         res.status(401).json({ msg:"Login to Proceed", status: false });
  //       } else {
  //         const user = await User.findById(decodedToken.id);
  //         if (user) next();
  //         else next();
  //         next();
  //       }
  //     }
  //   );
  // } else {
  //   res.status(401).json({ msg:"Login to Proceed", status: false });

  // }

};
