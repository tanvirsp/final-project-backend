const { DecodeToken } = require("../utility/TokenHelper")

module.exports=(req,res,next)=>{

    // Receive Token
    let token=req.headers['token']
    if(!token){
        token=req.cookies['token']
    }


  // Token Decode
  let decoded=DecodeToken(token)
    
  // Request Header Email+UserID Add
  if(decoded===null){
      return res.status(401).json({status:"fail", message:"Unauthorized User"})
  }
  else {
   
    req.headers = decoded;
    next();
  }
}