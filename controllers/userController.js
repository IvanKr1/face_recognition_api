const User = require("../models/User");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
  try {
    let allUsers = await User.findAll();

    return res.status(200).json(allUsers);
  } catch (e) {
    console.log(e);
    res.status(500).send({
      e: "Internal server error.",
    });
  }
};

const registerUser = async (req, res) => {
  let newUser = req.body;

  try {
    await User.create({
      name: newUser.name,
      email: newUser.email,
      entries: newUser.entries,
      joined: new Date(),
      password: newUser.password,
    });

    res.json({
      status: 200,
      message: `User: ${newUser.name} successfully created!`,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      e: "Internal server error.",
    });
  }
};

const getSingleUser = async (req, res) => {
  try {
    let singleUser = await User.findAll({
      where: {
        id: req.params.id,
      },
    });

    if (singleUser.length !== 0) {
      res.status(200).json(singleUser);
    } else {
      res.status(404).json({
        message: `User with id: ${req.params.id} does not exist!`,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).send({
      e: "Internal server error.",
    });
  }
};

const updateEntries = async (req, res) => {
  try {
    let currentUser = await User.findAll({
      where: {
        email: req.body.email,
      },
    });


    await User.update(
      { entries: Number(currentUser[0].entries) + 1},
      {
        where: {
          email: req.body.email,
        },
      }
    );

    res.status(200).json({entries: Number(currentUser[0].entries) + 1});
  } catch (e) {
    console.log(e);
    res.status(500).send({
      e: "Internal server error.",
    });
  }
};

const signUser = async (req, res) => {
  try {
    let signUser = await User.findAll({
      where: {
        email: req.body.email,
      },
    });

    const {id, email, name, entries, password} = signUser[0]

    if (signUser.length !== 0) {
      bcrypt.compare(req.body.password, password, (err, passwordExist) => {
        if (passwordExist) {
          res.status(200).json({
            id,
            email,
            name,
            entries
          });
        } else {
          res.status(401).json({
            message: "Please enter valid password!"
          })
        }
      });
    } else {
      res.status(404).json({
        message: "User does not exist!"
      })
    }
  } catch (e) {
    console.log(e);
    res.status(500).send({
      e: "Internal server error.",
    });
  }
};

module.exports = {
  getAllUsers,
  registerUser,
  getSingleUser,
  updateEntries,
  signUser
};
