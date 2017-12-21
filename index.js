const http = require('http')
const express = require('express')
const path = require('path')
const port = 4000;

const app = new express()
//static path and connection command
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')

app.listen(port, (req, res) => console.log('Runnin on ', port))

//database
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'myproject';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  insertDocuments(db, function() {
    client.close();
  });
});
//build the db
const insertDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('documents');
  // Insert some documents
  const thingsToInsert = [
    {
      name: 'Joe',
      age: 4,
      number: 1
    },
        {
      name: 'Doe',
      age: 7,
      number: 2
    },
        {
      name: 'Woe',
      age: 2,
      number: 3
    },
        {
      name: 'Roe',
      age: 2,
      number: 4
    }
  ];
  collection.insertMany( thingsToInsert, function(err, result) {
    assert.equal(err, null);
    assert.equal(4, result.result.n);
    assert.equal(4, result.ops.length);
    console.log("Inserted 4 documents into the collection");
    callback(result);
  });
}