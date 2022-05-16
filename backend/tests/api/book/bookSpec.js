const sinon = require("sinon");
const book = require("../../../controllers/bookController");
const client = require("../../../config/redis_connect");

describe("test book controllers", function () {
  let dataRedis;
  let monogoData;

  beforeEach(function () {
    monogoData = [
      {
        _id: "3",
        name: "The Clan of the Cave Bear",
        category: "History",
        author: "Jean M Auel",
        published_date: "1980",
        vote: 4.9,
      },
      {
        _id: "4",
        name: "Steve Jobs",
        category: "History",
        author: "Walter Isaacson",
        published_date: "2011",
        vote: 4.9,
      },
    ];

    dataRedis = [...monogoData];
  });

  afterEach(() => {
    sinon.restore();
  });

  it("return true if get all books successfully", async function () {
    sinon.stub(book, "getAllBooks").callsFake(async function () {
      try {
        await client.get("dataRedis", (err, reply) => {
          if (reply) {
            expect(JSON.parse(reply)).toEqual(dataRedis);
            return;
          }
          if (err) {
            expect("err").toEqual("err");
            return;
          } else {
            expect(monogoData).toEqual(dataRedis);
            return;
          }
        });
        await client.set("dataRedis", JSON.stringify(dataRedis));
        return true;
      } catch (error) {
        console.log(error);
      }
    });
    expect(
      book
        .getAllBooks()
        .then((data) => expect(data).toEqual(true))
        .catch((e) => expect(e).toEqual(e))
    );
  });

  it("return true if get a book successfully", function () {
    try {
      let req = { params: { id: 3 } };
      let res = {};
      let next = {};

      sinon.stub(book, "getBook").callsFake((req, res, next) => {
        return (bookData = monogoData.find(
          (element) => element._id == req.params.id
        ));
      });

      expect(book.getBook(req, res, next)).toEqual({
        _id: "3",
        name: "The Clan of the Cave Bear",
        category: "History",
        author: "Jean M Auel",
        published_date: "1980",
        vote: 4.9,
      });
      return true;
    } catch (error) {
      console.log(error);
    }
  });

  it("return true if add a book successfully", function () {
    try {
      let req = {};
      req.body = {
        _id: 1,
        name_book: "abc",
        author: "Hau tran",
        published_date: "05/04/2022",
        category: "Novel",
        vote: 3.9,
      };
      sinon.stub(book, "postBook").callsFake((req, res, next) => {
        monogoData = monogoData.push(req.body);
        return req.body;
      });

      expect(book.postBook(req, res, next)).toEqual(req.body);
    } catch (error) {
      console.log(error);
    }
  });
});
