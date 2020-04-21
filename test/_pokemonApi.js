/* eslint-disable prettier/prettier */
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const { setupServer } = require("../src/server");

chai.should();

const expect = chai.expect;
/*
 * This sprint you will have to create all tests yourself, TDD style.
 * For this you will want to get familiar with chai-http https://www.chaijs.com/plugins/chai-http/
 * The same kind of structure that you encountered in lecture.express will be provided here.
 */
const server = setupServer();
describe("Pokemon API Server", () => {
  let request;
  beforeEach(() => {
    request = chai.request(server);
  });

  describe("GET /api/pokemon - returning full list pokemon", () => {
    it("should return json for full list pokemon", async () => {
      const res = await request.get("/api/pokemon").query({ limit: 3 });

      res.should.be.json;
      console.log("res.text.length XXXXXXX:", JSON.parse(res.text).length);

      JSON.parse(res.text).length.should.equal(3);
    });
  });

  describe("POST /api/pokemon", () => {
    it("It should add a Pokemon. ", async () => {
      // const newPoke = {
      //     "id": "152",
      //     "name": "PhuShunCarlosaur"
      //   }
      const res = await request.post("/api/pokemon");
      // .send({ newPoke });
      // res.should.have.status(201);
      res.should.be.json;
      JSON.parse(res.text).length.should.equal(152);
    });
  });

  //3
  describe("GET /api/pokemon - It should return the Pokemon with the given id", () => {
    it("It should return the Pokemon with the given id", async () => {
      const res = await request.get("/api/pokemon/001");
      JSON.parse(res.text).name.should.equal("Bulbasaur");
      // console.log('MEOOOOOOO', res.text)
      //res.name.should.equal("Bulbasaur");
    });
  });

  //4 TODO It should return the Pokemon with given name.
  describe("GET /api/pokemon - It should return the Pokemon with the given name", () => {
    it("It should return the Pokemon with the given name", async () => {
      const res = await request.get("/api/pokemon/Bulbasaur");
      const result = JSON.parse(res.text || null);
      console.log("RESSSSS", result.name);
      result.name.should.equal("Bulbasaur");
    });
  });

  //5 It should allow you to make partial modifications to a Pokemon
  // describe.only("PATCH /api/pokemon/:idOrName - It should allow you to make partial modifications to a Pokemon", () => {
  //   it("it should allow to make partial modifications to a Pokemon", async () => {
  //     const res = await request.patch("/api/pokemon/:idOrName");
  //     // JSON.parse(res.text).id.should.equal("001");
  //     //console.log("REESSSSS",res.text)
  //     //console.log("idOrNameeeeeeeeeeeeeeeeeeeeeeeeeeee :", request.body);
  //     res.text.id.should.equal("001");
  //   });
  // });

  //6 DELETE
  describe("DELETE /api/pokemon/:idOrName - It should delete the given Pokemon", () => {
    it("It should delete the given Pokemon", async () => {
      const res = await request.delete("/api/pokemon/Bulbasaur");

      const result = JSON.parse(res.text)[0].name;

      console.log("AAABBBCCCC", result);

      expect(result).to.equal("Ivysaur");
      //const result = JSON.parse(res.text)[0];
      // console.log("RESULT",  JSON.parse(res.text)[0]);
      //result.name.should.deep.equal("Ivysaur");
    });
  });

  // 7 GET It should return the evolutions a Pokemon has. /api/pokemon/:idOrName/evolutions
  describe("GET /api/pokemon/:idOrName/evolutions - It should return the evolutions a Pokemon has", () => {
    it("It should return the evolutions a Pokemon has", async () => {
      const res = await request.get("/api/pokemon/Staryu/evolutions");
      const result = JSON.parse(res.text);
      const expect = [{ id: 121, name: "Starmie" }];
      result.should.deep.equal(expect);
    });
  });

  //8 GET For evolved Pokemon, this should return it's previous evolutions
  describe("GET /api/pokemon/:idOrName/evolutions - It should return the evolutions a Pokemon has", () => {
    it("It should return the evolutions a Pokemon has", async () => {
      const res = await request.get("/api/pokemon/017/evolutions/previous");
      const result = JSON.parse(res.text);
      const expect = [{ id: 16, name: "Pidgey" }];
      result.should.deep.equal(expect);
    });
  });

  //9 GET It should return a list of all available types
  //It is able to take a query parameter limit=n that makes the endpoint only return n types

  //10 POST Adds a type

  //11 DELETE Deletes the given type
  describe("DELETE /api/types/:idOrName - It should delete the given type", () => {
    it("It should delete the given type", async () => {
      const res = await request.delete("/api/types/Poison");

      const result = JSON.parse(res.text);

      console.log("AAABBBCCCC", result);

      expect(result[1]).to.equal("Fire");
    });
  });

  //           it("Returns status 401 if token is invalid", async () => {
  //   const res = await request
  //     .post("/secret/message")
  //     .query({ token: 3 })
  //     .send({ shout: "marco" });
  //   res.should.have.status(401);
  // });

  // it("Returns status 403 if token is valid, but the secret part is missing", async () => {
  //   const res = await request.post("/secret/message").query({ token: 6 });
  //   res.should.have.status(403);
  // });

  // it("Returns status 401 if anything is wrong", async () => {
  //   const res = await request.post("/secret/message");
  //   res.should.have.status(401);

  // describe("express basics", () => {
  //   describe("GET /teapot - modifying status", () => {
  //     it("should return status 418", async () => {
  //       const res = await request.get("/teapot");
  //       res.should.have.status(418);
  //     });
  //   });

  // describe("GET /hello - returning text", () => {
  //   it("should return the text/html 'world'", async () => {
  //     const res = await request.get("/hello");
  //     res.should.be.html;
  //     res.text.should.equal("world");
  //   });
  // });

  // describe("GET /hellojson - returning json", () => {
  //   it("should return the JSON for { hello: 'world' }", async () => {
  //     const res = await request.get("/hellojson");
  //     res.should.be.json;
  //     JSON.parse(res.text).should.deep.equal({ hello: "world" });
  //   });
  // });

  // describe("GET /greet - dealing with query parameters", () => {
  //   it("should greet the name given in query parameter 'name' with 'Hello name!'", async () => {
  //     const res = await request.get("/greet").query({ name: "Mia" });
  //     /* GET /greet?name=Mia */
  //     res.should.be.html;
  //     res.text.should.equal("Hello Mia!");
  //   });
  // });

  // xdescribe("GET /:a/plus/:b - dealing with params", () => {
  //   it("should return a JSON object with a result field", async () => {
  //     const res = await request.get("/1/plus/1");
  //     res.should.be.json;
  //     JSON.parse(res.text).result.should.not.be.undefined;
  //   });

  //   it("adds 2 + 3", async () => {
  //     const res = await request.get("/2/plus/3");
  //     res.should.be.json;
  //     JSON.parse(res.text).result.should.equal(5);
  //   });

  //   it("adds 3 + 2", async () => {
  //     const res = await request.get("/3/plus/2");
  //     res.should.be.json;
  //     JSON.parse(res.text).result.should.equal(5);
  //   });
  // });
  // });

  // xdescribe("handling bodies", () => {
  // xdescribe("/echo endpoint", () => {
  //   it("POST /echo returns body content", async () => {
  //     const expected = {
  //       foo: "bar",
  //       honey: ["I", "shrank", "the", "kids"],
  //       loopy: {
  //         loop: {
  //           deeply: {
  //             nested: [1, "123", [{ lol: "lol" }, null, null, 5]],
  //           },
  //         },
  //       },
  //     };
  //     const res = await request.post("/echo").send(expected);
  //     res.should.be.json;
  //     JSON.parse(res.text).should.deep.equal(expected);
  //   });

  //   it("OPTIONS /echo flips keys and values of simple objects", async () => {
  //     const payload = {
  //       what: "is love?",
  //       baby: "don't hurt me",
  //       "don't hurt me": "no more",
  //       "The Answer": 42,
  //     };

  //     const expected = {
  //       "is love?": "what",
  //       "don't hurt me": "baby",
  //       "no more": "don't hurt me",
  //       42: "The Answer",
  //     };

  //     const res = await request.options("/echo").send(payload);
  //     res.should.be.json;
  //     JSON.parse(res.text).should.deep.equal(expected);
  //   });
  // });
  // });

  // xdescribe("Adding middleware", () => {
  // xdescribe("/secret Endpoint", () => {
  //   it("Returns status 401 when called normally", async () => {
  //     const res = await request.get("/secret");
  //     res.should.have.status(401);
  //   });

  //   it("Returns status 200 when given a token query parameter that contains an even number", async () => {
  //     const res = await request.get("/secret").query({ token: 2018 });
  //     res.should.have.status(200);
  //   });

  //   it("Returns status 401 when given a token query parameter that is not an even number", async () => {
  //     const res = await request.get("/secret").query({ token: 45 });
  //     res.should.have.status(401);
  //   });

  //   xdescribe("POST /secret/message Endpoint", () => {
  //     it("Returns 'polo' when given a valid token query and posting a JSON body { key: 42, shout: 'marco' }", async () => {
  //       const res = await request
  //         .post("/secret/message")
  //         .query({ token: 2018 })
  //         .send({ key: 42, shout: "marco" });
  //       res.should.have.status(200);
  //       res.should.be.html;
  //       res.text.should.equal("polo");
  //     });

  //     it("Returns status 401 if token is invalid", async () => {
  //       const res = await request
  //         .post("/secret/message")
  //         .query({ token: 3 })
  //         .send({ shout: "marco" });
  //       res.should.have.status(401);
  //     });

  //     it("Returns status 403 if token is valid, but the secret part is missing", async () => {
  //       const res = await request.post("/secret/message").query({ token: 6 });
  //       res.should.have.status(403);
  //     });

  //     it("Returns status 401 if anything is wrong", async () => {
  //       const res = await request.post("/secret/message");
  //       res.should.have.status(401);
  //     });
  //   });
  // });
});
