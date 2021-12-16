import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const mysqlConnection = mysql.createConnection({
  host: process.env.MYSQL_DB_HOST,
  user: process.env.MYSQL_DB_USER,
  password: process.env.MYSQL_DB_PASS,
  port: process.env.MYSQL_DB_PORT,
  database: process.env.MYSQL_DB_NAME,
});
mysqlConnection.connect();

const callToMysql = (qry) => {
  return new Promise((resolve, reject) => {
    mysqlConnection.query(qry, function (error, results, fields) {
      if (error) reject(error);
      resolve(results);
    });
  });
};

export default {
  callToMysql,
};
