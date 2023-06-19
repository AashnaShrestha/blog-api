const router = require('express').Router();
const userController = require("../controller/user");

router.use(userController);


module.exports=router;
