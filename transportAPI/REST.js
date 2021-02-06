var express = require('express')
var app = express()
// get method route
app.get('/', function (req,res) {
    res.send('GET request')
})

// post method route
app.post('/', function (req, res){
    res.send('POST request')
})