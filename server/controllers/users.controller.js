const bcrypt = require("bcrypt");
const User = require("../models/users.model");

// importing the axios package
const axios = require("axios");

// operations performed on the "users" model

// to create new user during sign-up
function createUser(req, res) {
  const newUser = req.body;

  // validation for empty fields
  if (!newUser.userName)
    res
      .status(200)
      .send({ success: false, message: "Username cannot be empty." });
  else if (!newUser.email)
    res.status(200).send({ success: false, message: "Email cannot be empty." });
  else if (!newUser.password)
    res
      .status(200)
      .send({ success: false, message: "Password cannot be empty." });
  else if (!newUser.role)
    res.status(200).send({ success: false, message: "Please select a role." });
  // if none of the fields are empty
  else {
    // creating the hashed password and storing the User document in the DB.
    bcrypt.hash(newUser.password, 10, function (err, hashedPassword) {
      newUser.password = hashedPassword;

      // creating a new User document
      User.create(newUser, function (err) {
        if (err) {
          // 11000 is the error code for violation of "unique" validation
          if (err.code === 11000) {
            // if the username alreasy exists
            if (err.keyPattern.userName)
              res.status(200).send({
                success: false,
                message:
                  "The entered Username already exists. Please use a different one.",
              });
            // if the email id already exists
            else if (err.keyPattern.email)
              res.status(200).send({
                success: false,
                message:
                  "The entered Email Id already exists. Please use a different one.",
              });
          } else res.status(200).send({ success: false, message: err });
        }
        // if there is no error, the document is successfully created
        else {
          // API call to create a new entry in either the "students" model or the "teachers" model
          if (newUser.role === "Student") createStudent(req, res);
          else if (newUser.role === "Teacher") createTeacher(req, res);

          // success status if nothing goes wrong
          res.status(200).send({
            success: true,
            message: "Succesfully created new user.",
            user: newUser,
          });
        }
      });
    });
  }
}

// to create a new entry in the "students" model
function createStudent(req, res) {
  axios
    .post("/api/students", { userName: req.body.userName })
    .then(function (response) {
      if (!response.data.success) res.status(200).send(response.data);
      else return;
    })
    .catch(function (err) {
      console.log(err);
    });
}

// to create a new entry in the "teachers" model
function createTeacher(req, res) {
  axios
    .post("/api/teachers", { userName: req.body.userName })
    .then(function (response) {
      if (!response.data.success) res.status(200).send(response.data);
      else return;
    })
    .catch(function (err) {
      console.log(err);
    });
}

// to login the user
function loginUser(req, res) {
  const userEmail = req.body.email;
  const userPassword = req.body.password;

  // validation for empty fields
  if (!userEmail)
    res.status(200).send({ success: false, message: "Email cannot be empty." });
  else if (!userPassword)
    res
      .status(200)
      .send({ success: false, message: "Password cannot be empty." });
  // if none of the fields are empty
  else {
    // finding if the user exists
    User.findOne({ email: userEmail }, function (err, foundUser) {
      if (err) res.status(200).send({ success: false, message: err });
      else {
        // if the user exists, check the password entered
        if (foundUser) {
          // checking password
          bcrypt.compare(
            userPassword,
            foundUser.password,
            function (err, result) {
              // if result===true, i.e., the password is correct
              if (result)
                res.status(200).send({
                  success: true,
                  message: "Succesfully signed-in the user.",
                  user: foundUser,
                });
              // if the password is incorrect
              else
                res
                  .status(200)
                  .send({ success: false, message: "Wrong password." });
            }
          );
        }

        // if the user does not exist
        else
          res.status(200).send({
            success: false,
            message: "The email is not signed-up yet. Please sign-up first.",
          });
      }
    });
  }
}

module.exports = { createUser, loginUser };
