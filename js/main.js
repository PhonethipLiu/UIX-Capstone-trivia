"use strict";

// console.log("Main.js is working");

let $ = require('jquery'),
  db = require("./db-interaction"),
  templates = require("./dom-builder"),
  user = require("./user"),
  results = require("./results"),
  firebase = require("./fb-config");


// bootstrap carousel
$(document).ready(function() {
  $('#myCarousel').on('slid.bs.carousel', function (e) {
    $('#myCarousel').carousel('2'); // Will slide to the slide 2 as soon as the transition to slide 1 is finished
  });
  // Send results data to db then reload DOM with updated user results
  $("#quiz-save-result").click(function() {
  console.log("hit the modal results save button:");
  });
});

// user login
$('#login').click(function() {
    console.log("clicked login");
    db.logInGoogle()
    .then((results) => {
    // console.log("result from login", result.user.uid);
    user.setUser(results.user.uid);
    $("#login").addClass("is-hidden");
    $("#logout").removeClass("is-hidden");
    user.checkUserFB(results.user.uid);
    });
});

$("#logout").click(() => {
    console.log("main.logout clicked");
    db.logOut();
    $("#login").removeClass("is-hidden");
    $("#logout").addClass("is-hidden");
});

// click event listener for images to trigger build game

// function loadGamesToDom(){
//   console.log("Main.js line 42 need to load game results");
// }
// Envoking function
// loadGamesToDom();/* may have to move to a different section */



