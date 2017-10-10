"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../schemas/user");
require("mocha");
global.Promise = require("q").Promise;
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const MONGODB_CONNECTION = "mongodb://localhost:27017/heros";
let connection = mongoose.createConnection(MONGODB_CONNECTION);
var User = connection.model("User", user_1.userSchema);
let chai = require("chai");
chai.should();
describe("User", function () {
    describe("create()", function () {
        it("should create a new User", function () {
            let user = {
                email: "foo@bar.com",
                firstName: "Brian",
                lastName: "Love"
            };
            return new User(user).save().then(result => {
                result._id.should.exist;
                result.email.should.equal(user.email);
                result.firstName.should.equal(user.firstName);
                result.lastName.should.equal(user.lastName);
            });
        });
    });
});
