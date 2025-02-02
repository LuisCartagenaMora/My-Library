import db from "../models/db.js";
import bcrypt from "bcryptjs";

export let currentUser = {
  fullName: "",
  email: "",
};

const saltRounds = 5;

export const registerUser = async (req, res) => {
  const user = req.body;
  const existingUser = await db.query("SELECT * FROM users WHERE email = $1", [
    user.email,
  ]);

  if (existingUser.rows.length > 0) {
    console.log("This email is already registered. Please log in.");
    return res.redirect("/");
  }

  const hashedPassword = await bcrypt.hash(user.password, saltRounds);
  await db.query(
    "INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4)",
    [user.firstname, user.lastname, user.email, hashedPassword]
  );
  console.log("User registered. Please log in.");
  res.redirect("/");
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const result = await db.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  if (result.rows.length === 0) {
    console.log("User not found. Please register.");
    return res.redirect("/");
  }

  const user = result.rows[0];
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    console.log("Incorrect password. Please try again.");
    return res.redirect("/");
  }

  currentUser.email = user.email;
  currentUser.fullName = `${user.firstname} ${user.lastname}`;
  console.log("Login successful. Welcome back!");
  res.redirect("/library");
};

export const logoutUser = (req, res) => {
  console.log("Logout successful. See you next time!");
  res.redirect("/");
};
