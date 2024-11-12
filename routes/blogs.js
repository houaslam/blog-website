const express = require('express')
const controller = require('../controllers/blogs')
const router = express.Router()

router.get('/', controller.blog_index)
router.post('/', controller.blog_create_post)
router.get('/create', controller.blog_create_get)
router.get('/:id', controller.blog_details)
router.put('/:id', controller.blog_update)
router.delete('/:id', controller.blog_delete)

module.exports = router