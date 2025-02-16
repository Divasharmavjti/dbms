const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
require("dotenv").config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allow requests from frontend
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve uploaded files

// MySQL Database Connection
const db = mysql.createConnection({
  host: "localhost", // Change if using a remote database
  user: "root", // Your MySQL username
  password: "Diva.001", // Your MySQL password
  database: "studentenrollmentdb",
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed: ", err);
    return;
  }
  console.log("✅ Connected to MySQL Database");
});

// Multer Storage for Image Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files in "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

// Route: Insert a new student enrollment (with image upload)
app.post("/enroll", upload.single("photo"), (req, res) => {
  const {
    full_name,
    parent_guardian_name,
    date_of_registration,
    email_id,
    mobile_no,
    gender,
    address,
    caste_category,
    caste,
    religion,
    date_of_birth,
    age,
    qualification,
    occupation,
  } = req.body;

  const photo = req.file ? req.file.filename : null; // Store filename in database

  const sql =
    "INSERT INTO student (full_name, parent_guardian_name, date_of_registration, email_id, mobile_no, gender, address, caste_category, caste, religion, date_of_birth, age, qualification, occupation, photo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  const values = [
    full_name,
    parent_guardian_name,
    date_of_registration,
    email_id,
    mobile_no,
    gender,
    address,
    caste_category,
    caste,
    religion,
    date_of_birth,
    age,
    qualification,
    occupation,
    photo,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("❌ Error inserting data: ", err);
      res.status(500).json({ error: "Failed to insert data" });
      return;
    }
    res.status(201).json({ message: "✅ Enrollment successful!" });
  });
});

// Route: Get all students
app.get("/students", (req, res) => {
  const sql = "SELECT * FROM student";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Error fetching students: ", err);
      res.status(500).json({ error: "Failed to fetch students" });
      return;
    }
    res.status(200).json(results);
  });
});

// Route: Get a single student by ID
app.get("/students/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM student WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("❌ Error fetching student: ", err);
      res.status(500).json({ error: "Failed to fetch student" });
      return;
    }
    if (result.length === 0) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.status(200).json(result[0]);
  });
});

// Route: Update a student record
app.put("/students/:id", (req, res) => {
  const { id } = req.params;
  const {
    full_name,
    parent_guardian_name,
    email_id,
    mobile_no,
    gender,
    address,
    caste_category,
    caste,
    religion,
    date_of_birth,
    age,
    qualification,
    occupation,
  } = req.body;

  const sql =
    "UPDATE student SET full_name = ?, parent_guardian_name = ?, email_id = ?, mobile_no = ?, gender = ?, address = ?, caste_category = ?, caste = ?, religion = ?, date_of_birth = ?, age = ?, qualification = ?, occupation = ? WHERE id = ?";

  const values = [
    full_name,
    parent_guardian_name,
    email_id,
    mobile_no,
    gender,
    address,
    caste_category,
    caste,
    religion,
    date_of_birth,
    age,
    qualification,
    occupation,
    id,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("❌ Error updating student: ", err);
      res.status(500).json({ error: "Failed to update student" });
      return;
    }
    res.status(200).json({ message: "✅ Student updated successfully!" });
  });
});

// Route: Delete a student record
app.delete("/students/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM student WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("❌ Error deleting student: ", err);
      res.status(500).json({ error: "Failed to delete student" });
      return;
    }
    res.status(200).json({ message: "✅ Student deleted successfully!" });
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
