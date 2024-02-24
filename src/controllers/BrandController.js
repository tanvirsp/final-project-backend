const { AddBrandService, BrandsService } = require("../services/BrandService")

exports.AddBrand = async(req, res) =>{
    const result = await AddBrandService(req)
    return res.status(200).json(result)
}


exports.Brands = async(req, res) =>{
    const result = await BrandsService(req)
    return res.status(200).json(result)
}
