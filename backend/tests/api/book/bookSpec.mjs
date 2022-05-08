// import sinon from "sinon";
// describe("TEST Book features",function(){
//   it("Get /allbooks ", function () {
//     // create a fake that returns the text "foo"
//     const fake = sinon.fake.returns("foo");
//     expect(fake(),"foo");
//   });
// })

import sinon from "sinon";
var myAPI = { hello: function () {} };
import login from ""

describe("myAPI.hello method", function () {
  let sandbox =sinon.createSandbox();
  beforeEach(function () {
    // stub out the `hello` method
    sandbox.stub(myAPI, "hello");
  });

  afterEach(function () {
    // completely restore all fakes created through the sandbox
    sandbox.restore();
  });

  it("should be called once", function () {
    myAPI.hello();
    sandbox.assert.calledOnce(myAPI.hello);
  });

  it("should be called twice", function () {
    myAPI.hello();
    myAPI.hello();
    sandbox.assert.calledTwice(myAPI.hello);
  });
});