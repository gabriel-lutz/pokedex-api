import {MigrationInterface, QueryRunner} from "typeorm";

export class alterPokemon1628215386937 implements MigrationInterface {
    name = 'alterPokemon1628215386937'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_pokemons_pokemons" DROP CONSTRAINT "FK_186672f1f8a7bc81e034438415d"`);
        await queryRunner.query(`ALTER TABLE "pokemons" ADD "inMyPokemons" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users_pokemons_pokemons" ADD CONSTRAINT "FK_186672f1f8a7bc81e034438415d" FOREIGN KEY ("pokemonsId") REFERENCES "pokemons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_pokemons_pokemons" DROP CONSTRAINT "FK_186672f1f8a7bc81e034438415d"`);
        await queryRunner.query(`ALTER TABLE "pokemons" DROP COLUMN "inMyPokemons"`);
        await queryRunner.query(`ALTER TABLE "users_pokemons_pokemons" ADD CONSTRAINT "FK_186672f1f8a7bc81e034438415d" FOREIGN KEY ("pokemonsId") REFERENCES "pokemons"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
