"use strict";

console.log("dom builder in the haus");

let $ = require('jquery'),
    firebase = require("./fb-config"),
    trivia = require("./db-interaction");

// ***** how do I fix this? ******** //

var gameCol = $("#quiz-display-area");
 
// GET trivia content from firebase
function getTrivia(){
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/trivia.json`
    }).done((resolve) => {
        // console.log("get trivia game:", resolve);
        return resolve;    
    }).fail((error) => {
        console.log("getFBDetails:", error);
        return error;
    });
}

//Call function
getTrivia().then((resolve) => {
    console.log("get trivia game:", resolve);
});


function makeGame(trivia){
    var gameDisplay = 
    $(`<label> ${trivia.game_id}</label>
        <h2>${trivia.name}</h2>
        <ol class= "game" id="game--questions">
        </ol>`);
        $("#game--questions").append(gameDisplay);
    console.log("trivia:", gameDisplay );

    if(trivia) {
        for (let i in trivia) {
        let game = trivia;
        
        $("#game--questions").append(
            `<li> <h5>${game.q1}</h5>
                <div class="form-check">
                    <input class="btn btn-outline-secondary btn-sm" type="button-${[i]}" value="${game.a1[i]}" checked>
                    <input class="btn btn-outline-secondary btn-sm" type="button${[i]}" value="${game.a1[i]}">
                    <input class="btn btn-outline-secondary btn-sm" type="button${[i]}" value="${game.a1[i]}">
                    <input class="btn btn-outline-secondary btn-sm" type="button${[i]}" value="${game.a1[i]}">
                </div>
            </li>`);
        }
    }
}

$("#quiz-display-area").html(makeGame);

// Results of quiz and correct answers
// var results = 0;

// module.exports = { makeGame };