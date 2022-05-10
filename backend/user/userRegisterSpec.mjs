import request from "request";

describe("Test USER API ", function () {
  let url;
  beforeAll(() => {
    url = "http://localhost:5000/api/user";
  });
  //test case 1
  it("returns value 400 with empty body form", function (done) {
    request.post(url, function (error, response, body) {
      let result = JSON.parse(body);
      expect(result.status).toBe(400);
      done();
    });
  });

  //test case 2
  it("returns value 400 with empty value", function (done) {
    request.post(
      {
        url,
        form: {
          username: "",
          password: "",
          gmail: "",
        },
      },
      function (error, response, body) {
        let result = JSON.parse(body);
        expect(result.status).toBe(400);
        done();
      }
    );
  });

  //test case 3
  it("returns value 400 with username has special words", function (done) {
    request.post(
      {
        url,
        form: {
          username: "aaaaa__",
          password: "",
          gmail: "",
        },
      },
      function (error, response, body) {
        let result = JSON.parse(body);
        expect(result.status).toBe(400);
        done();
      }
    );
  });

  //test case 4
  it("returns value 400 with password is less than 6 characters", function (done) {
    request.post(
      {
        url,
        form: {
          username: "aa12",
          password: "abc",
          gmail: "",
        },
      },
      function (error, response, body) {
        let result = JSON.parse(body);
        expect(result.status).toBe(400);
        done();
      }
    );
  });

  //test case 5
  it("returns value 400 with gmail not @gmail.com", function (done) {
    request.post(
      {
        url,
        form: {
          username: "aa12",
          password: "abcddd",
          gmail: "h.com",
        },
      },
      function (error, response, body) {
        let result = JSON.parse(body);
        expect(result.status).toBe(400);
        done();
      }
    );
  });

  //test case 6
  it("returns value 400 with gmail is exist", function (done) {
    request.post(
      {
        url,
        form: {
          username: "aa12",
          password: "abcddd",
          gmail: "TRRRansss@gmail.com",
        },
      },
      function (error, response, body) {
        let result = JSON.parse(body);
        expect(result.status).toBe(400);
        done();
      }
    );
  });
});
