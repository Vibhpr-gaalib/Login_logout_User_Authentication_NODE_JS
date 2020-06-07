require('dotenv').config();
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");

const user = {   //send
    Name : "Vibhor ",
    Age : "45",
}

var token;
 console.log(token); //undefined is key for us
app.get('/user',auth,(req,res)=>{ //needs protection
    res.json({user : user,userInfo : req.user});
});

app.post('/login',(req,res)=>{ //verify
    //check if user exist or not
    const value = {
        Email : "AGAGAG@gmail.com",
        Pass : "666666"  //hash
    }
   token = jwt.sign({value} , process.env.ACESS_TOKEN); //generate token
   res.send(token);
   console.log(token);
  
});
app.post('/logout',(req,res)=>{ //logout
   token = undefined; //value undefined
   res.send("logout");
});



function auth (req,res,next){  //middleware function
     if(token !== undefined){
           jwt.verify(token,process.env.ACESS_TOKEN,(err,verified)=>{
               if(err) return res.status(404).send("Token not verified"); //if err
                 req.user = verified;
                 next();
           });
     }else{
           return res.status(404).send("Needs to login first");
     }
}


const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log("Started")
})