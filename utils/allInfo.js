import db from "../models/db.js";

export const allInfo = async function () {
  return await db.query("SELECT * FROM book ORDER BY title ASC");
};
