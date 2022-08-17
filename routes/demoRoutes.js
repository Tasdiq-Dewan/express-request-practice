const router = require("express").Router();

router.get('/getError', (req, res, next) => {
    next(Error('Message'));
});

router.get("/", (req, res) => {
    res.send("Hello my name is Tasdiq!");
});

let names = ["Panda", "Me", "TD"];

router.get("/getAll", (req, res) => {
    res.send(names);
});

router.get("/get/:id", (req, res) => {
    res.send(names[req.params.id]);
});

router.put("/delete/:id", (req, res) => {
    res.send(names.splice(req.params.id));
});

router.post("/addName", (req, res) => {
    const name = req.body.name;
    console.log(name);
    names.push(name);
    console.log(names);
    res.send(`New names array: ${names}`);
});

router.put("/replace/:id", (req, res) => {
    const id = req.params.id;
    const newName = req.body.name;
    console.log(id, newName);
    names[id] = newName;
    res.send(`Updated names array: ${names}`);
});

module.exports = router;