import { getRepository } from "typeorm"
import Pokemon from "../entities/Pokemon"
import User from "../entities/User"

export async function getUserPokemonsId(id: number){
    try{
        const userResult = await getRepository(User).findOne({where: {id:id}, relations:["pokemons"]})
        const aux: number[] = []

        userResult.pokemons.forEach(p=>{
            aux.push(p.id)
        })

        return aux
    }catch(err){
        console.log(err)
    }
}

export async function getPokemonsListWithMyPokemons(aux: number[]){
    try{
        const result =  await getRepository(Pokemon).find({relations: ["users"]})

        result.forEach(p=>{
            if(aux.includes(p.id)){
                p.inMyPokemons=true;
            }
        })

        return result
    }catch(err){
        console.log(err)
    }
}

export async function addToList(userId: number, pokemonId: number){
    try{
        const user = await getRepository(User).findOne({where: {id: userId}, relations:["pokemons"]})
        const pokemon = await getRepository(Pokemon).findOne({where: {id: pokemonId}})
        
        user.pokemons.push(pokemon)

        await getRepository(User).save(user)

    }catch(err){
        console.log(err)

    }
}

export async function removeFromList(userId: number, pokemonId: number){
    try{
        const user = await getRepository(User).findOne({where: {id: userId}, relations:["pokemons"]})
        
        const filteredList = user.pokemons.filter(p=>{
            if (p.id === pokemonId){
                return false
            }
            return true
        })
        user.pokemons = filteredList
        
        await getRepository(User).save(user)

    }catch(err){
        console.log(err)

    }
}