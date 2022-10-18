let express = require("express");
const { post } = require("jquery");
let router = express.Router();
let mongoose = require("mongoose");
const db = require("../config/db");
const { collection } = require("../models/book");

//create reference to the model (dbschema )
let Book = require("../models/book");





module.exports.displayBookList = (req, res, next) => {
  Book.find((err, bookList) => {
    if (err) {
      return console.error(err);
    } else {
     
      var bk=bookList; 
      //bk.sort({'name':1});
      res.render("book/list", { title: "Business Contacts List", BookList: bk});
      //render book.ejs and pass title and Booklist variable we are passing bookList object to BookList property
    }
  }).sort({name:1});
};

module.exports.addpage = (req, res, next) => {
  res.render("book/add", {
    title: "Add Contacts",
    displayName: req.user ? req.user.displayName : "",
  });
};

module.exports.addprocesspage = (req, res, next) => {
  let newContact = Book({
    name: req.body.name,
    author: req.body.author,
    published: req.body.published,
    description: req.body.description,
    price: req.body.price,
  });
  Book.create(newContact, (err, Book) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      // refresh the book list
      res.redirect("/contact-list");
    }
  });
};

module.exports.displayeditpage = (req, res, next) => {
  let id = req.params.id; //id of actual object

  Book.findById(id, (err, booktoedit) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //show the edit view
      res.render("book/edit", { title: "Edit Contact", book: booktoedit });
    }
  });
};

module.exports.processingeditpage = (req, res, next) => {
  let id = req.params.id; //id of actual object

  let updatebook = Book({
    _id: id,
    name: req.body.name,
    author: req.body.author,
    published: req.body.published,
    description: req.body.description,
    price: req.body.price,
  });
  Book.updateOne({ _id: id }, updatebook, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //refresh the book list
      res.redirect("/contact-list");
    }
  });
};

module.exports.deletepage = (req, res, next) => {
  let id = req.params.id;
  Book.remove({ _id: id }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //refresh book list
      res.redirect("/contact-list");
    }
  });
};
