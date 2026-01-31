const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "Backend is healthy" });
});

app.get("/api/message", (req, res) => {
  res.json({ message: "Hello from Node backend 🚀" });
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
