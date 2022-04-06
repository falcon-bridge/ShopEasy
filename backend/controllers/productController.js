const Product = require("../models/productModel");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const ApiFeatures = require("../utils/apiFeatures");

//get all products

exports.getAllProducts = catchAsyncErrors(async (req, res) => {
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();

  const products = await apiFeature.query;

  res.status(200).json({
    success: true,
    products,
  });
});

//get product details

exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    // return res.status(500).json({
    //   success: false,
    //   message: "Product not found",
    // });
    return next(new ErrorHandler("Product not found", 404)); //you can consider this an error like we plain old Error object just with some added functionalities pf passing some info alog with it, so this error will be caught by err in middleware
  }

  res.status(200).json({
    success: true,
    product,
  });
});

//Create product -- admin

exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

//updating a product -- admin

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = Product.findById(req.params.id);

  // if (!product) {
  //   return res.status(500).json({
  //     success: false,
  //     message: "Product no found",
  //   });
  // }

  if (!product) {
    return next(new ErrorHandler("Product not found", 404)); //you can consider this an error like we plain old Error object just with some added functionalities pf passing some info alog with it, so this error will be caught by err in middleware
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

// Delete a product -- admin

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  // if (!product) {
  //   return res.status(500).json({
  //     success: false,
  //     message: "Product not found",
  //   });
  // }

  if (!product) {
    return next(new ErrorHandler("Product not found", 404)); //you can consider this an error like we plain old Error object just with some added functionalities pf passing some info alog with it, so this error will be caught by err in middleware
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});
