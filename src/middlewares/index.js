const jwt = require("jsonwebtoken");
const secret = require('../../config/settings')

const validateAuth = (req,res,next)=>{
    if(!req.headers.authorization){
        return res.status(401).send("Authorization header missing")
    }

    const token = req.headers.authorization.split(" ")[1]

    jwt.verify(token, secret.apiSecret, (err, decoded)=>{

        if(err){
            res.status(401).send("Invalid token!")
        }
        console.log(decoded)
        req.decoded = decoded
        next()
    } )

}

module.exports = validateAuth
