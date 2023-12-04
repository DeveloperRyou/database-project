import mysql from "mysql2/promise";

export default async function connect() {
  const connection = await mysql.createConnection({
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DATABASE,
  });
  return connection;
}
