
var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/tuscan", { useNewUrlParser: true, useUnifiedTopology: true })
    .then((data) => { console.log("DB connected") })
    .catch(error => { console.log(error) });

var usersSchema = mongoose.Schema({
    username: String,
    password:String,
    name: String,
    email:String,
    address:String,
    phone:String,
    token:String,
    token_expiry:Number,
    isActive: Boolean,
    Admission_date:String,
    current_class:String,
    designation:String
}, { collection: "users_master" });



var physSchema = mongoose.Schema({
   Serial_number: Number,
   year: String,
   month:String, 
   question_number:String,
   question:String,
   marks:Number


}, { collection: "phys_questions" });

var chemSchema = mongoose.Schema({
    Serial_number: Number,
    year: String,
    month:String, 
    question_number:String,
    question:String,
    marks:Number
 
 
 }, { collection: "chem_questions" });

global.usersModel = mongoose.model("users_master", usersSchema);
global.physModel = mongoose.model("phys_questions", physSchema);
global.chemModel = mongoose.model("chem_questions", chemSchema);
