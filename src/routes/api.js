const express = require('express');
const router = express.Router();

const UserController = require("../controllers/UserController");
const ProductController = require("../controllers/ProductController");
const CategoryController = require("../controllers/CategoryController");
const BrandController = require("../controllers/BrandController");


const AuthVerification = require('../middleware/AuthVerification');




//Product Route
router.post("/product", AuthVerification, ProductController.AddProduct );
router.get("/products", ProductController.AllProducts );
router.get("/product-details/:id", ProductController.ProductDetails );
router.post("/update-product/:id", AuthVerification, ProductController.UpdateProduct );
router.delete("/product/:id", AuthVerification, ProductController.DeleteProduct );
router.post("/product-by-filter", ProductController.FilterProduct );
router.get("/search/:keyword", ProductController.SearchProduct );



//Category Route
router.post("/addCategory",AuthVerification, CategoryController.AddCategory );
router.get("/categories", CategoryController.Categories );

//Brand Route
router.post("/addBrand",AuthVerification, BrandController.AddBrand);
router.get("/brands", BrandController.Brands);




//User Route
router.post("/register", UserController.RegisterUser );
router.get("/verify-otp/:email/:otp", UserController.VerifyOTP );
router.post("/login", UserController.Login );
router.get("/logout", UserController.Logout )

router.get("/sendOtp/:email", UserController.SendOtp )
router.post("/reset-password", UserController.ResetPassword );
router.post("/change-password", AuthVerification, UserController.ChangePassword );



router.get("/profile", AuthVerification, UserController.Profile )
router.post("/profile", AuthVerification, UserController.ProfileUpdate )







module.exports = router;