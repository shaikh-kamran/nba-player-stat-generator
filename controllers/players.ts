import { IStat } from '../utils/interfaces';
import { baseURL, page_size, start_year, end_year } from '../utils/constants';
import axios from 'axios';

/**
 * Search the given player id 
 * APIs are called parallely 
 * @param {string} first_name 
 * @param {string} last_name 
 * @param {number} page_size 
 * @returns 
 */
export const getPlayerIdParallel = async (first_name: string, last_name: string, page_size: number) => {
    try {

        const total_pages = await getTotalPlayerCount();
        const myarray = new Array(total_pages).fill(0).map((e, i) => { return i });
        const promises: Promise<any>[] = [];

        myarray.forEach(async (index) => {
            let url = `${baseURL}players?page=${index}&per_page=${page_size}`;
            promises.push(statPromise(first_name, last_name, url));
        });

        return await Promise.any(promises)
            .then((value) => {
                return value
            })
            .catch((err) => {
                console.log(err);
            })

    } catch (err) {
        console.log(err)
    }

}

/**
 * Get the total no of pages from total no of players
 */
export const getTotalPlayerCount = async () => {

    try {

        const metaurl = `${baseURL}players?page=0&per_page=1`;
        const response = await axios.get(metaurl);
        const players = response.data;
        return Math.ceil(players.meta.total_count / page_size);

    } catch (err) {

        console.log(err)

    }

}

/**
 * Gets a promise which resolve the required player or 
 * rejects it if player not found
 */
export const statPromise = (first_name: string, last_name: string, url: string) => {
    return new Promise(async (resolve, reject) => {

        const response = await axios.get(url);
        const players = response.data;
        if (players.data.length) {
            const player = players.data.find((player) => {
                return (player['first_name']).toLowerCase() === first_name &&
                    (player['last_name']).toLowerCase() === last_name
            });
            if (player) {
                resolve(player.id);
            } else {
                reject(-1);
            }
        }

    })
}

/**
 * Search the given player id 
 * APIs are called sequentially 
 * @param {string} first_name 
 * @param {string} last_name 
 * @param {number} page_size 
 * @returns 
 */
export const getPlayerId = async (first_name: string, last_name: string, page_size: number, page_no: number = 0) => {
    try {
        const url = `${baseURL}players?page=${page_no}&per_page=${page_size}`;
        const response = await axios.get(url);
        const players = response.data;
        if (players.data.length) {
            const player = players.data.filter((player) => {
                return (player['first_name']).toLowerCase() === first_name &&
                    (player['last_name']).toLowerCase() === last_name
            });
            if (player.length) {
                return player[0].id
            }
            return getPlayerId(first_name, last_name, page_size, page_no + 1);
        }
        return -1
    } catch (err) {
        console.log(err)
        return -1
    }
}

/**
 * Calculate stat of a given player id
 * @param {string} player_id 
 * @param {object} stat 
 * @returns 
 */
export const getPlayerStats = async (player_id: number, stat: IStat) => {
    try {

        const promises: Promise<any>[] = [];
        for (let index = start_year; index <= end_year; index++) {
            let url = `${baseURL}season_averages?season=${index}&player_ids[]=${player_id}`;
            promises.push(axios.get(url));
        }

        return await Promise.all(promises)
            .then((responses) => {
                return Promise.all(responses.map(res => res.data))
            })
            .then((value) => {
                value.forEach(stats => {
                    if (stats.data.length) {
                        const year_stat = stats.data[0];
                        if (year_stat.games_played >= 50)
                            stat["Above50"] += 1;
                        else
                            stat["Below50"] += 1;
                    }
                });
                return stat
            })
            .catch((err) => {
                console.log(err);
            })

    } catch (err) {
        console.log(err)
    }
}

