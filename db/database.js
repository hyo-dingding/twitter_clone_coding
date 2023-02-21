import { config } from "../config.js";
import Sequelize from "sequelize";

// import mysql from "mysql2";

const { host, user, database, password } = config.db;
export const sequelize = new Sequelize(database, user, password, {
    host,
    dialect: "mysql",
    // logging: false,
});
// console.log(sequelize);
// mysql에 접속하기
// const pool = mysql.createPool({
//     host,
//     user,
//     database,
//     password,
// });

// export const db = pool.promise();
