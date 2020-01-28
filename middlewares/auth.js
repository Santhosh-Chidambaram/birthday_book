const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req,res,next) => {
    //check token
    const token = req.header('x-auth-token');

    if(!token){
       return  res.status(401).json({msg:"No Token authurozation denied"})
    }
    try {
        //verify user is logged in or not
        const decoded = jwt.verify(token,config.get('jwtSecret'));
        req.user = decoded.user;
        next();
        
    } catch (error) {
        
        res.status(401).json({msg:"invalid token"})
        
    }
    

    

}