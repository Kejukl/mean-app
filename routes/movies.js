var express = require('express');
var router = express.Router();

router.get("/:id", async (req, res) => {
    var id = req.params.id;
    var records = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
        records = await moviesModel.findOne({ _id: id });
    }
    if (records == null) {
        return res.status(404).send({ message: "ID not found" })
    }
    res.send(records);
})

router.get("/", async (req, res) => {
    var criObj = {};
    var hero = req.query.hero;
    if (hero) {
        criObj.hero = hero;
    }
    var records = await moviesModel.find(criObj, "hero name likes", { sort: { likes: -1 }, skip: 1, limit: 1 });
    res.send(records);
})

router.post("/", async (req, res) => {
    var body = req.body;
    var obj = {
        name: body.name,
        likes: Number(body.likes),
        actors: body.actors ? body.actors.split(",") : [],
        hero: body.hero
    }
    var insertObj = new moviesModel(obj);
    var result = await insertObj.save();
    console.log("result::::", result)
    res.send({ message: "record inserted", id: result._id })
});

router.put("/:id", async (req, res) => {
    var id = req.params.id;
    var body = req.body;
    var obj = {
        name: body.name,
        likes: Number(body.likes),
        actors: body.actors ? body.actors.split(",") : [],
        hero: body.hero
    }
    await moviesModel.findByIdAndUpdate(id, obj);
    res.send({ message: "record updated", id: id })
})

router.delete("/:id", async (req, res) => {
    var id = req.params.id;
    await moviesModel.findByIdAndRemove(id);
    res.send({ message: "record removed", id: id })
})









module.exports = router;