const mongoose = require("mongoose");
const ObjectID= mongoose.Types.ObjectId;

const ProductModel = require("../models/ProductModel");

exports.AddProductService = async(req) =>{
    try {
        const reqBody = req.body;
        const data = await ProductModel.create(reqBody);
        
        return {status:"success", data: data}
    } catch (error) {
        return {status:"fail",data:error.toString()}
    }

};


exports.AllProductsService = async(req) =>{
    try {
        const matchingStage = {$match: {}};
        const joinBrand = { $lookup: { from: "brands", localField: "brandID", foreignField: "_id", as: "brand" }};
        const unwindBrand= { $unwind:"$brand" };

        const joinCategory = { $lookup: { from: "categories", localField: "categoryID", foreignField: "_id", as: "category" }};
        const unwindCategory= { $unwind:"$category" };
        
        const sortStage = { $sort: { createdAt : -1}};
        const projectStage = {
            $project: {"brand._id": 0, "brand.createdAt": 0,"brand.updatedAt": 0,"brand.des": 0, 
                        "category._id": 0, "category.createdAt": 0,"category.updatedAt": 0,"category.des": 0,
            }}

        


        const data = await ProductModel.aggregate([
            matchingStage,
            joinBrand, unwindBrand,
            joinCategory, unwindCategory,
            sortStage,
            projectStage

        ]); 
        return {status:"success", data: data}
    
    } catch (error) {
        return {status:"fail",data:error.toString()}
    }

};



exports.FilterProductService = async(req) =>{
    try {

       let matchCondition = {};

       if(req.body["brandID"]){
        matchCondition.brandID = new ObjectID(req.body["brandID"]);
       }

       if(req.body["categoryID"]){
        matchCondition.categoryID = new ObjectID(req.body["categoryID"]);
       }

       const MatchStage = {$match: matchCondition};
       const joinBrand = { $lookup: { from: "brands", localField: "brandID", foreignField: "_id", as: "brand" }};
       const unwindBrand= { $unwind:"$brand" };

       const joinCategory = { $lookup: { from: "categories", localField: "categoryID", foreignField: "_id", as: "category" }};
       const unwindCategory= { $unwind:"$category" };
       
       const sortStage = { $sort: { createdAt : -1}};
       const projectStage = {
            $project: {"brand._id": 0, "brand.createdAt": 0,"brand.updatedAt": 0,"brand.des": 0, 
                        "category._id": 0, "category.createdAt": 0,"category.updatedAt": 0,"category.des": 0,
            }}


        const data = await ProductModel.aggregate([
            MatchStage,
            joinBrand, unwindBrand,
            joinCategory, unwindCategory,
            sortStage,
            projectStage
        ])

       return {status:"success", data:data}
        
    } catch (error) {
        return {status:"fail",data:error.toString()}
    }
}



exports.SearchProductService = async(req) =>{
    try {

        const SearchRegex = { "$regex": req.params.keyword, "$options": 'i' } ;
        const SearchQuery = {name: SearchRegex};
        const MatchStage = {$match: SearchQuery}

       const joinBrand = { $lookup: { from: "brands", localField: "brandID", foreignField: "_id", as: "brand" }};
       const unwindBrand= { $unwind:"$brand" };

       const joinCategory = { $lookup: { from: "categories", localField: "categoryID", foreignField: "_id", as: "category" }};
       const unwindCategory= { $unwind:"$category" };
       
       const sortStage = { $sort: { createdAt : -1}};

       const projectStage = {
            $project: {"brand._id": 0, "brand.createdAt": 0,"brand.updatedAt": 0,"brand.des": 0, 
                        "category._id": 0, "category.createdAt": 0,"category.updatedAt": 0,"category.des": 0,
            }}


        const data = await ProductModel.aggregate([
            MatchStage,
            joinBrand, unwindBrand,
            joinCategory, unwindCategory,
            sortStage,
            projectStage
        ])




       return {status:"success", data:data}
        
    } catch (error) {
        return {status:"fail",data:error.toString()}
    }
}




exports.UpdateProductService = async(req) =>{

    try {
        const productId = new ObjectID(req.params.id)
        const reqBody = req.body;
        const data = await ProductModel.updateOne({_id: productId}, {$set: reqBody});
    
        return {status:"success", data: data}
    
    } catch (error) {
        return {status:"fail",data:error.toString()}
    }

};



exports.DeleteProductService = async(req) =>{

    try {
        const productId = new ObjectID(req.params.id)
        
        const data = await ProductModel.deleteOne({_id: productId});
    
        return {status:"success", data: data}
    
    } catch (error) {
        return {status:"fail",data:error.toString()}
    }

}




exports.ProductDetailsService = async(req) =>{

    try {
        const productId = new ObjectID(req.params.id)
        
        const matchingStage = { $match: {_id: productId}};  
        const JoinBrandStage = {$lookup: {from: "brands", localField: "brandID", foreignField: "_id", as: "brand"}}
        const UnwindBrandStage ={$unwind: "$brand"};

        const JoinCategoryStage = {$lookup: {from: "categories", localField: "categoryID", foreignField: "_id", as: "category"}}
        const UnwindCategoryStage ={$unwind: "$category"}
  
  


        const data = await ProductModel.aggregate([
            matchingStage,
            JoinBrandStage, UnwindBrandStage,
            JoinCategoryStage, UnwindCategoryStage
        ]);
    
        return {status:"success", data: data}
    
    } catch (error) {
        return {status:"fail",data:error.toString()}
    }

}



