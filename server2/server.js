const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const DB = 'mongodb+srv://tannu:1234@cluster0.k7ybicw.mongodb.net/tul?retryWrites=true&w=majority'
mongoose.connect(DB).then(() => {
    console.log(`connection successful`)
}).catch((err) => console.log(`no connection`));
app.use(express.json());

const usersRouter = require("./routes/users");
app.use("/", usersRouter);

app.listen(port, () => {
  console.log("Server is ruunig on port 5000");
});