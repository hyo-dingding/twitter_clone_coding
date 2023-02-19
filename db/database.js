import { config } from "../config.js";
import mysql from "mysql2";

// mysql에 접속하기
const pool = mysql.createPool({
    host: config.db.host,
    user: config.db.user,
    database: config.db.database,
    password: config.db.password,
});

export const db = pool.promise();
