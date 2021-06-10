const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// const saltRounds = 10;

const db = {
  users: [
    {
      id: "123",
      name: "John",
      email: "john@gmail.com",
      password: "cookies",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "124",
      name: "Sally",
      email: "sally@gmail.com",
      password: "bananas",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "125",
      name: "Ivek",
      email: "ivek@gmail.com",
      password: "klokani",
      entries: 0,
      joined: new Date(),
    },
  ],
};

app.get("/", (req, res) => {
  res.json(db.users);
});

app.post("/signin", (req, res) => {
  let currentUser = [];

  for (const user of db.users) {
    if (req.body.email === user.email && req.body.password === user.password) {
      currentUser.push(user);
    }
  }

  if (currentUser.length !== 0) {
    res.json("success");
  } else {
    res.status(404).json({ status: 404, messages: "user not found!" });
  }
});

app.post("/register", (req, res) => {
  const { email, name, password } = req.body;

  db.users.push({
    id: id++,
    name,
    email,
    password,
    entries: 0,
    joined: new Date(),
  });

  res.json("success");
});

app.get("/profile/:id", (req, res) => {
  const currentUser = [];

  for (const user of db.users) {
    if (req.params.id === user.id) {
      currentUser.push(user);
    }
  }

  if (currentUser.length !== 0) {
    res.json(currentUser);
  } else {
    res.status(404).json({ status: 404, messages: "user not found!" });
  }
});

app.put("/image", (req, res) => {
  for (const user of db.users) {
    if (req.body.id === user.id) {
      user.entries++;
      return res.json(db.users);
    }
  }

  res.json("error");
});

const PORT = 5000;

app.listen(PORT, () => console.log(`The server is running on PORT: ${PORT}`));
