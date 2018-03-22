"use strict";

console.log("Main.js is working");

let $ = require('jquery'),
  db = require("./db-interaction"),
  templates = require("./dom-builder"),
  user = require("./user");

let firebase = require("./fb-config");

// bootstrap carousel
$(document).ready(function() {
  $('#myCarousel').on('slid.bs.carousel', function (e) {
    $('#myCarousel').carousel('2'); // Will slide to the slide 2 as soon as the transition to slide 1 is finished
  });
});

// user login
$('#login').click(function() {
    console.log("clicked login");
    db.logInGoogle()
    .then((result) => {
    console.log("result from login", result.user.uid);
    user.setUser(result.user.uid);
    $("#login").addClass("is-hidden");
    $("#logout").removeClass("is-hidden");
    user.checkUserFB(result.user.uid);
    });
});

$("#logout").click(() => {
    console.log("main.logout clicked");
    db.logOut();
    $("#login").removeClass("is-hidden");
    $("#logout").addClass("is-hidden");
});

// click event listener for images to trigger build game




