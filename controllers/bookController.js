import db from "../models/db.js";
import { currentUser } from "./authController.js";
import { getCoverURL } from "../utils/getCoverURL.js";
import { allInfo } from "../utils/allInfo.js";

let state = [{ title: true }, { rating: true }, { date: true }];

export const getBooks = async (req, res) => {
  const result = await db.query("SELECT * FROM book WHERE email = $1", [
    currentUser.email,
  ]);
  res.render("index.ejs", {
    name: currentUser.fullName,
    books: result.rows,
  });
};

export const getAddBook = (req, res) => {
  res.render("../views/add-book.ejs");
};

export const getUpdateBook = async (req, res) => {
  const bookId = req.query.update;
  const result = await allInfo();
  const selectedBook = result.rows.filter((x) => {
    return x.id === parseInt(bookId);
  });
  res.render("../views/update-book.ejs", { books: selectedBook });
};

export const postAddBook = async (req, res) => {
  const book = req.body;
  console.log(req.body.user);
  await db.query(
    "INSERT INTO book (title, date, rating, note, link, isbn, cover, email) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
    [
      book.title,
      book.date,
      book.rating,
      book.note,
      book.link,
      book.isbn,
      getCoverURL(book.isbn),
      currentUser.email,
    ]
  );
  res.redirect("/library");
};

export const postDeleteBook = async (req, res) => {
  await db.query("DELETE FROM book WHERE id = $1", [req.body.delete]);
  res.redirect("/library");
};

export const postUpdateBook = async (req, res) => {
  const book = req.body;
  await db.query(
    `UPDATE book SET title = $1, isbn = $2, date = $3, rating = $4, note = $5, link = $6 WHERE id = $7`,
    [
      book.title,
      book.isbn,
      book.date,
      book.rating,
      book.note,
      book.link,
      book.id,
    ]
  );
  res.redirect("/library");
};

export const filterBook = async (req, res) => {
  const type = req.query.type;
  switch (type) {
    //Case 1: Sort by title
    case "title":
      if (state.type) {
        let result = await db.query(
          "SELECT * FROM book WHERE email = $1 ORDER BY title ASC",
          [currentUser.email]
        );
        res.render("index.ejs", {
          books: result.rows,
          name: currentUser.fullName,
        });
        state.type = false;
        break;
      } else {
        let result = await db.query(
          "SELECT * FROM book WHERE email = $1 ORDER BY title DESC",
          [currentUser.email]
        );
        res.render("index.ejs", {
          books: result.rows,
          name: currentUser.fullName,
        });
        state.type = true;
        break;
      }

    //Case 2: Sort by rating
    case "rating":
      if (state.type) {
        let result = await db.query(
          "SELECT * FROM book WHERE email = $1 ORDER BY rating ASC",
          [currentUser.email]
        );
        res.render("index.ejs", {
          books: result.rows,
          name: currentUser.fullName,
        });
        state.type = false;
        break;
      } else {
        let result = await db.query(
          "SELECT * FROM book WHERE email = $1 ORDER BY rating DESC",
          [currentUser.email]
        );
        res.render("index.ejs", {
          books: result.rows,
          name: currentUser.fullName,
        });
        state.type = true;
        break;
      }

    //Case 3: Sort by date
    case "date":
      if (state.type) {
        let result = await db.query(
          "SELECT * FROM book WHERE email = $1 ORDER BY date ASC",
          [currentUser.email]
        );
        res.render("index.ejs", {
          books: result.rows,
          name: currentUser.fullName,
        });
        state.type = false;
        break;
      } else {
        let result = await db.query(
          "SELECT * FROM book WHERE email = $1 ORDER BY date DESC",
          [currentUser.email]
        );
        res.render("index.ejs", {
          books: result.rows,
          name: currentUser.fullName,
        });
        state.type = true;
        break;
      }
  }
};
