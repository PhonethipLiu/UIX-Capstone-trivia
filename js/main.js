"use strict";

// console.log("Main.js is working");

let $ = require('jquery'),
    db = require("./new-db-interaction"),
    user = require("./new-user"),
    results = require("./new-results"),
    dom = require("./dom-builder"),
    firebase = require("./fb-config");


function loadResultsToDom() {
  console.log("**** DOM.js line 182: loadResultsToDom() going to load game results");
  let currentUser = user.getUser();
  
  console.log("**** DOM.js line 184: loadResultsToDom() Current User is...", currentUser);
  
  results.getResultDetails(currentUser)
    .then((resolve) => {
      console.log("**** DOM.js line 187: got resolve?" ,resolve);
      dom.makeResultObj(resolve);
    });
}

// bootstrap carousel
$(document).ready(function() {
  
  $('#myCarousel').on('slid.bs.carousel', function (e) {
    $('#myCarousel').carousel('2'); // Will slide to the slide 2 as soon as the transition to slide 1 is finished
  });

  // Send results data to db then reload DOM with updated user results
  
// user login
  $("#login").click(function() {
    console.log("clicked login");
    db.logInGoogle()
      .then((resolve) => {
        console.log("Main.js line 29 Resolve from login", resolve.user);
        
        user.setUserVars(resolve.user); /* this gets the user object*/
        user.checkUserFB(resolve.user.uid);
        
        $("#login").addClass("is-hidden");
        $("#logout").removeClass("is-hidden");
        
        user.showUser(resolve.user.displayName);
    });
  });

  $("#logout").click(() => {
    console.log("main.logout clicked");
    
    db.logOut();
    
    $("#login").removeClass("is-hidden");
    $("#logout").addClass("is-hidden");
    $("h3").remove();

  });

  //EVENT LISTENER FOR CLICKING CAROUSEL PIC
  $(".carousel-item").on("click", "#art--quiz", function() {
    console.log("carousel item art-quiz clicked");
    dom.loadGameResult();
  });
  
  
  //envoking the function to run event listener for modal results 
  $("#quiz-display-area").on("click", "#quiz-save-result", function() {
    console.log("hit the modal results save button:");

    results.makeResultObj();
    // dom.printResultObj();
  });

 // on click event listener to delete game results from firebase and the DOM

  // $("#user-game-result").on("click", ".delete-btn", function() {
  //   console.log("clicked delete quiz result button",$(this).closest(".saved-Results"));
  //   // let resultID = $(this).id("${currentResult.resultID}");
  //   // results.deleteResult(resultID)
  //   //   .then(() => {
  //   //     loadResultsToDom();
  //   //   });
  //   $($(this).closest(".saved-Results")).remove();

  // });

  $("#user-game-result").on("click", "#quiz-delete-result", function() {

    // console.log("clicked delete quiz result button",$(this).closest(".saved-Results"));

    // alert("hi");
    
    let resultsId = results.resultsId;
    results.deleteResult(resultsId);
      // .then(() => {
      //   loadResultsToDom();
      // });

    $($(this).closest(".saved-Results")).remove();

  });


});

