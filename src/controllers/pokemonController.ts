import { Request, Response } from "express";

import { getPokemonsListWithMyPokemons, getUserPokemonsId } from "../services/pokemonService";

export async function getPokemonsList(req:Request, res: Response){
    const userId = res.locals.id

    const userPokemonsId = await getUserPokemonsId(userId)

    const pokemonsList = await getPokemonsListWithMyPokemons(userPokemonsId)
    
   res.send(pokemonsList).status(200)
}