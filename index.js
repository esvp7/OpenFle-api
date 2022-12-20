require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const editRoutes = require("./routes/editprofile");
const getUsers = require("./routes/getUsers");

connection();

//MIDDLEWARE
app.use(express.json());
app.use(cors());

//ROUTES 
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/editprofile", editRoutes);
app.use('/user', getUsers);

//PORT SETUP
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`App is listening on port ${port}`));
