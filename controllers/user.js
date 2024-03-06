//..uuid id create a big type user  id we used like  a session.. 
const { v4: uuidv4 } = require('uuid');
const User = require('../models/user');
const { setUser } = require('../service/auth');
async function handleUserSingup(req, res) {
   const { name, email, password } = req.body;

   await User.create({
      name,
      email,
      password,

   });
   return res.redirect("/");

}

async function handleUserLogin(req, res) {
   const { email, password } = req.body;
   const user = await User.findOne({ email, password })
   //console.log("User" , user);
   if (!user)
      return res.render('login', {
         error: "Invalid Username or Password",
      });
   // const sessionId = uuidv4();
   // setUser(sessionId, user);
   const token = setUser(user);
   res.cookie("token", token); //..'uid, 'sessionId 
      return res.redirect("/");
   return res.json({ token });

}

module.exports = {
   handleUserSingup,
   handleUserLogin,
};