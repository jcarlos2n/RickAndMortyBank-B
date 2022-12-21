
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
let authConfig = require('../config/auth')

const UsersController = {};

UsersController.getUsers = (req, res) => {

    User.find({}).then(result => {
        res.json(result);
        mongoose.connection.close();
    })
};

UsersController.getData = async (req, res) => {
    const { id } = req.params;

    let user = await User.findOne({ _id: id })
    .then(result => {
        res.json(result);
    }).catch(err => {   
        res.send(err);
    })
   
};

UsersController.postUser = async (req, res) => {
    
    let name = req.body.name;
    let email = req.body.email;
    let password = bcrypt.hashSync(req.body.password, Number.parseInt(3));

    if (name === "" || email === "" || password === "") {

        res.send("Rellena los campos que faltan");
    } else {

        User.create({
            name: name,
            email: email,
            password: password
        }).then(user => {
            
            res.send(`${user.name}, you have been added succesfully`);
        }).catch(err => {
            
            res.send(err);
        })
    }
};