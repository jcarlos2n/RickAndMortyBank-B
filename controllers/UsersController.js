
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const authConfig = require('../config/auth')

const UsersController = {};

UsersController.getUsers = async (req, res) => {
    try {
        const users = await User.find({});

        return res.json({ success: true, data: users })
    } catch (error) {
        return res.json({ success: false, data: "Something has gone wrong" })
    }
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
            let message = "Rellena todos los campos";

            return res.json({ success: false, error: message });
        }

        const createUser = await User.create({
            name: name,
            email: email,
            password: password
        })
        let message = createUser.name + ", you have been added succesfully";

        return res.json({ success: true, data: message });
    } catch (err) {
        return res.json({ success: false, error: err });
    }
};

UsersController.loginUser = async (req, res) => {
    try {
        const doc = req.body.email;
        const clave = req.body.password;
        const user = await User.findOne({ email: doc });

        if (!user) {
            return res.json({ success: false, message: "User doesn´t found" })
        }

        if (bcrypt.compare(clave, user.password)) {
            const token = jwt.sign({ user: user }, authConfig.secret, {
                expiresIn: authConfig.expires
            });

            const loginOkMessage = `Welcome again ${user.name}`;

            return res.json({
                success: true,
                loginOkMessage,
                user: {
                    name: user.name,
                    id: user._id
                },
                token: token
            })
        }
    } catch (error) {
        return res.json({ success: false, error: error })
    }
};

UsersController.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const name = req.body.name;
        const newUpdate = {
            name
        }
        const user = await User.findByIdAndUpdate(id, newUpdate, { new: true, safe: true, upsert: true })

        return res.json({ success: true, data: user })
    } catch (error) {
        res.json({ success: false, error: error })
    }
}

UsersController.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userDelete = await User.findByIdAndDelete(id)
    
        return res.json({ success: true, data: userDelete }) 
    } catch (err) {
        return res.json({ success: false, error: err})
    }

}

module.exports = UsersController;