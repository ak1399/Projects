const mongoose = require("mongoose");

const DB_URI = "mongodb+srv://ganeshjagrut111:XuBsPja0ye9tJi9E@cluster0.dl6dihd.mongodb.net/back?retryWrites=true&w=majority";

mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});






module.exports = mongoose;
