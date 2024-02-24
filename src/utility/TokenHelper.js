const jwt=require('jsonwebtoken');

exports.EncodeToken=(email)=>{
    let KEY="123-ABC-XYZ";
    let EXPIRE={expiresIn: '24h'}
    let PAYLOAD={email:email}
    return jwt.sign(PAYLOAD,KEY,EXPIRE)
}

exports.DecodeToken=(token)=>{
    try {
        let KEY="123-ABC-XYZ";
        return jwt.verify(token,KEY)
    }
    catch (e) {
        return null
    }
}