"use strict";

console.log("Main.js is working");

let $ = require('jquery'),
  db = require("./db-interaction"),
  templates = require("./dom-builder"),
  user = require("./user");
  
// bootstrap carousel
$(document).ready(function() {
    // All the JavaScript that depends on jQuery will be written here
    $('.carousel').carousel({
        interval: 5000
      });
    
      $('#myCarousel').on('slid.bs.carousel', function (e) {
        $('#myCarousel').carousel('2'); // Will slide to the slide 2 as soon as the transition to slide 1 is finished
      });
  });

