import "./setup";
import express from "express";
import cors from "cors";
import "reflect-metadata";

import connectDatabase from "./database";
import * as userController from "./controllers/userController";
import * as pokemonController from "./controllers/pokemonController"
import { validateSignupBody } from "./middlewares/validateEmail";
import { validateToken } from "./middlewares/validateToken";


const app = express();
app.use(cors());
app.use(express.json());

app.post("/sign-up", validateSignupBody, userController.registerUser)
app.post("/sign-in",validateSignupBody, userController.loginUser)
app.get("/pokemons", validateToken, pokemonController.getPokemonsList)
app.post("/my-pokemons/:id/add", validateToken, pokemonController.addPokemonToMyList)
app.post("/my-pokemons/:id/remove", validateToken, pokemonController.removePokemonFromMyList)

export async function init () {
  await connectDatabase();
}

export default app;
