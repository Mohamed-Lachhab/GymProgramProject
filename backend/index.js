const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "authentication",
});

db.connect(err => {
  if (err) {
    console.error("Database connection failed:", err.message);
  } else {
    console.log("Connected to the database!");
  }
});

app.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  // Check if email already exists
  const checkEmailQuery = "SELECT * FROM users WHERE email = ?";
  db.query(checkEmailQuery, [email], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error." });
    if (results.length > 0) {
      return res.status(400).json({ message: "Email is already taken." });
    }

    const checkUsernameQuery = "SELECT * FROM users WHERE username = ?";
    db.query(checkUsernameQuery, [username], (err, results) => {
      if (err) return res.status(500).json({ message: "Database error." });
      if (results.length > 0) {
        return res.status(400).json({ message: "Username is already taken." });
      }

      // Hash password and create user
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return res.status(500).json({ message: "Error hashing password." });

        const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
        db.query(sql, [username, email, hashedPassword], (err, result) => {
          if (err) return res.status(500).json({ message: "Database error." });
          res.status(200).json({ message: "Registration successful!" });
        });
      });
    });
  });
});


app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], async (err, results) => {
    if (err) return res.status(500).json({ message: "Database error." });
    if (results.length === 0) {
      return res.status(400).json({ message: "User not found." });
    }

    const user = results[0];

    // Check if the password matches
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Create a JWT token
    const token = jwt.sign({ id: user.id }, "secret_key", { expiresIn: "1h" });

    // Send the username and token in the response
    res.status(200).json({
      message: "Login successful!",
      token,
      username: user.username,  // Add the username to the response
    });
  });
});


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
