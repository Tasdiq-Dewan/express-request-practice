const express = require("express");
const app = express();
const parser = require("body-parser");
//const routes = require("./routes/routes");



function logRequest(req, res, next){
    console.log(req.baseUrl);
    next();
}
app.use(parser.json());
app.use(logRequest);
app.use("/demo", logRequest, require("./routes/demoRoutes.js"));
app.use("/mongoAPI", logRequest, require("./routes/mongoAPI.js"));

app.use((err, req, res, next) => {
    console.log("error");
    //console.log(err.stack);
    next(err);
});


app.listen(8093);