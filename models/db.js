import pg from "pg";

const db = new pg.Client({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  connectionTimeoutMillis: 10000, // 10 seconds
});

db.connect().then(console.log("Connected to database")).catch(console.error);

export default db;
