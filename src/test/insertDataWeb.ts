import databaseManager from "../database";
import { Character } from "../entities/Character";
import { UserCharacter } from "../entities/UserCharacter";


async function insertDataWeb() {
    try {
        // récupération de la connexion mysql
        const db = await databaseManager.getManager();


        const character = new Character();
        character.xp = "100";
        character.fluz = "500";
        character.idUser = 1;
        character.isDead = 1;
        character.dateOfDeath = new Date("10-01-2022");
        character.name = "BobMarley";

        const savedCharacter = await db.save(character);



        const userCharacter = new UserCharacter();
        userCharacter.idUser = 1;
        userCharacter.idCharacter = savedCharacter.idCharacter;

        const savedUserCharacter = await db.save(userCharacter);

    } catch (error) {

    }
};

insertDataWeb().then(function () {
    console.log("données ajouté")
    process.exit(1)
})

