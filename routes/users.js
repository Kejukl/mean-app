var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


router.get("/:id", async (req, res) => {
    console.log('inside id search')
    var id = req.params.id;
    var records = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
        records = await usersModel.findOne({ _id: id });
    }
    if (records == null) {
        return res.status(404).send({ message: "ID not found" })
    }
    res.send(records);
})


router.get("/", async (req, res) => {
    console.log('inside user get method')
    var criObj = {};
    var username=req.query.username
    if (username) {
        criObj.username = username;
        console.log(username)
    }
    var records = await usersModel.find(criObj);
    res.send(records);
})

router.post("/", async (req, res) => {
    console.log('posting a new user')
    var body = req.body;
    var obj = {
        username: body.name,
        password: body.password,
        name:body.name,
        email:body.email,
        address:body.address,
        phone:body.phone,
        token:'',
        token_expiry:+0,
        isActive:Boolean(body.isActive),
        Admission_date:Number(body.Admission_date),
        current_class:body.current_class,
        designation:body.designation
    }
    console.log(obj)
    var insertObj = new usersModel(obj);
    var result = await insertObj.save();
    console.log("result::::", result)
    res.send({ message: "record inserted", id: result._id })
});

router.put("/:id", async (req, res) => {
    console.log('inside id search')
    var id = req.params.id;
    var records = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
        records = await usersModel.findOne({ _id: id });
    }
    if (records == null) {
        return res.status(404).send({ message: "ID not found" })
    }
    console.log('id confirmed updating in progress')
    var body = req.body;
    var obj = {
        username: body.name,
        password: body.password,
        name:body.name,
        email:body.email,
        address:body.address,
        phone:body.phone,
        token:body.token,
        token_expiry:0,
        isActive:Boolean(body.isActive),
        Admission_date:Number(body.Admission_date),
        current_class:body.current_class,
        designation:body.designation

    }
    await usersModel.findByIdAndUpdate(id, obj);
    console.log('awaiting over')
    res.send({ message: "record updated", id: id })
})

module.exports=router;