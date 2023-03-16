import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../db/database.js";
import Mongoose from "mongoose";

const userSchema = new Mongoose.Schema({
    username: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    url: String,
});
export const User = sequelize.define(
    "user",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        url: DataTypes.TEXT,
    },
    { timestamps: false }
);

export async function findByUsername(username) {
    return User.findOne({ where: { username } });

    // (
    //     db.execute("SELECT * FROM users WHERE username=?", [username]) / //
    //     then((result) => {
    //         console.log(result);
    //         return result[0][0];
    //     })
    // );

    // return users.find((user) => user.username === username);
}

export async function findById(id) {
    return User.findByPk(id);

    // (
    //     db.execute("SELECT * FROM users WHERE id=?", [id]) / //
    //     then((result) => {
    //         console.log(result);
    //         return result[0][0];
    //     })
    // );
    // return users.find((user) => user.id === id);
}

export async function createUser(user) {
    return User.create(user).then((data) => {
        return data.dataValues.id;
    });

    // const { username, password, name, email, url } = user;
    // return db
    //     .execute("INSERT INTO users (username, password, name, email, url) VALUES (?,?,?,?,?)", [username, password, name, email, url])

    //     .then((result) => {
    //         console.log("&&", result[0].insertId);
    //         return result[0].insertId;
    //     });

    // const created = { ...user, id: new Date().toString() };
    // users.push(created);
    // console.log("ddd", created);
    // return created.id;
}
