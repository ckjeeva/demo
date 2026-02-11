const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const Razorpay = require("razorpay");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/sketchart");


// ================= USER MODEL =================

const User = mongoose.model("User", {
    email: String,
    password: String
});


// ================= REGISTER =================

app.post("/register", async (req, res) => {

    const hashed = await bcrypt.hash(req.body.password, 10);

    const user = new User({
        email: req.body.email,
        password: hashed
    });

    await user.save();

    res.json({ message: "User Registered" });
});


// ================= LOGIN =================

app.post("/login", async (req, res) => {

    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(400).json({ message: "User not found" });

    const valid = await bcrypt.compare(req.body.password, user.password);

    if (!valid) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user._id }, "secretkey");

    res.json({ token });
});


// ================= IMAGE UPLOAD =================

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

app.post("/upload", upload.single("image"), (req, res) => {
    res.json({ message: "Image uploaded", file: req.file.filename });
});


// ================= RAZORPAY =================

const razorpay = new Razorpay({
    key_id: "YOUR_RAZORPAY_KEY",
    key_secret: "YOUR_RAZORPAY_SECRET"
});

app.post("/create-order", async (req, res) => {

    const options = {
        amount: req.body.amount * 100,
        currency: "INR",
        receipt: "receipt#1"
    };

    const order = await razorpay.orders.create(options);

    res.json(order);
});


app.listen(5000, () => console.log("Server running on port 5000"));
