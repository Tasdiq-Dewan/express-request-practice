const router = require("express").Router();
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/QA", { useNewUrlParser: true }).then(() => {
    console.log("Mongo DB connected")
}, (err) => { 
    console.log(err)
});

const Schema = mongoose.Schema;

const actorSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    nationality: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    notable_works: [{
        type: String
    }]
});

module.exports = router;