import { Request, Response } from "express";

import { addToList, getPokemonsListWithMyPokemons, getUserPokemonsId, removeFromList } from "../services/pokemonService";

export async function getPokemonsList(req:Request, res: Response){
    try{
        const userId = res.locals.id

        const userPokemonsId = await getUserPokemonsId(userId)

        const pokemonsList = await getPokemonsListWithMyPokemons(userPokemonsId)
        
        res.send(pokemonsList).status(200)
    }catch(err){
        res.sendStatus(500)
        console.log(err)
    }
}

export async function addPokemonToMyList(req:Request, res: Response){
    try{
        const userId = res.locals.id
        const pokemonId = Number(req.params.id)
        
        await addToList(userId, pokemonId)

        res.sendStatus(200)

    }catch(err){
        res.sendStatus(500)
        console.log(err)
    }
}

export async function removePokemonFromMyList(req:Request, res: Response){
    try{
        const userId = res.locals.id
        const pokemonId = Number(req.params.id)
        
        await removeFromList(userId, pokemonId)

        res.sendStatus(200)

    }catch(err){
        res.sendStatus(500)
        console.log(err)
    }
}