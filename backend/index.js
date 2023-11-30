

const express = require("express");
const cors=require("cors");

const app = express();

const PORT = 3010;

app.listen(PORT, (err) => {

    if (err) {
        console.log(err)
    }
    else {
        console.log("Connected to Server..!")
    }

})

const conn = require("./db");

conn.connection.on("connected", (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("COnnected to MongoDb")
    }
})

app.use(express.json());
app.use(cors());


app.use("/task", require("./routes/task"));










