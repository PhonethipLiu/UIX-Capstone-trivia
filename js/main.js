"use strict";

// console.log("Main.js is working");

let $ = require('jquery'),
  db = require("./new-db-interaction"),
  user = require("./new-user"),
  results = require("./new-results"),
  dom = require("./dom-builder"),
  firebase = require("./fb-config");


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

$("#quiz-delete-result").on("click", "#user-game-result", function() {
  console.log("hit delete quiz result button");
$("#user-game-result").remove();
results.deleteResult(user.getUser());
});
 


});

