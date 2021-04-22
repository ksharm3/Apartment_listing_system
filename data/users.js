const mongoCollections = require('../config/mongoCollections');
const Users = mongoCollections.users;
let { ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');
const owasp = require('owasp-password-strength-test');
//const uuid = require('uuid/v4');

var salt = bcrypt.genSaltSync(9);
/*owasp.config({
  allowPassphrases: true,
  maxLength: 128,
  minLength: 7,
  minPhraseLength: 20,
  minOptionalTestsToPass: 2,
});*/

module.exports = {

  async getAllUsers() {
    //console.log("We are in GetAllUsers");
    const userCollection = await Users();
    const userList = await userCollection.find({}).toArray();
    if (!userList) throw 'No Users in system!';
    return userList;
  },
  // This is a fun new syntax that was brought forth in ES6, where we can define
  // methods on an object with this shorthand!

  async getUserById(id) {
    //console.log("We are in GetUsersByID");
    const userCollection = await Users();
    let parsedId = ObjectId(id);
    //console.log(parsedId);
    //console.log(id);
    const user = await userCollection.findOne({ _id: parsedId });
    if (!user) throw 'Book Not Found';
    return user;
  },

  async addUser(username,email,password) 
  {
    const userCollection = await Users();
    var hash = bcrypt.hashSync(password, salt);
    //console.log("We are in add book");
    let newUser = {
       username : username,
       email: email,
       password: hash,
       reviews: [],
       comments: []
    };

    const newInsertInformation = await userCollection.insertOne(newUser);
    if (newInsertInformation.insertedCount === 0) throw 'Insert failed!';
    return await this.getUserById(newInsertInformation.insertedId);
  }/*,
  async removeBook(id) {
    //console.log("V r in removeBook");
    const userCollection = await Users();
    let parsedId = ObjectId(id);
    const deletionInfo = await userCollection.removeOne({ _id: parsedId });
    if (deletionInfo.deletedCount === 0) {
      throw `Could not delete book with id of ${id}`;
    }
    return true;
  }
  /*async updateBook(id, updatedBook) {
    const book = await this.getBookById(id);
    //console.log(book);
    let reviews = book.reviews;

    let bookUpdateInfo = {
      title: updatedBook.title,
      author: updatedBook.author,
      genre: updatedBook.genre,
      datePublished: updatedBook.datePublished,
      summary: updatedBook.summary,
      reviews: reviews
    };

    if(bookUpdateInfo.title==null)
    bookUpdateInfo.title = book.title;
    if(bookUpdateInfo.author==null)
    bookUpdateInfo.author = book.author;
    if(bookUpdateInfo.genre==null)
    bookUpdateInfo.genre = book.genre;
    if(bookUpdateInfo.datePublished==null)
    bookUpdateInfo.datePublished = book.datePublished;
    if(bookUpdateInfo.summary==null)
    bookUpdateInfo.summary = book.summary;


    const userCollection = await Users();
    let parsedId = ObjectId(id);
    const updateInfo = await userCollection.updateOne(
      { _id: parsedId },
      { $set: bookUpdateInfo }
    );
    if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
      throw 'Update failed';

    return await this.getBookById(id);
  }*/
};