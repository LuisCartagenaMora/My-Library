import bcrypt from "bcryptjs";
import db from "../models/db.js";
import pkg from "passport";
const { session } = pkg;

const saltRounds = 5;

export let currentUser = {
  fullName: "",
  email: "",
};

export const registerUser = async (req, res) => {
  const user = req.body;
  const existingUser = await db.query("SELECT * FROM users WHERE email = $1", [
    user.email,
  ]);

  if (existingUser.rows.length > 0) {
    console.log("This email is already registered.");
    return res.redirect("/");
  }

  const hashedPassword = await bcrypt.hash(user.password, saltRounds);
  await db.query(
    "INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4)",
    [user.firstname, user.lastname, user.email, hashedPassword]
  );

  res.redirect("/");
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const result = await db.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  if (result.rows.length === 0) {
    console.log("User not found.");
    return res.redirect("/");
  }

  const user = result.rows[0];
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    console.log("Incorrect password.");

    return res.redirect("/");
  }

  currentUser.email = user.email;
  currentUser.fullName = `${user.firstname} ${user.lastname}`;

  res.redirect("/library");
};

export const logoutUser = (req, res) => {
  res.redirect("/");
};
