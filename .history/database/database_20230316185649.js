import MongoDB from "mongodb";
import { config } from "../config.js";

// 모듈안에서만 쓸 수 있는 db
let db;
// db에 연결하는 connect
export async function connectDB() {
    return MongoDB.MongoClient.connect(config.db.host) //
        .then((client) => {
            db = client.db();
        });
}

// 사용자에 대한 컬렉션 전달해주는 함수
export function getUsers() {
    return db.collection("users");
}

// tweet에 대한 컬렉션을 전달해주는 함수
export function getTweets() {
    return db.collection("tweets");
}
