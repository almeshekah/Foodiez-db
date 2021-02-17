
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const db = require("./db/models");
app.use(express.json());

app.listen(8000, () => {
    console.log("The application is running on localhost:8000");
});





db.sequelize.authenticate();