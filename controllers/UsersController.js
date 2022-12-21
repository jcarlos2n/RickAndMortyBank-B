
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

UsersController.loginUser = async (req, res) => {

    let doc = req.body.email;
    let clave = req.body.password;

    let user = await User.findOne({ email: doc });

    await User.findOne({
        email: doc
    }).then(userFind => {

        if (!userFind) {
            res.send('Incorrect user or password');

        } else {

            if (bcrypt.compare(clave, userFind.password)) {
                let token = jwt.sign({ user: userFind }, authConfig.secret, {
                    expiresIn: authConfig.expires
                });
                let loginOkMessage = `Welcome again ${userFind.name}`
                res.json({
                    loginOkMessage,
                    user: {
                        name: userFind.name,
                        redes: userFind.redes
                    },
                    token: token
                })
            }


        }
    }).catch(err => {
        console.error(err);
    })
};

module.exports = UsersController;