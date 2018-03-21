"use strict";

console.log("dom builder in the haus");
let $ = require('jquery'),
    firebase = require("./fb-config");

// ***** how do I fix this? ******** //

var gameCol = $("#quiz-display-area");
var populateGameCol = $("#game--questions");
 


// function makeGame(game){
//     let gameDisplay = 
//     $(`<label> ${game.id}</label>
//         <h2>${game.name}</h2>
//         <ol class= "game" id="game--questions">
//         </ol>`);
//     $("#quiz-display-area").html(gameDisplay);

//     if(game.trivia) {
//         for (let item in game) {
//         let currentGame = game[item],
//         console.log("trivia:", currentGame[i].q1 + currentGame[i].a1 );
//         populateGameCol.append(
//             `<li> <h5>${currentGame.q1}</h5>
//                 <div class="form-check">
//                     <input class="btn btn-outline-secondary btn-sm" type="button" value="Answer 1" checked>
//                     <input class="btn btn-outline-secondary btn-sm" type="button" value="Answer 2">
//                     <input class="btn btn-outline-secondary btn-sm" type="button" value="Answer 3">
//                 </div>
//             </li>`);
//         }
//     }
// }

// Results of quiz and correct answers
// var results = 0;

// module.exports = { makeGame };