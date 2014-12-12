var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();


//Middleware Area
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));


app.post('/save', function (req, res) {
  saveTodoList(req.body.list_to_save);
  res.send("success");
})

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})

function saveTodoList (content) {
  fs.writeFile("./public/todo_save.json", content, function (err) {
    if(err) return console.log(err);
    console.log("successfully saved todo_save.json");
  });
}