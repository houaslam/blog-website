const express = require('express')
const mongoose = require('mongoose')
const Blog = require('./models/blogs')

const app = express()
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended : true}))


const DB_URL = 'mongodb+srv://hajar:1234@blogwebsite.u6jjb.mongodb.net/website?retryWrites=true&w=majority&appName=blogWebsite'
mongoose.connect(DB_URL)
    .then(()=>app.listen(3000))
    .catch(()=>console.log('rejected'))


app.get('/', (req, res)=>{
    res.redirect('/blogs')
})

app.get('/blogs', (rep, res) =>{
    Blog.find().sort({createdId : -1})
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
    console.log('tehete')
    res.render('create', {title : 'create'})
})

app.get('/blogs/:id', (req, res)=>{
    const id = req.params.id
    Blog.findById(id)
        .then(result=>{
            res.render('details', {title : 'details', blog : result})
        })
    .catch((err)=>console.log(err))

})


app.delete('/blogs/:id', (req, res)=>{
    const id = req.params.id
    Blog.findByIdAndDelete(id)
        .then(()=>{
            res.json({redirect : '/blogs'})
        })
    .catch((err)=>console.log(err))
})




app.get('/about', (rep, res) =>{
    res.render('about', {title : 'about'})
})

app.use( (rep, res) =>{
    res.status(404).render('404', {title : 'create'})
})
