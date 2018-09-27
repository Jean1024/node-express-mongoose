const express = require("express")
const app = express()
const mongoose = require("mongoose")
const bodyParser = require('body-parser');
const router = express.Router();
mongoose.connect('mongodb://localhost:27017/my_database');

const userSchema = new mongoose.Schema({
    name: String,
    age: Number
})
const userModel = mongoose.model('user', userSchema);
app.use(bodyParser.urlencoded({ extended: false }));
router.get('/add', function (req, res, next) {
    var newUser = new userModel({
        name: req.query.name,
        age: req.query.age
    })
    newUser.save(function (err, data) {
        if (err) { return console.log(err) }
        res.redirect('/list');
    })
});

router.get('/list', function (req, res, next) {
    userModel.find(function (err, data) {
        if (err) { return console.log(err) }
        res.json({
            user: data
        })
    })
});
router.get("/del", function (req, res, next) {
    var id = req.query.id;
    userModel.remove({ _id: id }, function (err, data) {
        if (err) { return console.log(err); }
        res.json({ code: 200, msg: '删除成功' });
    })
})

router.post('/update', function (req, res, next) {
    var id = req.body.id;
    userModel.findById(id, function (err, data) {
      if(err){ return console.log(err); }
      req.body.name ? data.name = req.body.name:""
      req.body.age ? data.age = req.body.age:""
      data.save(function(err){
        res.redirect('/list');
      })
    })
});

app.use(router)
app.listen(8899, function () {
    console.log('listen on 8899 ....')
})