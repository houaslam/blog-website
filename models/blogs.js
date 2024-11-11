const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let bloagSchema = new Schema( {
	title : {
		type : String,
		required : true
	},
	snippet : {
		type : String,
		required : true
	},
	body : {
		type : String,
		required : true
	}
} , {timestamps : true})

const Blog = mongoose.model('Blog', bloagSchema)

module.exports = Blog 