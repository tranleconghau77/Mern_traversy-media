import request from "request";
describe("login: POST /user", function () {
  let url;

  beforeAll(() => (url = "http://localhost:5000/api/user/login"));

  //test case 1
  it("return 400 with no form", function (done) {
    request.post(
      {
        url,
      },
      function (error, response, body) {
        let result = JSON.parse(body);
        expect(result.status).toBe(400);
        done();
      }
    );
  });

  //test case 2
  it("return 400 with content is empty", function (done) {
    request.post(
      {
        url,
        form: {
          gmail: "",
          password: "",
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
  it("return 400 with wrong gmail", function (done) {
    request.post(
      {
        url,
        form: {
          gmail: "abc",
          password: "",
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
  it("return 401 with wrong password", function (done) {
    request.post(
      {
        url,
        form: {
          gmail: "hau1234567890@gmail.com",
          password: "aaaa",
        },
      },
      function (error, response, body) {
        let result = JSON.parse(body);
        expect(result.status).toBe(401);
        done();
      }
    );
  });

  //test case 5
  it("return 200 with gmail and password are true", function (done) {
    request.post(
      {
        url,
        form: {
          gmail: "hau1234567890@gmail.com",
          password: "000000",
        },
      },
      function (error, response, body) {
        let result = JSON.parse(body);
        expect(result.id).not.toBe(undefined);
        done();
      }
    );
  });
});
