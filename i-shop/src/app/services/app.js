const MongoClient = require("mongodb").MongoClient;
const express = require("express");
const cors = require("cors");

let connectionString = "mongodb://127.0.0.1:27017";

let app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(cors());

app.get("/products", (req, res) => {
  MongoClient.connect(connectionString, (err, clientObj) => {
    if (!err) {
      let dbo = clientObj.db("ishopData");
      dbo
        .collection("tblProducts")
        .find({})
        .toArray((err, document) => {
          if (!err) {
            res.send(document);
          }
        });
    }
  });
});
app.get("/products/:id", (req, res) => {
  MongoClient.connect(connectionString, (err, clientObj) => {
    if (!err) {
      let dbo = clientObj.db("ishopData");
      dbo
        .collection("tblProducts")
        .find({ id: parseInt(req.params.id) })
        .toArray((err, document) => {
          if (!err) {
            res.send(document);
          }
        });
    }
  });
});
app.get("/categories", (req, res) => {
  MongoClient.connect(connectionString, (err, clientObj) => {
    if (!err) {
      let dbo = clientObj.db("ishopData");
      dbo
        .collection("tblCategories")
        .find({})
        .toArray((err, document) => {
          if (!err) {
            res.send(document);
          }
        });
    }
  });
});

app.get("/categories/:category", (req, res) => {
  MongoClient.connect(connectionString, (err, clientObj) => {
    if (!err) {
      let dbo = clientObj.db("ishopData");
      dbo
        .collection("tblProducts")
        .find({ category: req.params.category })
        .toArray((err, document) => {
          if (!err) {
            res.send(document);
          }
        });
    }
  });
});

app.get("/getcustomers", (req, res) => {
  MongoClient.connect(connectionString, (err, clientObj) => {
    if (!err) {
      let dbo = clientObj.db("ishopData");
      dbo
        .collection("tblCustomers")
        .find({})
        .toArray((err, document) => {
          if (!err) {
            res.send(document);
          }
        });
    }
  });
});

app.get("/getadmin", (req, res) => {
  MongoClient.connect(connectionString, (err, clientObj) => {
    if (!err) {
      let dbo = clientObj.db("ishopData");
      dbo
        .collection("tblAdmin")
        .find({})
        .toArray((err, document) => {
          if (!err) {
            res.send(document);
          }
        });
    }
  });
});

app.post("/adminregister", (req, res) => {
  MongoClient.connect(connectionString, (err, clientObj) => {
    if (!err) {
      let dbo = clientObj.db("ishopData");
      let data = {
        userId: req.body.userId,
        Password: req.body.Password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
      };
      dbo.collection("tblAdmin").insertOne(data, (err, result) => {
        if (!err) {
          console.log("Record Inserted");
        }
      });
    }
  });
});
app.post("/customerregister", (req, res) => {
  MongoClient.connect(connectionString, (err, clientObj) => {
    if (!err) {
      const dbo = clientObj.db("ishopData");
      let data = {
        userId: req.body.userId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        gender: req.body.gender,
        email: req.body.email,
        mobile: req.body.mobile,
        address: req.body.address,
        dateofBirth: new Date(req.body.dateofBirth),
      };
      dbo.collection("tblCustomers").insertOne(data, (err, result) => {
        if (!err) {
          console.log("Customer Record Inserted");
        }
      });
    }
  });
});
app.listen(8080);
console.log("Server Started");
