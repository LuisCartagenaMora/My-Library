import express from "express";
import {
  getBooks,
  getAddBook,
  postAddBook,
  postDeleteBook,
  getUpdateBook,
  postUpdateBook,
  filterBook,
} from "../controllers/bookController.js";

const router = express.Router();

router.get("/library", getBooks);
router.get("/filter", filterBook);
router.get("/add-book", getAddBook);
router.get("/update-book", getUpdateBook);
router.post("/add-book", postAddBook);
router.post("/delete-book", postDeleteBook);
router.post("/update-book", postUpdateBook);

export default router;
