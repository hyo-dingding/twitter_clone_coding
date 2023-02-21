import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../db/database.js";
import { User } from "./auth.js";

const Tweet = sequelize.define("tweet", {
    id: {
        type: DataTypes.INTEGER,
        autoINcrement: true,
        allowNull: false,
        primaryKey: true,
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
});
Tweet.belongsTo(User); // tweet은 user에 종속되어있다.

// const SELECT_JOIN = "SELECT tw.id, tw.text, tw.userId, tw.createdAt, us.username, us.name FROM tweets as tw JOIN users as us ON tw.useId=us.id";
// const ORDER_DESC = "ORDER BY tw.createdAt DESC";

const INCLUDE_USER = {
    attributes: [
        "id",
        "text",
        "createAt",
        "userId",
        [Sequelize.col("user.name"), "name"],
        [Sequelize.col("user.username"), "username"],
        [Sequelize.col("user.url"), "url"],
    ],
    include: {
        model: User,
        attributes: [],
    },
};

const ORDER_DESC = {
    order: [["createAt", "DESC"]],
};

export async function getAll() {
    return Tweet.findAll({ ...INCLUDE_USER, ...ORDER_DESC }).then((data) => {
        console.log(data);
        return data;
    });

    // return db
    //     .execute(`${SELECT_JOIN} ${ORDER_DESC}`) //
    //     .then((result) => {
    //         console.log(result[0]);
    //         result[0];
    //     });

    // return Promise.all(
    //     tweets.map(async (tweet) => {
    //         const { username, name, url } = await userRepository.findById(tweet.userId);
    //         return {
    //             ...tweet,
    //             username,
    //             name,
    //             url,
    //         };
    //     })
    // );
}
export async function getAllByUsername(username) {
    return Tweet.findAll({
        ...INCLUDE_USER,
        ...ORDER_DESC,
        include: {
            ...INCLUDE_USER.include,
            where: { username },
        },
    });
    // db
    //     .execute(`${SELECT_JOIN} WHERE username=? ${ORDER_DESC}`, [username]) //
    //     .then((result) => {
    //         console.log(result[0]);
    //         result[0];
    //     });

    // return getAll().then((tweets) => tweets.filter((tweet) => tweet.username === username));
}

export async function getById(id) {
    return Tweet.findOne({ where: { id } }, ...INCLUDE_USER);

    // db
    //     .execute(`${SELECT_JOIN} WHERE tw.id=?`, [id]) //
    //     .then((result) => {
    //         console.log(result[0][0]);
    //         result[0][0];
    //     });

    // const found = tweets.find((tweet) => tweet.id === id);
    // if (!found) {
    //     return null;
    // }
    // const { username, name, url } = await userRepository.findById(found.userId);
    // return {
    //     ...found,
    //     username,
    //     name,
    //     url,
    // };
}

export async function create(text, userId) {
    return Tweet.create({ text, userId }).then((data) => {
        this.getBiyId(data.dataValues.id);
    });

    // return db
    //     .execute(
    //         "INSERT INTO tweets (text, createdAt, userId) VALUES(?,?,?)", //
    //         [text, new Date(), userId]
    //     )
    //     .then((result) => {
    //         console.log(getById(result[0].insertId));
    //         getById(result[0].insertId);
    //     });

    // const tweet = {
    //     id: Date.now().toString(),
    //     text,
    //     createdAt: new Date(),
    //     userId,
    // };
    // tweets = [tweet, ...tweets];
    // return getById(tweet.id);
}

export async function update(id, text) {
    return Tweet.findByPk(id, INCLUDE_USER) //
        .then((tweet) => {
            tweet.text = text;
            return tweet.save(); // promise로 반환됨
        });
    // db
    //     .execute("UPDATE tweets SET text=? WHERE id=?", [text, id]) //
    //     .then(() => getById(id));

    // const tweet = tweets.find((tweet) => tweet.id === id);
    // if (tweet) {
    //     tweet.text = text;
    // }
    // return getById(tweet.id);
}
export async function remove(id) {
    return Tweet.findByPk(id) //
        .then((tweet) => {
            tweet.destroy();
        });

    // db.execute("DELETE FROM tweets WHERE id=?", [id]);

    // return (tweets = tweets.filter((tweet) => tweet.id !== id));
}
