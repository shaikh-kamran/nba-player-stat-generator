# Stat Calculator
JavaScript App to Calculate NBA Player statistics

## Method used to calculate Stats

 * Get player list to get player id of the given player
    * getPlayerId ( slow but less api calls ): This method gets 100 players first and search for given first and last name
        * If player found return its
        * If player not found, search for next 100 players
    * getPlayerIdParallel ( fast but more api calls ): This method gets multiple 100 players and search for given first and last name
        * If player found return its
        * If player not found, search for next 100 players

 * Get all year stats from 2014 to 2020 of a player by its id
 * Loop over stat and check if match played is less or more than 50

## Run Locally
 * Prerequisite: Node 16+ and npm
 ```python
Clone the project
cd nba
npm install
npm start // to run the app
npm run test // to test the app
```
