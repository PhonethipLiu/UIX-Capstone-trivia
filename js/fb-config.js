"use strict";

console.log("Firebase config working");


// (function () {
// // Testing initialize Firebase
// const config = {
//     authoDomain: "",
//     databaseURL: "",
//     storageBucket:"",

// };
// firebase.intializeApp(config);


// //TestingGet elements
// const preObject = document.getElementById("xxxx");
// const ulList = document.getElementById('xxxx');


// //TestingCreate references
// const dbRefObject = firebase.database().ref().child("xxxx");
// const dbRefList = dbRefObject.child('hobbies');


// //Testing sync object changes
// dbRefObject.on('value', snap => {
//     preObject.innerText = JSON.stringify(snap.val(), null, 3);
    
    
//     console.log(snap.val());
// });//helps you see value of your object in fb; no value = null



// // Testing Syn list changes

// dbRefList.on('child_added', snap => {
    
//     const li = document.createElement('li');
//     li.innerText = snap.val();
//     li.id = snap.key;
//     upList.appendChild(li);
// });
// // Testing Child added event
// dbRefList.on('child_changed', snap => {
//     const liChanged = document.getElementById(snap, key);
//     liChanged.innerText = snap.val();
// });

// // Testing Child removed event
// dbRefList.on('child_removed', snap => {
//     const liToRemove = document.getElementById(snap, key);
//     liToRemove.remove();
// });


// console.log(snap.val()));





// }());