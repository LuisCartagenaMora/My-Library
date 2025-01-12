My Library, a personal project created by Luis G. Cartagena Mora.
Version 1.0 - 01/08/2025

---

WHAT DOES IT DO?

---

My Library is a simple web application to store books you've read.

First create an account by providing your first and last name, email, and your password. Afterwards, login and you will be taken to your own page (no one has acces to this page other than you.).

Start by adding a book and while your list grows you can filter the books by title, rating, and date read. You may also update or delete each entry. View the books you've read and w

---

TECHNOLOGIES

---

While this project started as a 'capstone' project from a udemy course, I enjoyed what had been done as per the course requirements but decided to keep working on it and decided to style it as best as I could with some css, implement more routes, user authentication via salting and hashing the user's password, store the user's credentials and their books in a postgres database, created basic CRUD operations.

HTML- The backbone of the projects structure.
CSS- Style and organize elements in each page.
EXPRESS JS- Created the routes for each action taken by the user in the page.
EMBEDDED JS- Allows the html to be interactive such as displaying each user's entry as its own card.
POSTGRES SQL- Stores all of the users and their respective books.

---

FUTURE FEATURES

---

1. I would like to implement error handling, for example, to let the user know whether the password is incorrect instead of simply refreshing the whole page in order to clear the input field.

2. Add another page where you can see all of the books being read by other users, without revealing them, and show a count of the people with the same book in the own collections and a median of the book rating amongst users.

3. Change the add book and update book pages to a modal that pops up when pressing either buttons.

4. If its possible, add unit tests for the CRUD operations.
