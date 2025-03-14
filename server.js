// const express = require("express");
import dotenv from "dotenv";
const port = process.env.PORT || 3000;
import { expressConnection } from "./config/express.js"
import { connection } from './config/db.js'


dotenv.config();
const app = expressConnection()

app.listen(port, () => {
  connection(), console.log(`Match Server is running on port ${port}`);
});

