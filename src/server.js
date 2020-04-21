/* eslint-disable no-empty */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
const express = require("express");
const pokeData = require("./data");

const setupServer = () => {
  /**
   * Create, set up and return your express server, split things into separate files if it becomes too long!
   */

  const app = express();
  app.use(express.json()); //MIDDLEWARE
  app.use(express.urlencoded({ extended: false })); //Body parser middleware

  // console.log('pokeData :', pokeData.pokemon)
  //1
  app.get("/api/pokemon/", (request, response) => {
    const limit = request.query.limit;
    // console.log(limit)
    // response.send(pokeData.pokemon)
    response.send(pokeData.pokemon.slice(0, limit));
    // console.log(pokeData.pokemon.slice(0, limit))
    // console.log(pokeData.pokemon.length , 'YOOOOOOOO')
  });

  app.post("/api/pokemon/", (request, response) => {
    const newPoke = {
      id: "152",
      name: "PhuShunCarlosaur",
    };
    pokeData.pokemon.push(newPoke);
    response.send(pokeData.pokemon);
    // console.log(pokeData.pokemon.length, 'SUPPPPPPP')
    //response.status(201).end();
  });

  // 3 & 4 GET /api/pokemon/:id
  // It should return the Pokemon with the given id. Example: GET /api/pokemon/042 should return the data for Golbat
  // Leading zeroes should not be necessary, so GET /api/pokemon/42 would also return Golbat
  app.get("/api/pokemon/:key", (request, response) => {
    const key = request.params.key;
    const result = pokeData.pokemon.filter(
      (pokemon) => pokemon.id === key || pokemon.name === key
    );
    response.send(result[0]);
  });

  //4 It should return the Pokemon with given name.
  // app.get("/api/pokemon/:name", (request, response) => {
  //   const name = request.params.name;
  //   console.log("nameeee :", name);
  //   const result = pokeData.pokemon.filter((pokemon) => pokemon.name === name);
  //   console.log("resultttttttttttttttttttttttttttttttttttt :", result[0]);
  //   response.send(result[0]);
  // });

  //TODO - HOW TO ACCESS BODY
  //5 PATCH It should allow you to make partial modifications to a Pokemon
  app.patch("/api/pokemon/:idOrName", (request, response) => {
    const idOrName = request.params.idOrName;
    const result = pokeData.pokemon.filter(
      (pokemon) => pokemon.id === idOrName || pokemon.name === idOrName
    );

    // console.log("REQUESSSST", request.body, result[0].name);
    result[0].name = request.body.name;
    response.send(result[0]);
    //response.status(200).end();
  });

  // app.patch(“/api/pokemon/:key”, async (request, response) => {
  //   const key = request.params.key;
  //   pokeData.pokemon.forEach((pok) => {
  //     if (
  //       Number(pok.id) === Number(key) ||
  //       pok.name.toLowerCase() === key.toLowerCase()
  //     ) {
  //       pok = Object.assign(pok, request.body);
  //       response.send(pok);
  //     }
  //   });
  //   response.status(200).end();
  // });

  //6 DELETE  -- /api/pokemon/:idOrName -- It should delete the given Pokemon
  app.delete("/api/pokemon/:idOrName", (request, response) => {
    const idOrName = request.params.idOrName;

    // const result = pokeData.pokemon.filter((pokemon) => pokemon.id === idOrName || pokemon.name === idOrName);

    // if(typeof(idOrName) === "number") {
    //   pokeData.pokemon.splice([idOrName-1],1)
    // }
    let index = 0;
    for (let i = 0; i < pokeData.pokemon.length; i++) {
      if (
        pokeData.pokemon[i].id === idOrName ||
        pokeData.pokemon[i].name === idOrName
      ) {
        index = i;
      }
    }

    pokeData.pokemon.splice(index, 1);

    response.send(pokeData.pokemon);
  });

  //7 GET /api/pokemon/:idOrName/evolutions -- It should return the evolutions a Pokemon has.
  //Note that some Pokemon don't have evolutions, it should return an empty array in this case
  //Example: GET /api/pokemon/staryu/evolutions should return [ { "id": 121, "name": "Starmie" } ]
  app.get("/api/pokemon/:idOrName/evolutions", (request, response) => {
    const key = request.params.idOrName;
    const result = pokeData.pokemon.filter(
      (pokemon) => pokemon.id === key || pokemon.name === key
    );
    response.send(result[0].evolutions);
  });

  //8 GET -- /api/pokemon/:idOrName/evolutions/previous -- For evolved Pokemon, this should return it's previous evolutions
  //Example: GET /api/pokemon/17/evolutions/previous should return [ { "id": 16, "name": "Pidgey" } ]
  app.get("/api/pokemon/:idOrName/evolutions/previous", (request, response) => {
    const key = request.params.idOrName;
    const result = pokeData.pokemon.filter(
      (pokemon) => pokemon.id === key || pokemon.name === key
    );
    // console.log("PIKAAAAAAAAA", result);
    response.send(result[0]["Previous evolution(s)"]);
  });

  //9 GET /api/types -- It should return a list of all available types
  //It is able to take a query parameter limit=n that makes the endpoint only return n types

  //10 POST Adds a type -- /api/types

  //11 DELETE /api/types/:name -- Deletes the given type
  app.delete("/api/types/:idOrName", (request, response) => {
    const idOrName = request.params.idOrName;

    let index = 0;
    for (let i = 0; i < pokeData.types.length; i++) {
      if (pokeData.types[i] === idOrName) {
        index = i;
      }
    }
    // console.log("PIKAAAA", index);
    // console.log("CHUUUU", idOrName);
    // console.log("YOOOOOO", pokeData.types);
    pokeData.types.splice(index, 1);

    response.send(pokeData.types);
  });

  //12 GET  /api/types/:type/pokemon -- it should return all Pokemon that are of a given type
  //You only need to return id and name of the Pokemon, not the whole data for the Pokemon
  app.get("/api/types/:type/pokemon", (request, response) => {
    const key = request.params.type;
    const result = pokeData.pokemon.filter((poke) => poke.types.includes(key));

    // console.log("PIKAAAAAAAAA", result);
    response.send(result);
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
  app.get("/api/attacks/:name/pokemon", (request, response) => {
    const key = request.params.name;
    const result = pokeData.pokemon.filter(
      (poke) => poke.attacks.fast[0].name === key
    );

    const newResult = [];
    const resultObj = {};
    result.forEach((poke) => newResult.push(poke.id, poke.name));

    for (let i = 0; i < newResult.length; i++) {
      if (i % 2 !== 0) {
        resultObj[newResult[i - 1]] = newResult[i];
      }
    }

    // console.log("RESUUUUUUULT", resultObj)
    // result.map(poke => )
    // console.log("PIKAAAAAAAAA", result);
    response.send(resultObj);
  });

  //18 POST /api/attacks/fast or POST /api/attacks/special  -  Add an attack

  //19 PATCH /api/attacks/:name - Modifies specified attack
  app.patch("/api/attacks/:name", (request, response) => {
    const name = request.params.name;
    let result = pokeData.attacks.fast.filter(
      (attacks) => attacks.name === name
    );

    if (result.length === 0) {
      result = pokeData.attacks.special.filter(
        (attacks) => attacks.name === name
      );
    }
    // console.log("ATTACKKKSSSSSS", request.body, result[0].name);
    result[0].name = request.body.name;
    response.send(result[0]);
    //response.status(200).end();
  });

  //20 DELETE /api/attacks/:name - Deletes an attack
  app.delete("/api/attacks/:name", (request, response) => {
    const attack = request.params.name;

    let index = 0;
    for (let i = 0; i < pokeData.attacks.fast.length; i++) {
      if (pokeData.attacks.fast[i] === attack) {
        index = i;
      }
    }
    for (let i = 0; i < pokeData.attacks.special.length; i++) {
      if (pokeData.attacks.special[i] === attack) {
        index = i;
      }
    }

    // console.log("PIKAAAAaaaaaaaaaaaaaaaaaaaaaa", pokeData.attacks);
    // console.log("CHUUUU", attack);
    //console.log("YOOOOOO", pokeData.attacks);
    pokeData.types.splice(index, 1);

    response.send(pokeData.attacks);
  });

  return app;
};

module.exports = { setupServer };
