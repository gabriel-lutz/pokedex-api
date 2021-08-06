import { getRepository } from "typeorm"
import Pokemon from "../entities/Pokemon"
import User from "../entities/User"

export async function getUserPokemonsId(id: number){
    const userResult = await getRepository(User).findOne({where: {id:id}, relations:["pokemons"]})
    const aux: number[] = []

    userResult.pokemons.forEach(p=>{
        aux.push(p.id)
    })

    return aux
}

export async function getPokemonsListWithMyPokemons(aux: number[]){
    const result =  await getRepository(Pokemon).find({relations: ["users"]})

    result.forEach(p=>{
        if(aux.includes(p.id)){
            p.inMyPokemons=true;
        }
    })

    return result
}