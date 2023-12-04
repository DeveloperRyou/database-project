import fs from "fs";
import mysql from "mysql2/promise";

const initDb = async () => {
  const sqlList = fs.readFileSync("./init-db.sql").toString().split(";\n");
  const connection = await mysql.createConnection({
    host: "localhost",
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
  });
  for (const sql of sqlList) if (sql !== "") await connection.query(sql);
  await connection.end();
};

initDb();
