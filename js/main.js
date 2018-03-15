"use strict";

console.log("Main.js is working");


// bootstrap carousel
$(document).ready(function() {
    // All the JavaScript that depends on jQuery will be written here

    $('.carousel').carousel({
        interval: 2000
      });
    
      $('#myCarousel').on('slid.bs.carousel', function (e) {
        $('#myCarousel').carousel('2'); // Will slide to the slide 2 as soon as the transition to slide 1 is finished
      });
  });

  
//   $('#myCarousel').carousel('1') // Will start sliding to the slide 1 and returns to the caller
//   $('#myCarousel').carousel('2') // !! Will be ignored, as the transition to the slide 1 is not finished !!
  