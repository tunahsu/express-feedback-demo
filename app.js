var express = require('express')
var bodyParser = require('body-parser')
var app = express()

app.use('/public/', express.static('./public/'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//express-art-template來整合 art-template 到 Express中
//第一個參數表示當渲染 .art 結尾的檔案時，使用 art-template
app.engine('html', require('express-art-template'))

var comments = [
    {
        name: '鮪魚',
        message: '郭P4',
        dateTime: '2018-10-04'
    },
    {
        name: '飯球',
        message: '呵呵呵呵呵呵',
        dateTime: '2018-09-28'
    }
]

app.get('/', function(req, res) {
    var data = {
        comments: comments
    }
    res.render('index.html', data)
})

app
    .get('/post', function(req, res) {
        res.render('post.html')
    })
    .post('/post', function(req, res) {
        var comment = req.body
        comment.dateTime = '2018-08-30'
        comments.unshift(comment)
        res.redirect('/')
    })

app.listen(3000, function() {
    console.log('App is running...')
})