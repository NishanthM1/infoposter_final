const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");
const postRoutes = require("./routes/postRoutes");
const authRoutes = require("./routes/authRoutes");

dotenv.config({ path: __dirname + '/.env' });
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "x-auth-token"],
  credentials: true,
}));
app.use(express.json());
app.use("/uploads", express.static("uploads")); // serve uploaded images

// Routes
app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to InfoPoster Backend 🚀");
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
