const router = require('express').Router();
const blogController = require("../controller/blog");

router.use(blogController);


module.exports=router;
