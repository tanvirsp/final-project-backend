const { AddCategoryService, CategoriesService } = require("../services/CategoryService")



exports.AddCategory = async(req, res) =>{
    const result = await AddCategoryService(req)
    return res.status(200).json(result)
}
exports.Categories = async(req, res) =>{
    const result = await CategoriesService(req)
    return res.status(200).json(result)
}
