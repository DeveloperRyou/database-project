import fs from "fs";
import mysql from "mysql2/promise";

const querySql = async (filename) => {
  const sqlList = fs.readFileSync(filename).toString().split(";\n");
  const connection = await mysql.createConnection({
    host: "localhost",
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
  });
  for (const sql of sqlList) {
    for (const c of sql) {
      if (c === "\n") {
        sql.replace(c, "");
      }
    }
    if (sql !== "") await connection.query(sql);
  }
  await connection.end();
};

const initDb = async () => {
  await querySql("./drop-db.sql");
  await querySql("./init-db.sql");
};

initDb();
