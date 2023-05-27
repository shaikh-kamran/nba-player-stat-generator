import { IStat } from './utils/interfaces';
import { getPlayerId, getPlayerStats } from './controllers/players';
import { page_size } from './utils/constants';

const first_name: string = "lebron";
const last_name: string = "james";

/**
 * Calculates the stat of the given player
 */
const main = async () => {

    console.log("Loading... This may take some time");
    const player_id = await getPlayerId(first_name, last_name, page_size);
    //Uncomment this if player is to be searched parallely
    // const player_id = await getPlayerIdParallel(first_name, last_name, page_size);

    if (player_id > -1) {
        const stat: IStat = { Above50: 0, Below50: 0 };
        await getPlayerStats(player_id, stat);
        console.log("Player Name:", first_name, last_name);
        console.log("Games Played:", JSON.stringify(stat));
    } else {
        console.log("No data present for ", first_name, last_name);
    }

}

main();