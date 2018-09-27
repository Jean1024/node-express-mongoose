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