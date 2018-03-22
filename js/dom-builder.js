"use strict";

console.log("dom builder in the haus");

let $ = require('jquery'),
    firebase = require("./fb-config"),
    trivia = require("./db-interaction");

 
// ***** Trivia[0] ******** //

var gameCol = $("#quiz-display-area");
var correctAnswers = 0;

// GET trivia content from firebase
function getTrivia(game){
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/trivia.json`
    }).done((game) => {
        console.log("get trivia game:", game);
        return game;    
    }).fail((error) => {
        console.log("getFBDetails:", error);
        return error;
    });
}

function makeGame(trivia){
    console.log("line 28 of dom-builder.js get function makeGame(game)", trivia);
    
    if (trivia) {
        var quiz = trivia[0];
        $("#quiz-display-area").append(`<label> ${quiz.game_id}</label>
        <h2>${quiz.name}</h2>
        <ol class= "game" id="game--questions">
        </ol>`);
        console.log(" line 36 of dom-builder.jsmakeGame trivia data: ", quiz.name);
        console.log("line 37 of dom-builder.jstrivia firebase content:", quiz);
            
            let Q1 =`<li> <h5>${quiz.q1}</h5>
                    <div class="form-check">
                    <input class="btn btn-outline-secondary btn-sm" type="button" id="game--btn-01" value="${quiz.a1[0]}" checked="q-onclick()">
                    <input class="btn btn-outline-secondary btn-sm" type="button" id="game--btn-02" value="${quiz.a1[1]}">
                    <input class="btn btn-outline-secondary btn-sm" type="button" id="game--btn-03"value="${quiz.a1[2]}">
                    <input class="btn btn-outline-secondary btn-sm" type="button" id="game--btn-04" value="${quiz.a1[3]}">
                    </div> </li>`,

                Q2 =`<li> <h5>${quiz.q2}</h5>
                    <div class="form-check">
                    <input class="btn btn-outline-secondary btn-sm" type="button" id="game--btn-05" value="${quiz.a2[0]}" checked="q-onclick()">
                    <input class="btn btn-outline-secondary btn-sm" type="button" id="game--btn-06" value="${quiz.a2[1]}">
                    <input class="btn btn-outline-secondary btn-sm" type="button" id="game--btn-07"value="${quiz.a2[2]}">
                    <input class="btn btn-outline-secondary btn-sm" type="button" id="game--btn-08" value="${quiz.a2[3]}">
                    </div> </li>`,

                Q3 = `<li> <h5>${quiz.q3}</h5>
                    <div class="form-check">
                    <input class="btn btn-outline-secondary btn-sm" type="button" id="game--btn-09" value="${quiz.a3[0]}" checked="q-onclick()">
                    <input class="btn btn-outline-secondary btn-sm" type="button" id="game--btn$-10" value="${quiz.a3[1]}">
                    <input class="btn btn-outline-secondary btn-sm" type="button" id="game--btn$-11"value="${quiz.a3[2]}">
                    <input class="btn btn-outline-secondary btn-sm" type="button" id="game--btn$-12" value="${quiz.a3[3]}">
                    </div> </li>`,

                Q4 =`<li> <h5>${quiz.q4}</h5>
                    <div class="form-check">
                    <input class="btn btn-outline-secondary btn-sm" type="button" id="game--btn-13" value="${quiz.a4[0]}" checked="q-onclick()">
                    <input class="btn btn-outline-secondary btn-sm" type="button" id="game--btn-14" value="${quiz.a4[1]}">
                    <input class="btn btn-outline-secondary btn-sm" type="button" id="game--btn-15"value="${quiz.a4[2]}">
                    <input class="btn btn-outline-secondary btn-sm" type="button" id="game--btn-16" value="${quiz.a4[3]}">
                    </div> </li>`,

                Q5 =`<li> <h5>${quiz.q5}</h5>
                    <div class="form-check">
                    <input class="btn btn-outline-secondary btn-sm" type="button" id="game--btn-17" value="${quiz.a5[0]}" checked="q-onclick()">
                    <input class="btn btn-outline-secondary btn-sm" type="button" id="game--btn-18" value="${quiz.a5[1]}">
                    <input class="btn btn-outline-secondary btn-sm" type="button" id="game--btn-19"value="${quiz.a5[2]}">
                    <input class="btn btn-outline-secondary btn-sm" type="button" id="game--btn-20" value="${quiz.a5[3]}">
                    </div> </li>`,

                Q6 = `<li> <h5>${quiz.q6}</h5>
                    <div class="form-check">
                    <input class="btn btn-outline-secondary btn-sm" type="button" id="game--btn-21" value="${quiz.a6[0]}" checked="q-onclick()">
                    <input class="btn btn-outline-secondary btn-sm" type="button" id="game--btn-22" value="${quiz.a6[1]}">
                    <input class="btn btn-outline-secondary btn-sm" type="button" id="game--btn-23"value="${quiz.a6[2]}">
                    <input class="btn btn-outline-secondary btn-sm" type="button" id="game--btn-24" value="${quiz.a6[3]}">
                    </div> </li>`,

                Q7 =`<li> <h5>${quiz.q7}</h5>
                    <div class="form-check">
                    <input class="btn btn-outline-secondary btn-sm" type="button" id="game--btn-25" value="${quiz.a7[0]}" checked="q-onclick()">
                    <input class="btn btn-outline-secondary btn-sm" type="button" id="game--btn-26" value="${quiz.a7[1]}">
                    <input class="btn btn-outline-secondary btn-sm" type="button" id="game--btn$-27"value="${quiz.a7[2]}">
                    <input class="btn btn-outline-secondary btn-sm" type="button" id="game--btn-28" value="${quiz.a7[3]}">
                    </div> </li>`,

                Q8 =`<li> <h5>${quiz.q8}</h5>
                    <div class="form-check">
                    <input class="btn btn-outline-secondary btn-sm" type="button" id="game--btn-29" value="${quiz.a8[0]}" checked="q-onclick()">
                    <input class="btn btn-outline-secondary btn-sm" type="button" id="game--btn-30" value="${quiz.a8[1]}">
                    <input class="btn btn-outline-secondary btn-sm" type="button" id="game--btn-31"value="${quiz.a8[2]}">
                    <input class="btn btn-outline-secondary btn-sm" type="button" id="game--btn-32" value="${quiz.a8[3]}">
                    </div> </li>`,

                Q9 = `<li> <h5>${quiz.q9}</h5>
                    <div class="form-check">
                    <input class="btn btn-outline-secondary btn-sm" type="button" id="game--btn-33" value="${quiz.a9[0]}" checked="q-onclick()">
                    <input class="btn btn-outline-secondary btn-sm" type="button" id="game--btn-34" value="${quiz.a9[1]}">
                    <input class="btn btn-outline-secondary btn-sm" type="button" id="game--btn-35"value="${quiz.a9[2]}">
                    <input class="btn btn-outline-secondary btn-sm" type="button" id="game--btn-36" value="${quiz.a9[3]}">
                    </div> </li>`,
                
                Q10 =`<li> <h5>${quiz.q10}</h5>
                    <div class="form-check">
                    <input class="btn btn-outline-secondary btn-sm" type="button" id="game--btn-37" value="${quiz.a10[0]}" checked="q-onclick()">
                    <input class="btn btn-outline-secondary btn-sm" type="button" id="game--btn-38" value="${quiz.a10[1]}">
                    <input class="btn btn-outline-secondary btn-sm" type="button" id="game--btn-39" value="${quiz.a10[2]}">
                    <input class="btn btn-outline-secondary btn-sm" type="button" id="game--btn-40"> ${quiz.a10[3]} </label>
                    </div> </li>`,

                Q11 =`<li> <h5>${quiz.q11}</h5>
                    <div class="btn-group-toggle" data-toggle="buttons">
                    <input class="btn btn-outline-secondary btn-sm" type="button" id="game--btn-41" value="${quiz.a11[0]}" checked="q-onclick()">
                    <input class="btn btn-outline-secondary btn-sm" type="button" id="game--btn-42"> ${quiz.a11[1]} </label>
                    <input class="btn btn-outline-secondary btn-sm" type="button" id="game--btn-43"value="${quiz.a11[2]} </label>
                    <input class="btn btn-outline-secondary btn-sm" type="button" id="game--btn-44">${quiz.a11[3]} </label>
                    </div> </li>`,

                Q12 = `<li> <h5>${quiz.q12}</h5>
                    <div class="btn-group-toggle" data-toggle="buttons">
                    <label class="btn btn-outline-secondary btn-sm active">
                    <input type="checkbox" checked autocomplete="off" id="game--btn-45"> ${quiz.a12[0]} </label>
                    
                    <label class="btn btn-outline-secondary btn-sm active">
                    <input type="checkbox" checked autocomplete="off" id="game--btn-46"> ${quiz.a12[1]} </label>
                    
                    <label class="btn btn-outline-secondary btn-sm active">
                    <input type="checkbox" checked autocomplete="off" id="game--btn-47"> ${quiz.a12[2]} </label>
                    
                    <label class="btn btn-outline-secondary btn-sm active">
                    <input type="checkbox" checked autocomplete="off" id="game--btn-48"> ${quiz.a12[3]} </label>
                    </div> 
                    
                    <div class="btn-group-toggle" data-toggle="buttons">
                        <label class="btn btn-outline-secondary btn-sm active">
                            <input type="checkbox" checked autocomplete="off" id="game--btn-45"> ${quiz.a12[0]} </label>
                        <label class="btn btn-outline-secondary btn-sm active">
                            <input type="checkbox" checked autocomplete="off"> Checked
                        </label>
                        </div>
                    
                    </li>`;


            let results = ` <button type="button" class="btn btn-secondary btn-lg btn-block" data-toggle="modal" data-target="#exampleModal">Get your result </button> 
        
                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel"> Quiz Result:  ${quiz.name}...</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div> 

                    <div class="modal-body"> 
                            <div class="media">
                            <img class="mr-3" width="200" height="autox" src="imgs/mona-lisa-test.jpg" alt="Generic placeholder image">
                            <div class="media-body">
                                <h5 class="mt-0">${quiz.results[2]}</h5>
                                
                            </div>
                        </div>
                    </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary btn-sm">Save results</button>
                            </div>
                        </div>
                    </div>
                </div> `;

        $('#game--questions').append(Q1 + Q2 + Q3 + Q4 + Q5 + Q6 + Q7 + Q8 + Q9 + Q10 + Q11 + Q12 + results);

    }
}




//Call function
getTrivia().then((resolve) => {
    console.log("line 33 of dom-builder.js make call for trivia resolve", resolve);
    makeGame(resolve);
    },
    (reject) => {
        console.log("DOH! something went wrong");
});


// $("#quiz-display-area").html(makeGame);

        

// Results of quiz and correct answers
// var results = 0;

module.exports = getTrivia();