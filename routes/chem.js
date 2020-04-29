var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


router.get("/:id", async (req, res) => {
    console.log('inside id search')
    var id = req.params.id;
    var records = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
        records = await chemModel.findOne({ _id: id });
    }
    if (records == null) {
        return res.status(404).send({ message: "ID not found" })
    }
    res.send(records);
})


router.get("/", async (req, res) => {
    var criObj = {};
    var username=req.query.username
    console.log(username)
    if (username) {
        criObj.username = username;
    }
    var records = await chemModel.find(criObj);
    res.send(records);
})

router.post("/", async (req, res) => {
    var body = req.body;
    var obj = {
        Serial_number: body.number,
        year: body.year,
        month:body.month, 
        question_number:body.question_number,
        question:body.question,
        marks:body.marks
    }
    console.log(obj)
    var insertObj = new chemModel(obj);
    var result = await insertObj.save();
    console.log("result::::", result)
    res.send({ message: "record inserted", id: result._id })
});

router.put("/:id", async (req, res) => {
    console.log('inside id search')
    var id = req.params.id;
    var records = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
        records = await chemModel.findOne({ _id: id });
    }
    if (records == null) {
        return res.status(404).send({ message: "ID not found" })
    }
    console.log('id confirmed updating in progress')
    var body = req.body;
    var obj = {
        Serial_number: body.number,
        year: body.year,
        month:body.month, 
        question_number:body.question_number,
        question:body.question,
        marks:body.marks
    }
    await chemModel.findByIdAndUpdate(id, obj);
    console.log('awaiting over')
    res.send({ message: "record updated", id: id })
})

module.exports=router;