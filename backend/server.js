// backend/server.js
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
const PORT = 3000;
const JWT_SECRET = "mysecret123";

app.use(express.json());
app.use(cors());

let users = [];

app.post("/signup", (req, res) => {
    const { username, password } = req.body;
    const userExists = users.find((u) => u.username === username);

    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    users.push({ username, password });
    res.json({ message: "Signup successful!" });
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;

    const user = users.find(
        (u) => u.username === username && u.password === password
    );
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });
    console.log(token);
    res.json({ message: "Login successful!", token });
});

app.get("/dashboard", (req, res) => {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        res.json({
            message: `Welcome, ${decoded.username}! This is a protected route.`,
        });
    } catch (err) {
        res.status(403).json({ message: "Invalid or expired token" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
