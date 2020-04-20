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

  //GET /api/pokemon/:id
  // It should return the Pokemon with the given id. Example: GET /api/pokemon/042 should return the data for Golbat
  // Leading zeroes should not be necessary, so GET /api/pokemon/42 would also return Golbat
  app.get("/api/pokemon/:id", (request, response) => {
    const id = request.params.id;
    console.log("id :", id);
    const result = pokeData.pokemon.filter((pokemon) => pokemon.id === id);
    console.log("resultttttttttttttttttttttttttttttttttttt :", result[0]);
    response.send(result[0]);
  });

  return app;
};

module.exports = { setupServer };
