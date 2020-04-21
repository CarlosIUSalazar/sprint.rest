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
      // console.log("res.text.length XXXXXXX:", JSON.parse(res.text).length);

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
      // console.log("RESSSSS", result.name);
      result.name.should.equal("Bulbasaur");
    });
  });

  //5 It should allow you to make partial modifications to a Pokemon
  describe("PATCH /api/pokemon/:idOrName - It should allow you to make partial modifications to a Pokemon", () => {
    it("it should allow to make partial modifications to a Pokemon", async () => {
      const res = await request
        .patch("/api/pokemon/Pikachu")
        .send({ name: "Carlos" });
      //const result = JSON.parse(res.text).name;
      const result = res.body;
      // console.log("REESSSSS",res.body)
      //console.log("idOrNameeeeeeeeeeeeeeeeeeeeeeeeeeee :", request.body);
      //res.text.id.should.equal("001");
      expect(result.name).to.equal("Carlos");
    });
  });

  // describe(“PATCH /api/pokemon/:idOrName”, () => {
  //   it(“should allow you to make partial modifications to a Pokemon”, async () => {
  //     const res = await request
  //       .patch(“/api/pokemon/1”)
  //       .send({ name: “Carlos” });
  //     res.should.be.json;
  //     expect(res.body.name).to.equal(“Carlos”);
  //   });
  // });

  //6 DELETE
  describe("DELETE /api/pokemon/:idOrName - It should delete the given Pokemon", () => {
    it("It should delete the given Pokemon", async () => {
      const res = await request.delete("/api/pokemon/Bulbasaur");

      const result = JSON.parse(res.text)[0].name;
      // console.log("res.test YYYYYYY", res.text)
      // console.log("AAABBBCCCC", result);

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

      // console.log("AAABBBCCCC", result);

      expect(result[1]).to.equal("Fire");
    });
  });

  //12 GET  /api/types/:type/pokemon -- it should return all Pokemon that are of a given type
  //You only need to return id and name of the Pokemon, not the whole data for the Pokemon
  describe("GET /api/types/:type/pokemon - it should return all Pokemon that are of Fairy or Dragon type", () => {
    it("it should return all Pokemon that are of a given type", async () => {
      const res = await request.get("/api/types/Fairy/pokemon");
      const result = JSON.parse(res.text);
      // console.log("FAIRYYYYYY", result)
      //const expect = result.length;
      //console.log("RESUUUUUUULT",res.text)
      expect(result.length).to.equal(5);
      //result.length.should.equal(5);
    });

    it("it should return all Pokemon that are of Dragon type", async () => {
      const res = await request.get("/api/types/Dragon/pokemon");
      const result = JSON.parse(res.text);
      //console.log("DRAGOOOOON", result)
      //const expect = result.length;
      expect(result.length).to.equal(3);
      // result.length.should.equal(3);
    });
  });

  //13 GET /api/attacks -  It should return all attacks
  //It is able to take a query parameter limit=n that makes the endpoint only return n attacks

  //14 GET /api/attacks/fast - It should return fast attacks
  //It is able to take a query parameter limit=n that makes the endpoint only return n attacks

  //15 GET /api/attacks/special - It should return special attacks
  //It is able to take a query parameter limit=n that makes the endpoint only return n attacks

  //16 GET /api/attacks/:name - Get a specific attack by name, no matter if it is fast or special

  //17 GET /api/attacks/:name/pokemon
  //Returns all Pokemon (id and name) that have an attack with the given name

  describe.only("GET /api/attacks/:name/pokemon - Returns all Pokemon (id and name) that have an attack with the given name", () => {
    it("Returns all Pokemon (id and name) that have an attack with the given name", async () => {
      const res = await request.get("/api/attacks/Bug Bite/pokemon");
      const result = JSON.parse(res.text);
      // console.log("FAIRYYYYYY", result)
      //const expect = result.length;
      //console.log("RESUUUUUUULT",res.text)
      const expectedObj = {
        "010": "Caterpie",
        "011": "Metapod",
        "012": "Butterfree",
        "013": "Weedle",
        "014": "Kakuna",
        "015": "Beedrill",
        "046": "Paras",
        "047": "Parasect",
        "048": "Venonat",
        "049": "Venomoth",
      };
      expect(result).to.deep.equal(expectedObj);
      //result.length.should.equal(5);
    });
  });

  //18 POST /api/attacks/fast or POST /api/attacks/special  -  Add an attack

  //19 PATCH /api/attacks/:name - Modifies specified attack
  describe("PATCH /api/attacks/:name - It should Modifies specified attack", () => {
    it("it should Modifies FAST specified attack", async () => {
      const res = await request
        .patch("/api/attacks/Tackle")
        .send({ name: "Jeopardy" });
      //const result = JSON.parse(res.text).name;
      const result = res.body;
      // console.log("REESSSSS",res.body)
      //console.log("idOrNameeeeeeeeeeeeeeeeeeeeeeeeeeee :", request.body);
      //res.text.id.should.equal("001");
      expect(result.name).to.equal("Jeopardy");
    });

    it("it should Modifies SPECIAL specified attack", async () => {
      const res = await request
        .patch("/api/attacks/Draining Kiss")
        .send({ name: "Special Kiss" });
      //const result = JSON.parse(res.text).name;
      const result = res.body;
      // console.log("REESSSSS",res.body)
      //console.log("idOrNameeeeeeeeeeeeeeeeeeeeeeeeeeee :", request.body);
      //res.text.id.should.equal("001");
      expect(result.name).to.equal("Special Kiss");
    });
  });

  //20 DELETE /api/attacks/:name - Deletes an attack
  describe("DELETE /api/attacks/:name - It should delete an attack", () => {
    it("It should delete an attack", async () => {
      const res = await request.delete("/api/attacks/Earthquake");

      const result = JSON.parse(res.text);

      //console.log("EEEERRRRRR", result)

      let bool = false;
      for (let i = 0; i < result.fast.length; i++) {
        if (result.fast[i] === "Earthquake") {
          bool = true;
        }
      }
      for (let i = 0; i < result.special.length; i++) {
        if (result.special[i] === "Earthquake") {
          bool = true;
        }
      }

      expect(bool).to.equal(false);
    });
  });
});
