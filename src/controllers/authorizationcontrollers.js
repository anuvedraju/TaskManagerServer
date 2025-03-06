const User = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ username, password, email });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user", error });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Incorrect password" });
    }


    // Generate Access Token (short-lived)
    const accessToken = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.TOKEN_EXPIRATION }
    );

    // Omit password before sending user data
    const userWithoutPassword = { ...user.toObject() };
    delete userWithoutPassword.password;

    res.status(200).json({
      message: "Login successful",
      accessToken,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging in", error });
  }
};

exports.changeUserProfileDetails = async (req, res) => {
  const { type, value, userId } = req.body;

  console.log("dataaaaaaaa", req.body);

  // Validate required fields
  if (!type || !value || !userId) {
    return res
      .status(400)
      .json({ message: "Type, value, and userId are required" });
  }

  try {
    const validTypes = ["username", "email", "profilePicture", "all", "user"];

    // Validate type
    if (!validTypes.includes(type)) {
      return res.status(400).json({ message: "Invalid type provided" });
    }

    // Handle email-specific validations
    if (type === "email") {
      const existingUser = await User.findOne({ email: value.email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
      }
    }

    // Update the user detail based on type
    const updatedUser = await User.findOneAndUpdate(
      { userId: userId }, // Find by userId field
      {
        ...(value.email && { email: value.email }), // Update email if provided
        ...(value.username && { username: value.username }), // Update username if provided
        ...(value.profilePicture && { profilePicture: value.profilePicture }), // Update profilePicture if provided
      },
      { new: true, runValidators: true } // Return the updated document and run validators
    );

    // If user not found
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Successful update
    res.status(200).json({
      message: `${type} updated successfully`,
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user details:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};