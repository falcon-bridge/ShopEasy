const User = require("../models/userModel");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

//Register a user

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "this is a sample ID",
      url: "profilePicUrl",
    },
  });

  const token = user.getJwtToken();

  res.status(201).json({
    success: "true",
    token,
  });
});

//Login user

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  //checking if user has given both email and password
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email & password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const token = user.getJwtToken();

  res.status(200).json({
    success: "true",
    token,
  });
});
