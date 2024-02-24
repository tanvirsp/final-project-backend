const mongoose = require('mongoose');

const DataScheme = mongoose.Schema({
    name: {type: String, required: true},
    des: {type: String },
    image: {type: String}



}, {timestamps:true,versionKey:false});


const BrandModel=mongoose.model('brands', DataScheme)
module.exports=BrandModel