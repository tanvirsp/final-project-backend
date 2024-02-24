const mongoose = require('mongoose');

const DataScheme = mongoose.Schema({
    name: {type: String, required: true, unique: true},
    des: {type: String },
    image: {type: String}



}, {timestamps:true,versionKey:false});


const CategoryModel=mongoose.model('categories', DataScheme)
module.exports=CategoryModel