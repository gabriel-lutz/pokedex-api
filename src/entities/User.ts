import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import Pokemon from "./Pokemon";

@Entity("users")
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @ManyToMany(()=>Pokemon, pokemon => pokemon.users)
  @JoinTable()
  pokemons: Pokemon[]
}
