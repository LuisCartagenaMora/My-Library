import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import path from "path";

import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";

import { getCoverURL } from "./utils/getCoverURL.js";

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));

app.use(authRoutes);
app.use(bookRoutes);

const isbnNumbers = [
  "9780590353427", // Harry Potter and the Sorcerer's Stone
  "9780439023481", // The Hunger Games
  "9780307744432", // The Night Circus
  "9780735219106", // Where the Crawdads Sing
  "9781476738024", // A Man Called Ove
  "9780375842207", // The Book Thief
  "9780156027328", // Life of Pi
  "9781524763138", // Becoming
  "9780399590504", // Educated
  "9780062316097", // Sapiens: A Brief History of Humankind
  "9781400052189", // The Immortal Life of Henrietta Lacks
  "9780399588198", // Born a Crime
  "9780307352156", // Quiet: The Power of Introverts
  "9780316017930", // Outliers: The Story of Success
  "9780316346627", // The Tipping Point
  "9781451648539", // Steve Jobs
  "9780374533557", // Thinking, Fast and Slow
  "9780743273565", // "The Great Gatsby" by F. Scott Fitzgerald (2004 edition)
  "9780385490818", // "Angela's Ashes" by Frank McCourt (1996)
  "9780307277671", // "The Road" by Cormac McCarthy (2006)
  "9780307387899", // "The Road" by Cormac McCarthy (2006)
  "9780385721677", // "Life of Pi" by Yann Martel (2001)
  "9781400032716", // "The Kite Runner" by Khaled Hosseini (2003)
  "9781594480003", // "The Kite Runner" by Khaled Hosseini (2003)
  "9781594483851", // "A Thousand Splendid Suns" by Khaled Hosseini (2007)
  "9780439023481", // "The Hunger Games" by Suzanne Collins (2008)
  "9780439023528", // "Catching Fire" by Suzanne Collins (2009)
  "9780439023511", // "Mockingjay" by Suzanne Collins (2010)
  "9780307588371", // "Gone Girl" by Gillian Flynn (2012)
  "9780062315007", // "The Alchemist" by Paulo Coelho (1993)
  "9780061122415", // "The Alchemist" by Paulo Coelho (1993)
  "9780060838676", // "The Secret" by Rhonda Byrne (2006)
  "9780061964367", // "The Secret" by Rhonda Byrne (2006)
  "9780062316110", // "The Power of Now" by Eckhart Tolle (1997)
  "978-0307387899", // The Road
  "9781594480003", // The Kite Runner
  "9781594483851", // A Thousand Splendid Suns
];

app.get("/", (req, res) => {
  let x = [];
  for (let num of isbnNumbers) {
    x.push(getCoverURL(num));
  }
  let splitList = x.splice(x.length / 2);
  res.render("home.ejs", { books1: splitList, books2: x });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
