const router = require('express').Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const verify = require('../middlewares/verifyToken');
const ROLES_LIST = require('../config/roles_list');
const verifyRoles = require('../middlewares/verifyRoles');

//Get all users
router.get('/', verify, verifyRoles(ROLES_LIST.Admin), async (req, res) => {
    try {
        const user = await User.find();
        return res.json({
            status: "Success",
            data: user
        })
    }
    catch{
        res.json({message: err})
    }
});

//Get specific user
router.get('/:userId', verify, async (req, res) => {
    try{
        const user = await User.findById(req.params.userId);
        return res.json({
            status: "Success",
            data: user
        })
    }
    catch (err){
        res.json({message: err});
    }
})

//Update user
router.patch('/:userId', verify, verifyRoles(ROLES_LIST.Admin), async(req, res) =>{
    try{
        const updatedUser = await User.findByIdAndUpdate({_id: req.params.userId}, {name: req.body.name, email: req.body.email, password: req.body.password});
        res.send(updatedUser);
    } catch(err){
        res.json({message: err});
    }
});

//Delete User
router.delete('/:userId', verifyRoles(ROLES_LIST.Admin), async(req,res) => {
    try{
        const removedUser = await User.remove({_id: req.params.userId}, {$set: {}})
        res.json({
            status: "Success",
            data: removedUser
        });
    } catch(err){
        res.json({message: err});
    }
});

module.exports = router;
