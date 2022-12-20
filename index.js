
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 3001;
const router = require("./router");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(PORT, ()=>{
    console.log("Server is running on port", PORT);
})