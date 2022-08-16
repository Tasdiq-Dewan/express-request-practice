const express = require("express");
const app = express();
const routes = require("./routes/routes");



function logRequest(req, res, next){
    console.log(req.Date);
    next();
}

app.use("router", logRequest, routes);

app.use(logRequest);

app.use(express.json());

app.use((err, req, res, next) => {
    console.log("error");
    //console.log(err.stack);
    next(err);
});


app.listen(8090);