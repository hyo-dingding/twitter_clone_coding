// abcd1234 = $2b$10$jvRhVWzdM1EN4/say9DJ..H2dkWy8AtCCnjg842rs9xsJ9T5m/koq

import { db } from "../db/database.js";

// let users = [
//     {
//         id: "1",
//         username: "bob",
//         password: "$2b$10$jvRhVWzdM1EN4/say9DJ..H2dkWy8AtCCnjg842rs9xsJ9T5m/koq",
//         name: "Bob",
//         email: "bob@gmail.com",
//         // url: "",
//     },
//     {
//         id: "2",
//         username: "coc",
//         password: "$2b$10$ktkmALVtaOlh9x95eKD7zO/4CXRVWu2uaxbF.KFTsvPrNbTQIgAhK",
//         name: "Coc",
//         email: "coc@gmail.com",
//         // url: "",
//     },
// ];

export async function findByUsername(username) {
    return (
        db.execute("SELECT * FROM users WHERE username=?", [username]) / //
        then((result) => {
            console.log(result);
            return result[0][0];
        })
    );

    // return users.find((user) => user.username === username);
}

export async function findById(id) {
    return (
        db.execute("SELECT * FROM users WHERE id=?", [id]) / //
        then((result) => {
            console.log(result);
            return result[0][0];
        })
    );
    // return users.find((user) => user.id === id);
}

export async function createUser(user) {
    const { username, password, name, email, url } = user;
    return db
        .execute("INSERT INTO users (username, password, name, email, url) VALUES (?,?,?,?,?)", [username, password, name, email, url])

        .then((result) => {
            console.log("&&", result);
            return result;
        });

    // const created = { ...user, id: new Date().toString() };
    // users.push(created);
    // console.log("ddd", created);
    // return created.id;
}
