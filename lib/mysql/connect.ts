import { Connection } from "mysql2/promise";
import mysql from "mysql2/promise";
let connection: Connection | null = null;
export default async function connect() {
  if (connection === null)
    connection = await mysql.createConnection({
      user: process.env.DBUSER,
      password: process.env.DBPASSWORD,
      database: process.env.DATABASE,
    });
  return connection;
}
