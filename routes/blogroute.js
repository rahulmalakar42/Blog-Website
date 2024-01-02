const blogcontroller = require('../controllers/blogcontroller')
const express = require('express')
const router = express.Router();


router.get('/blogs', blogcontroller.blog_index);
  
router.post('/blogs', blogcontroller.blog_create_post);

router.get('/blogs/create', blogcontroller.blog_create_get);

router.get('/blogs/:id', blogcontroller.blog_details);

router.delete('/blogs/:id', blogcontroller.blog_delete);

module.exports = router;