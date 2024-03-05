//we maintain our state 
//const sessionIdToUserMap = new Map();

const jwt = require("jsonwebtoken");
const secret = "keshav$@#1234098";

function setUser(user) {
    //sessionIdToUserMap.set(id, user)
    return jwt.sign(
        {
             _id: user._id,
             email: user.email,
        },
        secret
    );

};

// function getUser(token) { // id
//      if(!token) return null;
//     return jwt.verify(token,secret )
//     //return sessionIdToUserMap.get(id);

// }
function getUser(token) {
    if (!token) return null;
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        // Handle JWT verification errors
        console.error("JWT verification error:", error);
        return null;
    }
}

module.exports = {
    setUser,
    getUser,

};