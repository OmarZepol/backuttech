const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateJWT = ( email ) => {
    const payload = {email};
    return new Promise((resolve, reject) => {
        jwt.sign(payload, process.env.SECRET_KEY,{
            expiresIn: '24h'
        }, (err, token) => {
            if(err){
                console.log(err);
                reject(err);
            } else {
                // Devuelve token
                resolve(token);
    
            }
        })
    });
    
    
}
module.exports = {
    generateJWT
}
