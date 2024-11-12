const express = require('express')
const mongoose = require('mongoose')
const blogRouter = require('./routes/blogs')

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

app.use('/blogs', blogRouter)


app.get('/about', (rep, res) =>{
    res.render('about', {title : 'about'})
})

app.use( (rep, res) =>{
    res.status(404).render('404', {title : 'create'})
})
