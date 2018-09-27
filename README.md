# express + mongoose 使用总结
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badge/)  [![GPL Licence](https://badges.frapsoft.com/os/gpl/gpl.svg?v=103)](https://opensource.org/licenses/GPL-2.0)  

## 安装
* express
* mongoose
* body-parser

获得源代码 `git clone` 或者 `download zip`

## Demo
### 1. 搭建web服务

1.1 代码如下:

```javascript
// demo1.js
const express = require("express")
const app = express()
const router = express.Router();
router.get('/', function (req, res, next) {
    res.send("<h1>Hello,mongoose</h1>")
});
app.use(router)
app.listen(8899, function () {
    console.log('listen on 8899 ....')
})
```
1.2 运行`node demo1.js`

![image.png](https://upload-images.jianshu.io/upload_images/5809200-911a3faaee4bfb71.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 2. 连接`mongoose`

2.1 代码如下:

```javascript
// demo2.js
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
```
2.2 运行`node demo2.js`

![image.png](https://upload-images.jianshu.io/upload_images/5809200-afdf14cdf38f81a4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 3. 使用`mongoose`进行增删改查(完整代码)

3.1 代码如下:

```javascript
// app.js
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
```
3.2 运行`node app.js`

## 协议
GNU GPL(General Public License) v2.0