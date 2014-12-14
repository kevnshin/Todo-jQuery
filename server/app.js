var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var ObjectID = mongodb.ObjectID;
var app = express();
var CONNECTION_STRING = "mongodb://localhost:27017/todosdb";

//Middleware Area
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

function connect_to_db (cb) {
  MongoClient.connect(CONNECTION_STRING, function(err, db) {
    if (err) {
      throw err;
    }

    var collection = db.collection("todos");
    // var collection.end = db.close;
    cb(collection);

  });
}


app.post('/item', function (req, res) {

  connect_to_db( function (collection) {

    // Insert a document into the collection
    collection.insert(req.body.new_item, function(err, arrayItem) {
    
      console.log('err', err);
      console.log('arrayItem', arrayItem);
      res.send(arrayItem[0]);
      collection.db.close();
    }); // End of function(err, docs) callback
  });
});// Ends app.post

app.get("/items", function (req, res) {

  connect_to_db( function (collection) {

    collection.find({}).toArray(function (err, docs) {
    
      console.log("Found the following records");
      console.dir(docs);
      res.send(docs);
      collection.db.close();
    }); // End of function(err, docs) callback
  });
});

app.delete('/items/:item_id', function (req, res) {
  
  connect_to_db( function (collection) {
    var _id = req.params.item_id;

    collection.remove({"_id": new ObjectID(_id)}, function (err, result) {
      if(err) throw err;

      res.json({success: "success"});
      collection.db.close();
    });
  });
});


var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})

function saveTodoList (content) {
  fs.writeFile("./public/todo_save.txt", content, function (err) {
    if(err) return console.log(err);
    console.log("successfully saved todo_save.json");
  });
}