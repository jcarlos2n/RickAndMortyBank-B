
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
    try {
        const { id } = req.params;

        const user = await User.findOne({ _id: id })
        return res.json({ success: true, data: user })

    } catch (error) {
        return res.json({ success: true, error: error })
    }

};

UsersController.postUser = async (req, res) => {
    try {
        let name = req.body.name;
        let email = req.body.email;
        let password = bcrypt.hashSync(req.body.password, Number.parseInt(3));

        if (name === "" || email === "" || password === "") {

            return res.json({err});
        } else {

            const createUser = await User.create({
                name: name,
                email: email,
                password: password
            })
           
            let message = createUser.name+", you have been added succesfully";
            return res.json({success: true, data: message })
        }
    } catch (error) {
        return res.json({success: false, error: error})
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