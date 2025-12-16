const express = require("express");
const router = express.Router();

let users = [
  {
    firstName: "John",
    lastName: "wick",
    email: "johnwick@gamil.com",
    DOB: "22-01-1990",
  },
  {
    firstName: "John",
    lastName: "smith",
    email: "johnsmith@gamil.com",
    DOB: "21-07-1983",
  },
  {
    firstName: "Joyal",
    lastName: "white",
    email: "joyalwhite@gamil.com",
    DOB: "21-03-1989",
  },
];

// GET request: Retrieve all users
router.get("/", (req, res) => {
  // Copy the code here
  res.send(users); //This line is to be replaced with actual return value
});

// GET by specific ID request: Retrieve a single user with email ID
router.get("/email/:email", (req, res) => {
  const email = req.params.email;
  let filteredUsers = users.filter((user) => user.email === email);
  res.send(filteredUsers);
});

// GET by specific ID request: Retrieve a single user with first name
router.get("/fName/:firstName", (req, res) => {
  const firstName = req.params.firstName;
  let filteredUsers = users.filter((user) => user.firstName === firstName);
  res.send(filteredUsers);
});

// POST request: Create a new user
router.post("/", (req, res) => {
  users.push({
    firstName: req.query.firstName,
    lastName: req.query.lastName,
    email: req.query.email,
    DOB: req.query.DOB,
  });
  res.send("The user " + req.query.firstName + " has been added!");
});

// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {
  const email = req.params.email;
  const newDob = req.query.DOB;
  const emailExists = users.some((user) => user.email === email);

  if (email && newDob && emailExists) {
    users.forEach((user) => {
      if (user.email === email) {
        user.DOB = newDob;
      }
    });
    res.send(`User with the email ${email} updated.`);
  } else {
    res.send("Something went wrong.");
  }
});

// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
  // Copy the code here
  res.send("Yet to be implemented"); //This line is to be replaced with actual return value
});

module.exports = router;
