const serverless = require ('serverless-http');
const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
const welcomeRoute = require('./routes/welcomeRoute.js');
const userRoutes = require('./routes/userRoutes.js');

app.use(cors());
app.use(express.json());


app.use("/", welcomeRoute, userRoutes)
app.listen(port, ()=>{
    console.log("server started at", port);
})
// module.exports.handler=serverless(app);