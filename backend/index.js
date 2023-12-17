const { log } = require('console');
const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
const welcomeRoute = require('./routes/welcomeRoute.js');
const userRoutes = require('./routes/userRoutes.js');

app.use(cors());
app.use(express.json());


app.use("/", welcomeRoute)

app.listen(port, () => {
    console.log("Server started at port ${port}");
});