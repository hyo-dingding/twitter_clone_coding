import express from "express";
import "express-async-errors";
import cors from "cors";
import morgan from "morgan"; // 디버깅
import helmet from "helmet"; // 보안

import tweetsRouter from "./router/tweets.js";
import authRouter from "./router/auth.js";
import { config } from "./config.js";
import { initSocket } from "./connection/socket.js";
// import { db } from "./db/database.js";
import { sequelize } from "./db/database.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.use(helmet());

app.use("/tweets", tweetsRouter);
app.use("/auth", authRouter);

app.use((req, res, next) => {
    res.sendStatus(404); // not found 지원하지 않는 API일 때
});

// 에러처리
app.use((error, req, res, next) => {
    console.error(error);
    console.log(500);
});

sequelize.sync().then(() => {
    // console.log(client))

    const server = app.listen(config.host.post);
    initSocket(server);
});
