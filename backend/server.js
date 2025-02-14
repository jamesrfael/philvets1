require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./db"); // Import PostgreSQL connection
const memberRoutes = require("./routes/member"); // Import routes

// Initialize Express
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: "http://localhost:3000" })); // Allow frontend access
app.use(express.json()); // Parse JSON request bodies

// Health Check Route
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Routes
app.use("/api/members", memberRoutes); // Use modularized routes

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
