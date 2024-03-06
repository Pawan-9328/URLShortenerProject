const { getUser } = require("../service/auth");

//....this is Authentication.....
function checkForAuthentication(req, res, next) {
   const tokenCookie = req.cookies?.token;
   req.user = null;

   if (!tokenCookie) return next();

   const token = tokenCookie;
   const user = getUser(token);

   req.user = user;
   return next();

}


//....this is Authorization.....

// ADMIN, NORMA [who will restrict this role ]
function restrictTo(roles = []) {
   return function (req, res, next) {
      if (!req.user) return res.redirect("/login");
      if (!roles.includes(req.user.role)) return res.end('UnAuthorized');

      return next();
   }; 

}

// async function restrictToLoggedinUserOnly(req, res, next) {
//    //const userUid = req.cookies?.uid;
//    const userUid = req.headers["Authorization"];

//    if (!userUid) return res.redirect("/login");
//    // pick zero[0] bcz isse hmre pss token aa jyega..
//    const token = userUid.split('Bearer')[1] // "Bearer [23ul1232ukhdjdh]" 
//    const user = getUser(token); //userUid

//    if (!user) return res.redirect("/login");

//    req.user = user;
//    next();

// }

// async function checkAuth( req, res, next){
//  //console.log(req.headers);
//   //const userUid = req.cookies?.uid;
//   const userUid = req.headers["authorization"];
//   const token = userUid.split('Bearer')[1]; // "Bearer [23ul1232ukhdjdh]" 

//    const user = getUser(token); //userUid

//    req.user = user;
//    next();


// }

// async function checkAuth(req, res, next) {
//    const userUid = req.headers["authorization"];
//    if (!userUid) return res.status(401).send("Unauthorized");

//    const tokenArray = userUid.split('Bearer');
//    if (tokenArray.length < 2) return res.status(401).send("Unauthorized");

//    const token = tokenArray[1].trim();
//    const user = getUser(token);

//    req.user = user;
//    next();
// }


module.exports = {
   //restrictToLoggedinUserOnly,
   //checkAuth,
   checkForAuthentication,
   restrictTo,
}