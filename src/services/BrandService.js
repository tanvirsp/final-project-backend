const BrandModel = require("../models/BrandModel");

exports.AddBrandService = async(req) =>{
    try {
        const reqBody = req.body;
        const data = await BrandModel.create(reqBody);
        
        return {status:"success", data: data}
    } catch (error) {
        return {status:"fail",data:error.toString()}
    }

}

exports.BrandsService = async(req) =>{

    try {
        const data = await BrandModel.find();
        return {status:"success", data: data}


    } catch (error) {
        return {status:"fail",data:error.toString()}
    }
}