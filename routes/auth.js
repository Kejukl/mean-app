var express=require("express")
var router=express.Router();
var mongoose = require('mongoose');


var jwt = require('jsonwebtoken');
const privateKey = "41a7cbce-e2c8-4c74-963d-26f9e30e640e";

router.post("/login", async (req, res) => {
    console.log('inside post of log')
    var username = req.body.username;
    var password = req.body.password;
    console.log('inside post login',username,password)

    var userInfo = await usersModel.find({username,password});

    console.log("userInfo......", userInfo);
    if (userInfo.length>0){
        console.log('id is:::',userInfo[0]._id)
        jwt.sign({ username: username }, privateKey,async function(err, itoken) {
            //console.log(token);
            var expiry=Date.now()+(60*60*24*1000)
            await usersModel.findByIdAndUpdate(userInfo[0]._id,{token:itoken,token_expiry:expiry});
            return res.send({token:itoken,user:{username:username,email:userInfo[0].email}})

          });        
    
    } else{
        return res.status(404).send({message:"invalid credentials"})
    }
});


router.post("/logout", async (req, res) => {
    console.log('inside logout')
    var token=req.body.token
    console.log(token)
    try{
        await usersModel.findOneAndUpdate({token:token},{token:null});
    }catch(ex){
        console.log
    }
    return res.send({message:" users logged out"})
})
   // var token = req.header('Authorization');
    //or you can in body then it becomes like var token=req.body.token// 



module.exports=router;
