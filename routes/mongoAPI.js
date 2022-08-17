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
    }
});

const reviewSchema = new Schema({
    rating: {
        type: Number,
        min: 0,
        max: 10,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const movieSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        minlength: 10
    },
    dateReleased:{
        type: Date,
        required: true,
        default: Date.now
    },
    genre: {
        type: String
    },
    actors: [actorSchema],
    reviews: [reviewSchema]
});

const movieModel = mongoose.model("Movies", movieSchema);

router.post("/create", (req, res) => {
    //let mov= new Movie(JSON.stringify(req.body))
    console.log(req.body);
    movieModel.create(req.body).then((movie) => res.send(JSON.stringify(movie))).catch(err => {
        console.log(err)
    });
});

router.get("/getAll", (req, res) => {
    movieModel.find({}).select("-_id -__v")
    .then((movies) => res.send(JSON.stringify(movies)))
    .catch(err => { console.log(err)});
})

router.get("/getByName/:name", (req, res) => {
    movieModel.find({title: req.params.name}).select("-_id -__v")
    .then((movies) => res.send(JSON.stringify(movies)))
    .catch(err => { console.log(err)});
})

router.delete("/deleteByTitle/:name", (req, res) => {
    movieModel.deleteOne({title: req.params.name})
    .then((ok) => res.send(JSON.stringify(ok)))
    .catch(err => {console.log(err)});
})

router.put("/updateTitle/:name", (req, res) => {
    movieModel.updateOne({title: req.params.name}, {title: req.body.title})
    .then((updated) => res.send(JSON.stringify(updated)))
    .catch(err => {console.log(err)});
});

router.put("/updateDescription/:title", (req, res) => {
    movieModel.updateOne({title: req.params.tite}, {description: req.body.description})
    .then((updated) => res.send(JSON.stringify(updated)))
    .catch(err => {console.log(err)});
});

module.exports = router;