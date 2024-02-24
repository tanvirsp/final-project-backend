const { AddProductService, AllProductsService, UpdateProductService, DeleteProductService, ProductDetailsService, FilterProductService, SearchProductService } = require("../services/ProductService")

exports.AddProduct = async(req, res) =>{
    const result = await AddProductService(req)
    return res.status(200).json(result)
}


exports.AllProducts = async(req, res) =>{
    const result = await AllProductsService(req)
    return res.status(200).json(result)
}



exports.UpdateProduct = async(req, res) =>{
    const result = await UpdateProductService(req)
    return res.status(200).json(result)
}

exports.DeleteProduct = async(req, res) =>{
    const result = await DeleteProductService(req)
    return res.status(200).json(result)
}


exports.ProductDetails = async(req, res) =>{
    const result = await ProductDetailsService(req)
    return res.status(200).json(result)
}

exports.FilterProduct = async(req, res) =>{
    const result = await FilterProductService(req)
    return res.status(200).json(result)
}

exports.SearchProduct = async(req, res) =>{
    const result = await SearchProductService(req)
    return res.status(200).json(result)
}
