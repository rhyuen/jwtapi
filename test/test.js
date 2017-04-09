"use strict";

const chai = require("chai");
const chaiHttp = require("chai-http");
const should = require("chai").should();
const mocha = require("mocha");
const mongoose = require("mongoose");
const config = require("../config.js");
const User = require("../models/user.js");
const server = require("../server.js");
//for Cookie Retention

chai.use(chaiHttp);
let agent = chai.request.agent(server);

describe("Home Page", () => {
  it("should return 200", (done) => {
    chai.request(server)
      .get("/")
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(200);
        done();
      });
  });

  it("should Log the User in", (done) => {
    chai.request(server)
      .post("/")
      .field("name", "NewestUserName")
      .field("password", "NewestPassword")
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(200);
        done();
      });
  });
});

describe("Register Page", () => {
  it("should return 200", (done) => {
    chai.request(server)
      .get("/register")
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(200);
        done();
      });
  });

  it("should CREATE a new Account", (done) => {
    chai.request(server)
      .post("/register")
      .send({newusername: "NewestUserName", newpassword: "NewestPassword"})
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});


describe("User Page", () => {
  it("should return NOT AUTHENTICATED", (done) => {
      chai.request(server)
        .get("/api/user")
        .end((err, res) => {
          res.should.have.status(403);
          res.should.not.have.status(200);
          done();
        });
  });
});

describe("Forgot Password Page", () => {
  it("should return 200", (done) => {
      chai.request(server)
        .get("/forgot")
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
  });

  it("should redirect you to the login page", (done) => {
    chai.request(server)
      .post("/forgot")
      .send({forgot_email_address: "TestEmailAddress2000@gmail.com"})
      .end((err, res) => {
        res.should.have.status(302);
      });
  });
});

describe("Reset Password Page", () => {
  it("should return DENIED", (done) => {
      chai.request(server)
        .get("/reset")
        .end((err, res) => {
          res.should.have.status(403);
          done();
        });
  });
});

// describe("Accounts", () => {
//   before((done) => {
//     mongoose.connect(config.test.db);
//     done();
//   });
//
//   after((done) => {
//     mongoose.connection.close();
//     done();
//   });
//
//   beforeEach((done) => {
//     //const randomNumber = Math.floor(Math.random() * 1000);
//     let newUser = new User();
//     newUser.name = "TestAccount";
//     newUser.password = newUser.generateHash("TestPassword");
//     newUser.admin = true;
//
//     newUser.save((err, newestUser) => {
//       if(err){
//         console.error(err);
//       }else{
//         console.log("Newest User Created: %s", newestUser.name);
//       }
//       done();
//     });
//   });
//
//   it("find a user by name", (done) => {
//     User.findOne({name: "TestAccount"}, (err, foundUser) => {
//       if(err){
//         console.log(err);
//       }
//       foundUser.name.should.eql("TestAccount");
//       done();
//     });
//   });
//
//   //Don't forget to remove this part.  It deletes all of the users.
//   afterEach((done) => {
//     User.remove({name: newUser.name}, (err, deletedUser) => {
//       if(err){
//         console.log(err);
//       }else{
//         console.log("Deleted user: %s", deletedUser.name);
//       }
//       done();
//     });
//   });
// });
