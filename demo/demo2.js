const express = require("express")
const app = express()
const mongoose = require("mongoose")
const bodyParser = require('body-parser');
const router = express.Router();
mongoose.connect('mongodb://localhost:27017/my_database');
mongoose.connection.on('connected', function(){
    console.log("connect success!");
});
app.use(router)
app.listen(8899, function () {
    console.log('listen on 8899 ....')
})