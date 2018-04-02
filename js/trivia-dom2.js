
//trivia game 2

// function makeGame(trivia1){
//     console.log("line 28 of dom-builder.js get function makeGame(game)", trivia1);
    
//     if (trivia1) {
//         var quiz2 = trivia[1];
//         $("#quiz-display-area").append(
//             `<label class="kicker"> ${quiz2.gameId}</label>
//              <h2>${quiz2.name}</h2>  
//              <ol class= "game" id="game--questions"> </ol>
//              <button class="btn btn-secondary btn-lg btn-block" data-toggle="modal" data-target="#exampleModal" id="modal--btn"> Get your result </button> 
//                 <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
//                     <div class="modal-dialog" role="document">
//                         <div class="modal-content">
//                             <div class="modal-header">
//                             <h5 class="modal-title" id="exampleModalLabel"> Quiz Result: ${quiz2.name}...</h5>
//                             <button class="close" data-dismiss="modal" aria-label="Close">
//                             <span aria-hidden="true">&times;</span></button>
//                             </div> 

//                         <div class="modal-body"> 
//                             <div class="media">
//                             <img class="mr-3" width="200" height="autox" src="imgs/mona-lisa-test.jpg" alt="Generic placeholder image">
//                                 <div class="media-body">
//                                     <h5 class="mt-0">${quiz2.results[2]}</h5>
//                                 </div>
//                             </div>
//                         </div>
//                         <div class="modal-footer">
//                             <button class="btn btn-secondary btn-sm" data-dismiss="modal">Close</button>
//                             <button class="btn btn-primary btn-sm" id="${quiz2.results[this]}">Save results</button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>`);
//         console.log(" line 202 of dom-builder.jsmakeGame trivia[1] data: ", quiz2.name);
//         console.log("line 203 of dom-builder.js trivia[1] firebase content:", quiz2);
            
//             let Q1 =`<li> <h5>${quiz2.q1}</h5>
//                     <div class="btn-group-toggle" data-toggle="buttons">
//                     <label class="btn btn-outline-secondary btn-sm"> <input type="radio" autocomplete="off" id="game--btn-01" > ${quiz2.a1[0]}</label>
//                     <label class="btn btn-outline-secondary btn-sm"> <input type="radio" autocomplete="off" id="game--btn-02" > ${quiz2.a1[1]}</label>
//                     <label class="btn btn-outline-secondary btn-sm"> <input type="radio" autocomplete="off" id="game--btn-03" > ${quiz2.a1[2]}</label>
//                     <label class="btn btn-outline-secondary btn-sm"> <input type="radio" autocomplete="off" id="game--btn-04" > ${quiz2.a1[3]}</label>
//                     </div> </li>`,

//                 Q2 =`<li> <h5>${quiz2.q2}</h5>
//                     <div class="btn-group-toggle" data-toggle="buttons">
//                     <label class="btn btn-outline-secondary btn-sm"> <input type="radio" autocomplete="off" id="game--btn-05" > ${quiz2.a2[0]} </label>
//                     <label class="btn btn-outline-secondary btn-sm"> <input type="radio" autocomplete="off" id="game--btn-06" > ${quiz2.a2[1]} </label>
//                     <label class="btn btn-outline-secondary btn-sm"> <input type="radio" autocomplete="off" id="game--btn-07" > ${quiz2.a2[2]} </label>
//                     <label class="btn btn-outline-secondary btn-sm"> <input type="radio" autocomplete="off" id="game--btn-08" > ${quiz2.a2[3]} </label>
//                     </div> </li>`,

//                 Q3 = `<li> <h5>${quiz2.q3}</h5>
//                     <div class="btn-group-toggle" data-toggle="buttons">
//                     <label class="btn btn-outline-secondary btn-sm"> <input type="radio" autocomplete="off" id="game--btn-09"> ${quiz2.a3[0]} </label>
//                     <label class="btn btn-outline-secondary btn-sm"> <input type="radio" autocomplete="off" id="game--btn$-10"> ${quiz2.a3[1]} </label>
//                     <label class="btn btn-outline-secondary btn-sm"> <input type="radio" autocomplete="off" id="game--btn$-11"> ${quiz2.a3[2]} </label>
//                     <label class="btn btn-outline-secondary btn-sm"> <input type="radio" autocomplete="off" id="game--btn$-12"> ${quiz2.a3[3]} </label>
//                     </div> </li>`,

