import "./setup";
import express from "express";
import cors from "cors";
import "reflect-metadata";
import axios from "axios"
import connectDatabase from "./database";
import * as userController from "./controllers/userController";
import * as pokemonController from "./controllers/pokemonController"
import { validateSignupBody } from "./middlewares/validateEmail";
import { validateToken } from "./middlewares/validateToken";
import { getRepository } from "typeorm";
import Pokemon from "./entities/Pokemon";


const app = express();
app.use(cors());
app.use(express.json());

app.post("/sign-up", validateSignupBody, userController.registerUser)
app.post("/sign-in",validateSignupBody, userController.loginUser)
app.get("/pokemons", validateToken, pokemonController.getPokemonsList)
app.post("/my-pokemons/:id/add", validateToken, pokemonController.addPokemonToMyList)
app.post("/my-pokemons/:id/remove", validateToken, pokemonController.removePokemonFromMyList)

app.get("/populate", async (req,res)=>{
  console.log("running...")
  for(let i = 1; i < 200; i ++){
    const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
    const newPokemon = {
      id: result.data.order,
      name: result.data.name,
      number: result.data.order,
      image: result.data.sprites.front_default,
      weight: result.data.weight,
      height: result.data.height,
      baseExp: result.data.base_experience,
      description: "",
      inMyPokemons: false
    }

    const speciesResult = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${i}`)
    newPokemon.description = speciesResult.data.flavor_text_entries[0].flavor_text.split("\n").join(" ")
    const pokemon = getRepository(Pokemon).create(newPokemon)
    const resultquery = await getRepository(Pokemon).save(pokemon)
  }
  res.send("OK")
})

export async function init () {
  await connectDatabase();
}

export default app;
