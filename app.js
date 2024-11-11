const express = require('express')
const mongoose = require('mongoose')
const Blog = require('./models/blogs')

const app = express()
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended : true}))


const DB_URL = 'mongodb+srv://hajar:1234@blogwebsite.u6jjb.mongodb.net/website?retryWrites=true&w=majority&appName=blogWebsite'
mongoose.connect(DB_URL)
    .then(()=>{app.listen(3000)})
    .catch(()=>{console.log('rejected')})


app.get('/', (req, res)=>{
    res.redirect('/blogs')
})

app.get('/blogs', (rep, res) =>{
    Blog.find().sort({createdid : -1})
    .then((result) =>{
        res.render('index', {title : 'blog', blogs : result})
        } )
        .catch((err)=>console.log(err))
})

app.post('/blogs', (req, res)=>{
    const blog = new Blog(req.body)
    blog.save()
    .then((result)=>{
        res.redirect('/blogs')
    })
    .catch((err)=>console.log(err))
})

app.get('/blogs/create', (rep, res) =>{
    res.render('create', {title : 'create'})
})

app.get('/about', (rep, res) =>{
    res.render('about', {title : 'about'})
})

app.use( (rep, res) =>{
    res.status(404).render('404', {title : 'create'})
})
