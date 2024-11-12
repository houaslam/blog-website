const express = require('express')
const Blog = require('../models/blogs')


const blog_index = (req, res) =>{
    Blog.find().sort({ createdAt : -1 })
    .then((result) =>{
        res.render('blogs/index', {title : 'blog', blogs : result})
        } )
        .catch((err)=>console.log(err))
}

const blog_create_post = (req, res)=>{
    const blog = new Blog(req.body)
    blog.save()
    .then((result)=>{
        res.redirect('/blogs')
    })
    .catch((err)=>console.log(err))
}

const blog_create_get = (rep, res) =>{
    res.render('blogs/create', {title : 'create'})
}

const blog_details = (req, res)=>{
    const id = req.params.id
    Blog.findById(id)
        .then(result=>{
            res.render('blogs/details', {title : 'details', blog : result})
        })
    .catch((err)=>res.status(404).render('404', {title : 'Blog not found'}))

}

const blog_delete = (req, res)=>{
    const id = req.params.id
    Blog.findByIdAndDelete(id)
        .then(()=>{
            res.json({redirect : '/blogs'})
        })
    .catch((err)=>console.log(err))
}

const blog_update = (req, res) =>{
    console.log('update')
}

module.exports = {
    blog_index , 
    blog_create_post,
    blog_create_get ,
    blog_delete,
    blog_details,
    blog_update
}