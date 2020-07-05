const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require("jwt-then");

exports.register = async (req, res) => {
 try{
    await bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
      User.create({
         name:req.body.name,
         email:req.body.email,
         password:hash
        })
     })
    res.json({
        message: "User  registered successfully!",
      });
 }catch(e){
     res.json({message:e})
 } 
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    email,
  });
  console.log(user)
  if (!user) throw "Email is incorrect";
  await bcrypt.compare(password,user.password,async (err,result)=>{
      console.log('hi')
      console.log(result)
      if(result==true)
        {
            const token = await jwt.sign({ id: user.id }, process.env.SECRET);
            res.json({
              message: "User logged in successfully!",
              token,
            });
          }
        else{
           res.json({message:'incorrect password entered'})
        }
          })}