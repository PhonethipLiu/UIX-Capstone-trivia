"use strict";

// console.log("Main.js is working");

let $ = require('jquery'),
  db = require("./db-interaction"),
  templates = require("./dom-builder"),
  user = require("./user"),
  results = require("./results"),
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
    console.log("Main.js line 29 Resolve from login", resolve.user.uid);
    user.setUser(resolve.user.uid);
    $("#login").addClass("is-hidden");
    $("#logout").removeClass("is-hidden");
    user.checkUserFB(resolve.user.uid);
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
  dom.buildResultObj(); 
  });

 // on click event listener to delete game results from firebase and the DOM

$(".delete-btn").on("click", "#user-game-result", function() {
  console.log("hit delete quiz result button");
$("#user-game-result > div").remove();
results.deleteResult();
});
 


});

