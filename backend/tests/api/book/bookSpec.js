// import sinon from "sinon";
// describe("TEST Book features",function(){
//   it("Get /allbooks ", function () {
//     // create a fake that returns the text "foo"
//     const fake = sinon.fake.returns("foo");
//     expect(fake(),"foo");
//   });
// })

// const book = require("../../../controllers/bookController");
// import sinon from "sinon";
// import request from "request";
// import { response } from "express";

const book = require("../../../controllers/bookController");
const sinon = require("sinon");

describe("test book controllers", function () {
  it("get all books", function () {
    try {
      // const BookStub = sinon
      //   .stub(book, "getAllBooks")
      //   .callsFake(async function (req, res, next) {
      //     return "All books";
      //   });

      sinon
        .stub(book, "getAllBooks")
        .callsFake(async function (req, res, next) {
          return "bar";
        });

      assert.equals(book.getAllBooks, "bar");
    } catch (error) {
      console.log(error);
    }
  });
});
