// abcd1234 = $2b$10$jvRhVWzdM1EN4/say9DJ..H2dkWy8AtCCnjg842rs9xsJ9T5m/koq

let users = [
    {
        id: "1",
        username: "bob",
        password: "$2b$10$jvRhVWzdM1EN4/say9DJ..H2dkWy8AtCCnjg842rs9xsJ9T5m/koq",
        name: "Bob",
        email: "bob@gmail.com",
        // url: "",
    },
];

export function findByUsername(username) {
    return users.find((user) => user.username === username);
}

export function createUser(user) {
    const created = { ...user, id: Date.now().toString() };
    users.push(created);

    return created.id;
}
