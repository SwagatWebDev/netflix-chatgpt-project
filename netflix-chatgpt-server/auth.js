const jwt  = require('jsonwebtoken');
const ensureAuthenticated = async (req, res, next) => {
   const authHeader =  req.headers['authorization'].split(" ")[1];
   if (!authHeader) {
       return res.status(403).json({message: "Unauthorized"});
   }
   try{
       // Check whether user has a valid token
       const decode = jwt.verify(authHeader, process.env.JWT_SECRET);
       req.userInfo = decode;
       if(!decode){
          return res.status(403).json({message: "token is not correct or expired"})
       }
       next();
   } catch (err) {
      return res.status(403).json({message: "token is not correct or expired"})
   }
}

module.exports = ensureAuthenticated;
