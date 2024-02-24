const CategoryModel = require("../models/CategoryModel");

exports.AddCategoryService = async(req) =>{
    try {
        const reqBody = req.body;
        const data = await CategoryModel.create(reqBody);
        
        return {status:"success", data: data}
    } catch (error) {
        return {status:"fail",data:error.toString()}
    }

};


exports.CategoriesService = async(req) =>{

    try {
        const data = await CategoryModel.find();
        return {status:"success", data: data}


    } catch (error) {
        return {status:"fail",data:error.toString()}
    }
}