//                 Q4 =`<li> <h5>${quiz2.q4}</h5>
//                     <div class="btn-group-toggle" data-toggle="buttons">
//                     <label class="btn btn-outline-secondary btn-sm"> <input type="radio" autocomplete="off" id="game--btn-13" > ${quiz2.a4[0]} </label>
//                     <label class="btn btn-outline-secondary btn-sm"> <input type="radio" autocomplete="off" id="game--btn-14" > ${quiz2.a4[1]} </label>
//                     <label class="btn btn-outline-secondary btn-sm"> <input type="radio" autocomplete="off" id="game--btn-15" > ${quiz2.a4[2]} </label>
//                     <label class="btn btn-outline-secondary btn-sm"> <input type="radio" autocomplete="off" id="game--btn-16" > ${quiz2.a4[3]} </label>
//                     </div> </li>`,

//                 Q5 =`<li> <h5>${quiz2.q5}</h5>
//                     <div class="btn-group-toggle" data-toggle="buttons">
//                     <label class="btn btn-outline-secondary btn-sm"> <input type="radio" autocomplete="off" id="game--btn-17" > ${quiz2.a5[0]} </label>
//                     <label class="btn btn-outline-secondary btn-sm"> <input type="radio" autocomplete="off" id="game--btn-18" > ${quiz2.a5[1]} </label>
//                     <label class="btn btn-outline-secondary btn-sm"> <input type="radio" autocomplete="off" id="game--btn-19" > ${quiz2.a5[2]} </label>
//                     <label class="btn btn-outline-secondary btn-sm"> <input type="radio" autocomplete="off" id="game--btn-20" > ${quiz2.a5[3]} </label>
//                     </div> </li>`,

//                 Q6 = `<li> <h5>${quiz2.q6}</h5>
//                     <div class="btn-group-toggle" data-toggle="buttons">
//                     <label class="btn btn-outline-secondary btn-sm"> <input type="radio" autocomplete="off" id="game--btn-21" > ${quiz2.a6[0]} </label>
//                     <label class="btn btn-outline-secondary btn-sm"> <input type="radio" autocomplete="off" id="game--btn-22" > ${quiz2.a6[1]} </label>
//                     <label class="btn btn-outline-secondary btn-sm"> <input type="radio" autocomplete="off" id="game--btn-23" > ${quiz2.a6[2]} </label>
//                     <label class="btn btn-outline-secondary btn-sm"> <input type="radio" autocomplete="off" id="game--btn-24" > ${quiz2.a6[3]} </label>
//                     </div> </li>`,

//                 Q7 =`<li> <h5>${quiz2.q7}</h5>
//                     <div class="btn-group-toggle" data-toggle="buttons">
//                     <label class="btn btn-outline-secondary btn-sm"> <input type="radio" autocomplete="off" id="game--btn-25" > ${quiz2.a7[0]} </label>
//                     <label class="btn btn-outline-secondary btn-sm"> <input type="radio" autocomplete="off" id="game--btn-26" > ${quiz2.a7[1]} </label>
//                     <label class="btn btn-outline-secondary btn-sm"> <input type="radio" autocomplete="off" id="game--btn-27"> ${quiz2.a7[2]} </label>
//                     <label class="btn btn-outline-secondary btn-sm"> <input type="radio" autocomplete="off" id="game--btn-28" > ${quiz2.a7[3]} </label>
//                     </div> </li>`,

