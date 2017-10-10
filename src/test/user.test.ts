import { IUser } from './../interfaces/user';
import { IUserModel } from './../models/user.model';
import { userSchema } from "../schemas/user";
import "mocha";

// use q promises
global.Promise = require("q").Promise;

// import mongoose
import mongoose = require("mongoose");

mongoose.Promise = global.Promise;

//connect to mongoose and create model
const MONGODB_CONNECTION: string = "mongodb://localhost:27017/heros";
let connection: mongoose.Connection = mongoose.createConnection(MONGODB_CONNECTION);
var User: mongoose.Model<IUserModel> = connection.model<IUserModel>("User", userSchema);

//require chai and use should() assertions
let chai = require("chai");
chai.should();

describe("User", function() {

  describe("create()", function () {
    it("should create a new User", function () {
      //user object
      let user: IUser = {
        email: "foo@bar.com",
        firstName: "Brian",
        lastName: "Love"
      };

      //create user and return promise
      return new User(user).save().then(result => {
        //verify _id property exists
        result._id.should.exist;

        //verify email
        result.email.should.equal(user.email);

        //verify firstName
        result.firstName.should.equal(user.firstName);

        //verify lastName
        result.lastName.should.equal(user.lastName);
      })
    });
  });
});