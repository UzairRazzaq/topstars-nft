const express = require("express");
const { ObjectId } = require("mongodb");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const productRoutes = express.Router();

//This will help us connect to the database
const dbo = require("../db/conn");

// This section will help you get a list of all the records.
productRoutes.route("/product").get(function (req, res) {
  let db_connect = dbo.getDb("nft_topstars");
  db_connect
    .collection("nfts")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

productRoutes.route("/product/:id").get(function (req, res) {
  let db_connect = dbo.getDb("nft_topstars");
  let myquery = req.params.id;
  db_connect
    .collection("nfts")
    .find(ObjectId(myquery))
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you create a new record.
productRoutes.route("/product/add").post(function (req, res) {
  let db_connect = dbo.getDb("nft_topstars");
  let myobj = {
    name: req.body.name,
    description: req.body.description,
    url: req.body.url,
    metadata_hash: req.body.metadata_hash,
    mediaLocation: req.body.mediaLocation,
    price: "1 ETH",
    time: "1",
    buyable: true
  };
  db_connect.collection("nfts").insertOne(myobj, function (err, res) {
    if (err) throw err;
  });
});

// This section will help you update a record by id.
productRoutes.route("/product/:id").post(function (req, res) {
  let db_connect = dbo.getDb("nft_topstars");
  let myquery = { id: req.body.id };
  let newvalues = {
    $set: {
      person_name: req.body.person_name,
      person_position: req.body.person_position,
      person_level: req.body.person_level,
    },
  };
  db_connect
    .collection("nfts")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
    });
});

// This section will help you delete a record
productRoutes.route("/product/:id").delete((req, res) => {
  let db_connect = dbo.getDb("nft_topstars");
  var myquery = { id: req.body.id };
  db_connect.collection("nfts").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
  });
});

module.exports = productRoutes;