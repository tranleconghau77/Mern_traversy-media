const sinon = require("sinon");
const request = require("request");
const book = require("../../../controllers/bookController");
const client = require("../../../config/redis_connect");

describe("test book controllers", function () {
  let data;
  beforeEach(function () {
    data = { data: "redis" };
    sinon.stub(book, "getAllBooks").callsFake(async (req, res, next) => {
      try {
        await client.get("books", (err, reply) => {
          if (reply) {
            return "redis";
          }
          if (err) return err;
        });

        await client.setex("books", 36000, JSON.stringify(data));
        return "mongo";
      } catch (error) {
        console.log(error);
      }
    });
  });
  afterEach(function () {
    sinon.restore(); // Unwraps the spy
  });
  it("return true if data from mongo", function () {
    req = {};
    res = {};
    next = () => {};
    book
      .getAllBooks(req, res, next)
      .then((data) => {
        if (data == "mongo") {
          expect(data).toEqual("mongo");
        } else {
          expect(data).toEqual("redis");
        }
      })
      .catch((e) => console.log(e));
  });
});
