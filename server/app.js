var express = require('express');
var bodyParser = require('body-parser');
// var mongodb = require('mongodb');
// var MongoClient = mongodb.MongoClient;
// var ObjectID = mongodb.ObjectID;
var app = express();
var mongoose = require('mongoose');

// var CONNECTION_STRING = "mongodb://localhost:27017/todosdb"; //DEV Environment
// var CONNECTION_STRING = secrets.connectionString; //PRODUCT Environment

//FIX: use actual link from mongolab
var CONNECTION_STRING = 'mongodb://todo: ' + process.env.DBPASS + '@ds031601.mongolab.com:31601/todo'; //PRODUCT Environment


//Middleware Area
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect(CONNECTION_STRING);

//Implement Schema here
  // var TodoSchema = mongoose.Schema('Todo', {
  //   title: String,
  //   completed: Boolean  
  // })

//Implement Model here
// var Todo = mongoose.model('Todo', TodoSchema);
// model name has to match collection in Mongolab but singular (NOT PLURAL LIKE IN COLLECTION)

// Example of model without schema
// var Todo = mongoose.model('Todo', {title: String, completed: Boolean});

// function connect_to_db (cb) {
//   MongoClient.connect(CONNECTION_STRING, function(err, db) {
//     if (err) {
//       throw err;
//     }

//     var collection = db.collection("todos");
//     cb(collection);
//   });
// }


app.post('/item', function (req, res) {

  // connect_to_db( function (collection) {

  //   // Insert a document into the collection
  //   collection.insert(req.body.new_item, function(err, arrayItem) {
    
  //     console.log('err', err);
  //     console.log('arrayItem', arrayItem);
  //     res.send(arrayItem[0]);
  //     collection.db.close();
  //   }); // End of function(err, docs) callback
  // });
});// Ends app.post

app.put('/items/:id/:status', function (req, res) {
  
  // connect_to_db( function (collection) {
  //   var todo_id = req.params.id;
  //   var todo_completed_status = req.params.status;

  //   collection.update(
  //     { '_id' : new ObjectID(todo_id)},
  //     {
  //       $set: {
  //         completed: todo_completed_status
  //       }
  //     },
  //     {w:1},
  //     function (err) {
  //       var success;
  //       if(err) {
  //         success = false;
  //         console.warn(err.message);
  //       } else {
  //         success = true;
  //         console.log("successfully updated");
  //       }

  //       collection.db.close();
  //       res.json({success: success});
  //     }//ends function (err)
  //   );
  // });
});


app.get("/items", function (req, res) {

  // connect_to_db( function (collection) {

  //   collection.find({}).toArray(function (err, docs) {
    
  //     console.log("Found the following records");
  //     console.dir(docs);
  //     res.send(docs);
  //     collection.db.close();
  //   }); // End of function(err, docs) callback
  // });
});

app.delete('/items/:item_id', function (req, res) {
  
  // connect_to_db( function (collection) {
  //   var _id = req.params.item_id;

  //   collection.remove({"_id": new ObjectID(_id)}, function (err, result) {
  //     if(err) throw err;

  //     res.json({success: "success"});
  //     collection.db.close();
  //   });
  // });
});


var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})

// function saveTodoList (content) {
//   fs.writeFile("./public/todo_save.txt", content, function (err) {
//     if(err) return console.log(err);
//     console.log("successfully saved todo_save.json");
//   });
// }