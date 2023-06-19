const router = require('express').Router();
const Blog = require('../model/Blog');
const verify = require('../middlewares/verifyToken');

//Create Blog
router.post('/create', verify, async (req, res) => {
    const blog = new Blog({
        userId: req.user.id,
        author: req.user.name,
        title: req.body.title,
        article: req.body.article,
    });
    try {
        const savedBlog = await blog.save();
        console.log(savedBlog);
        res.json({
            status: "Success",
            data: savedBlog
        });
    } catch (err) {
        return res.status(400).json({
            status: "Failed",
            data: err
        })
    }
});

//Get all blogs
router.get('/', verify, async (req, res) => {
    try {
        const blog = await Blog.find();
        return res.json({
            status: "Success",
            data: blog
        })
    }
    catch{
        res.json({message: err})
    }
});

//Get specific blog
router.get('/:blogId', async (req, res) => {
    try{
        const blog = await Blog.findById(req.params.blogId);
        return res.json({
            status: "Success",
            data: blog
        })
    }
    catch (err){
        res.json({message: err});
    }
});

//Delete Blog
router.delete('/:blogId', async(req,res) => {
    try{
        const removedBlog = await Blog.remove({_id: req.params.blogId}, {$set: {}})
        res.json({
            status: "Success",
            data: removedBlog
        });
    } catch(err){
        res.json({message: err});
    }
});

//Edit Blog
router.patch('/:blogId', async(req, res) =>{

    try{
        const updatedBlog = await Blog.findByIdAndUpdate({_id: req.params.blogId}, {title: req.body.title, article: req.body.article});
        res.send(updatedBlog);
    } catch(err){
        res.json({message: err});
    }
});
module.exports = router;