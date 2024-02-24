const mongoose = require('mongoose');
const DataScheme = mongoose.Schema({
    name: {type: String, required: true},
    brandID: {type: mongoose.Schema.Types.ObjectId, required: true },
    categoryID: {type: mongoose.Schema.Types.ObjectId, required: true },
    des: {type: String, required: true},
    image: {type: String, required: true}



}, {timestamps:true,versionKey:false});



const ProductModel=mongoose.model('products', DataScheme)
module.exports=ProductModel