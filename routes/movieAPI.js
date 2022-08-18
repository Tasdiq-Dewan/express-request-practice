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
}, {_id: false});

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
}, {_id: false});

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
    movieModel.find({})
    .then((movies) => res.send(JSON.stringify(movies)))
    .catch(err => { console.log(err)});
})

router.get("/getAllClean", (req, res) => {
    movieModel.find({}).select("-_id -_v")
    .then((movies) => res.send(JSON.stringify(movies)))
    .catch(err => { console.log(err)});
})

router.get("/getByName/:name", (req, res) => {
    movieModel.find({title: req.params.name}).select("-_id -__v")
    .then((movies) => res.send(JSON.stringify(movies)))
    .catch(err => { console.log(err)});
})

router.get("getById/:id", (req, res) => {
    movieModel.findOne({_id: req.params.id})
    .then((movie) => res.send(JSON.stringify(movies)))
    .catch(err => { console.log(err)});
});

router.delete("deleteById/:id", (req, res) => {
    movieModel.deleteOne({_id: req.params.id})
    .then((ok) => res.send(JSON.stringify(ok)))
    .catch(err => {console.log(err)});
});

router.delete("/deleteByTitle/:name", (req, res) => {
    movieModel.deleteOne({title: req.params.name})
    .then((ok) => res.send(JSON.stringify(ok)))
    .catch(err => {console.log(err)});
})

router.delete("/deleteAll", (req, res) => {
    movieModel.collection.drop()
    .then((ok) => res.send(JSON.stringify(ok)))
    .catch(err => {console.log(err)});
})

router.put("/updateTitle/:name", (req, res) => {
    movieModel.updateOne({title: req.params.name}, {title: req.body.title})
    .then((updated) => res.send(JSON.stringify(updated)))
    .catch(err => {console.log(err)});
});

router.put("/updateDescription/:title", (req, res) => {
    movieModel.updateOne({title: req.params.title}, {description: req.body.description})
    .then((updated) => res.send(JSON.stringify(updated)))
    .catch(err => {console.log(err)});
});

router.put("/addReview/:title", (req, res) => {
    movieModel.updateOne({title: req.params.title}, {"$push": {reviews: req.body}})
    .then((updated) => res.send(JSON.stringify(updated)))
    .catch(err => {console.log(err)});
});

router.put("/addActor/:title", (req, res) => {
    movieModel.updateOne({title: req.params.title}, {"$push": {actors: req.body}})
    .then((updated) => res.send(JSON.stringify(updated)))
    .catch(err => {console.log(err)});
});

module.exports = router;