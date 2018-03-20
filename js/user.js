"use strict";

let firebase = require("./fb-config"),
    db = require("./db-interaction"),
    currentUser = {
        uid: null,
        fbID: null
    };
    

//listens for changed state
firebase.auth().onAuthStateChanged((user)=> {
    console.log("onAuthStateChanged", user);
    if (user) {
        currentUser.uid = user.uid;
        console.log("current user Logged in?", currentUser);
    } else {
        currentUser.uid = null;
        currentUser.fbID = null;
        console.log("curent user NOT logged in:", currentUser);
    }   
});

// function logInGoogle() {
//     return firebase.auth().signInWithPopup(provider); 
// }

// function logOut (){
//     return firebase.auth().signOut();
// }

function getUser() {
    return currentUser.uid;
}

function setUser(val) {
    currentUser.uid = val;
}

//GET SAVE GAME RESULTS
// function getUserResults(){
//     return currentUser.results;
// }

function getUserObj(){
    return currentUser;
}

function setUserVars(obj){
    console.log("user.setUserVars: obj", obj);
    return new Promise((resolve, reject) => {
        currentUser.fbId = obj.fbID ? obj.fbID : currentUser.fbID;
        currentUser.uid = obj.uid ? obj.uid : currentUser.uid;
        resolve(currentUser);
    });
}




module.exports = { getUser, setUser};