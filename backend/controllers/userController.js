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