//                 Q8 =`<li> <h5>${quiz2.q8}</h5>
//                     <div class="btn-group-toggle" data-toggle="buttons">
//                     <label class="btn btn-outline-secondary btn-sm"> <input type="radio" autocomplete="off" id="game--btn-29" > ${quiz2.a8[0]} </label>
//                     <label class="btn btn-outline-secondary btn-sm"> <input type="radio" autocomplete="off" id="game--btn-30" > ${quiz2.a8[1]} </label>
//                     <label class="btn btn-outline-secondary btn-sm"> <input type="radio" autocomplete="off" id="game--btn-31" > ${quiz2.a8[2]} </label>
//                     <label class="btn btn-outline-secondary btn-sm"> <input type="radio" autocomplete="off" id="game--btn-32" > ${quiz2.a8[3]} </label>
//                     </div> </li>`,

//                 Q9 = `<li> <h5>${quiz2.q9}</h5>
//                     <div class="btn-group-toggle" data-toggle="buttons">
//                     <label class="btn btn-outline-secondary btn-sm"> <input type="radio" autocomplete="off" id="game--btn-33"> ${quiz2.a9[0]} </label>
//                     <label class="btn btn-outline-secondary btn-sm"> <input type="radio" autocomplete="off" id="game--btn-34"> ${quiz2.a9[1]} </label>
//                     <label class="btn btn-outline-secondary btn-sm">  <input type="radio" autocomplete="off" id="game--btn-35"> ${quiz2.a9[2]} </label>
//                     <label class="btn btn-outline-secondary btn-sm"> <input type="radio" autocomplete="off" id="game--btn-36"> ${quiz2.a9[3]} </label>
//                     </div> </li>`,
                
//                 Q10 =`<li> <h5>${quiz2.q10}</h5>
//                     <div class="btn-group-toggle" data-toggle="buttons">
//                     <label class="btn btn-outline-secondary btn-sm"> <input type="radio" autocomplete="off" id="game--btn-37">${quiz2.a10[0]} </label>
//                     <label class="btn btn-outline-secondary btn-sm"> <input type="radio" autocomplete="off" id="game--btn-38">${quiz2.a10[1]} </label>
//                     <label class="btn btn-outline-secondary btn-sm"> <input type="radio" autocomplete="off" id="game--btn-39">${quiz2.a10[2]} </label>
//                     <label class="btn btn-outline-secondary btn-sm"> <input type="radio" autocomplete="off" id="game--btn-40"> ${quiz2.a10[3]} </label>
//                     </div> </li>`,

//                 Q11 =`<li> <h5>${quiz2.q11}</h5>
//                     <div class="btn-group-toggle" data-toggle="buttons">
//                     <label class="btn btn-outline-secondary btn-sm"> <input type="radio" autocomplete="off" id="game--btn-41" >${quiz2.a11[0]} </label>
//                     <label class="btn btn-outline-secondary btn-sm"> <input type="radio" autocomplete="off" id="game--btn-42"> ${quiz2.a11[1]} </label>
//                     <label class="btn btn-outline-secondary btn-sm"> <input type="radio" autocomplete="off" id="game--btn-43">${quiz2.a11[2]} </label>
//                     <label class="btn btn-outline-secondary btn-sm"> <input type="radio" autocomplete="off" id="game--btn-44">${quiz2.a11[3]} </label>
//                     </div> </li>`,

//                 Q12 = `<li> <h5>${quiz2.q12}</h5>
//                     <div class="btn-group-toggle" data-toggle="buttons">
//                     <label class="btn btn-outline-secondary btn-sm"> <input type="radio" autocomplete="off" id="game--btn-45"> ${quiz2.a12[0]} </label>
//                     <label class="btn btn-outline-secondary btn-sm"> <input type="radio" autocomplete="off" id="game--btn-46"> ${quiz2.a12[1]} </label>
//                     <label class="btn btn-outline-secondary btn-sm"> <input type="radio" autocomplete="off" id="game--btn-47"> ${quiz2.a12[2]} </label>
//                     <label class="btn btn-outline-secondary btn-sm "> <input type="radio" autocomplete="off" id="game--btn-48"> ${quiz2.a12[3]} </label>
//                     </div>  </li>`;

//         $('#game--questions').append(Q1 + Q2 + Q3 + Q4 + Q5 + Q6 + Q7 + Q8 + Q9 + Q10 + Q11 + Q12);
//     }
// }

