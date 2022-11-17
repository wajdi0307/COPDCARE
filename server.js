require("dotenv").config({ path: "./config.env" });
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
const cors = require('cors');
//const { exists } = require("./models/User");

// Connect DB 
connectDB();



app.use(express.json());
app.use(cors())

// Connecting routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/private", require("./routes/private"));

// Error Handler should be last piece of middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000; 

const server = app.listen(PORT, () => 
console.log(`Server running on ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: ${err.message}`);
    server.close(() => process.exit(1));
});