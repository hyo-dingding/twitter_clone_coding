import MongoDB from "mongodb";
import { config } from "../config.js";

let db;
// db에 연결하는 connectㅇ
export async function connectDB() {
    return MongoDB.MongoClient.connect(config.db.host) //
        .then((client) => {
            db = client.db();
        });
}

// 사용자에 대한 컬렉션 전달
export function getUsers() {
    return db.collection("users");
}

// tweet에 대한 컬렉션으 전달
export function getTweets() {
    return db.collection("tweets");
}
