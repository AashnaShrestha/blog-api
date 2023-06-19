const router = require('express').Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//Register
router.post('/register', async (req, res) => {
    const emailExist = await User.findOne({
        email: req.body.email
    })
    if (emailExist) return res.status(400).send('Email already exists')

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        roles: {
            User: 1002
        },
        password: hashedPassword
    });
    try {
        const savedUser = await user.save();
        console.log(savedUser);
        res.json({
            status: "Success",
            data: {
                id: user._id,
            }
        });
    } catch (err) {
        return res.status(400).json({
            status: "Registration Failed",
            data: err
        })
    }
});

//Login
router.post('/login', async (req, res) => {
    const user = await User.findOne({
        email: req.body.email
    });
    console.log(user);
    if (!user) return res.status(400).send('Email not found');
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Invalid Password');
    const roles = Object.values(user.roles);
    const token = jwt.sign({
        UserInfo: {
            id: user._id,
            name: user.name,
            roles: roles
        }
    }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send({
        status: "Success",
        token: token
    });
});

module.exports = router;