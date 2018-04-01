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
    });
  });

  $("#logout").click(() => {
    console.log("main.logout clicked");
    db.logOut();
    $("#login").removeClass("is-hidden");
    $("#logout").addClass("is-hidden");
  });

  $("#art--quiz").on((e) => {
    dom.makeGame();
    });
  // envoking the function to run event listener for modal results 
  $("#quiz-save-result").click(function() {
  console.log("hit the modal results save button:");
  results.makeResultObj();
  });

 // on click event listener for images to trigger build game

 


// Envoking function
// loadGameResult();/* may have to move to a different section */

});

