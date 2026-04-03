// index.js
require("dotenv").config(); // load env variables

const express = require("express");

const app = express();

// Config
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";
const AUTHOR = process.env.AUTHOR || "Muhammed Aslam Shah S";

// Middleware
app.use(express.json());

// Routes

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
    uptime: process.uptime(),
    environment: NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// Root
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Hello from Dockerized Node.js Express Server 🚀",
    author: AUTHOR,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("❌ Error:", err);

  res.status(err.status || 500).json({
    success: false,
    message:
      NODE_ENV === "production"
        ? "Internal Server Error"
        : err.message,
  });
});

// Graceful shutdown (pro feature)
process.on("SIGINT", () => {
  console.log("\n🛑 Server shutting down...");
  process.exit(0);
});

// Start server
app.listen(PORT, () => {
  console.log("======================================");
  console.log("✅ Server is running successfully");
  console.log(`🌍 Environment : ${NODE_ENV}`);
  console.log(`🚀 Listening on: http://localhost:${PORT}`);
  console.log(`👨‍💻 Author : ${AUTHOR}`);
  console.log("======================================");
});