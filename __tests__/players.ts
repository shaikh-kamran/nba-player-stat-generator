import { IStat } from '../utils/interfaces';
import { getPlayerId, getPlayerStats } from '../controllers/players';
import { page_size } from '../utils/constants';

describe('playerStats', () => {

    it('should resolve with positive player id for lebron james', async () => {

        const first_name: string = "lebron";
        const last_name: string = "james";
        const player_id = await getPlayerId(first_name, last_name, page_size);
        expect(player_id).toBeGreaterThan(-1);

    })

    it('should resolve with negative player id for any non existing player', async () => {

        const first_name: string = "michael";
        const last_name: string = "jack";
        const player_id = await getPlayerId(first_name, last_name, page_size);
        expect(player_id).toEqual(-1);

    })

    it('should resolve with object with correct stats', async () => {

        const first_name: string = "lebron";
        const last_name: string = "james";
        const stat: IStat = { Above50: 0, Below50: 0 };

        const player_id = await getPlayerId(first_name, last_name, page_size);

        if (player_id > -1) {

            await getPlayerStats(player_id, stat);
            expect(stat).toMatchObject({ Above50: 6, Below50: 1 });

        }

        expect(stat).toMatchObject({ Above50: 6, Below50: 1 });

    })

})