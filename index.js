
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 3001;
const router = require("./router");
const cors = require("cors");
require("dotenv").config();

const connectionString = `mongodb+srv://jcarlos2n:LBVAv8X0G4IPsVR7@cluster0.td2tswa.mongodb.net/RickAndMorty?retryWrites=true&w=majority`;

app.use(cors());
app.use(express.json());
app.use(router);

mongoose
    .connect(connectionString)
    .then(() => {
        console.log('Database connected');
    }).catch(err => {
        console.error(err);
    });

app.listen(PORT, ()=>{
    console.log("Server is running on port", PORT);
})