"use strict";


let firebase = require("./fb-config"),
    db = require("./db-interaction"),
    currentUser = {
        uid: null,
        fbID: null
    };
    

 // call logout when page loads to avoid currentUser.uid   
// db.logOut();

//listens for changed state
firebase.auth().onAuthStateChanged((user) => {
    console.log("onAuthStateChanged", user);
    if (user) {
        currentUser.uid = user.uid;
        console.log("current user Logged in?", currentUser.uid);
    } else {
        currentUser.uid = null;
        currentUser.fbID = null;
        console.log("curent user NOT logged in:", currentUser);
    }   
});

function getUser() {
    return currentUser.uid;
}

function setUser(val) {
    currentUser.uid = val;
}

//GET SAVE GAME RESULTS
function getUserResults(){
    return currentUser.results;
}

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

// function showUser(obj){
//     let userDetails = getUserObj();
//     console.log("user.showUser: userDetails:", userDetails);
// }

function checkUserFB(uid){
    db.getFBDetails(uid)
    .then((result) => {
        let data = Object.values(result);
        console.log("user: any data?", data.length);
        if (data.length === 0){
            console.log("need to add this user to FB", data);
            db.addUserFB(makeUserObj(uid))
            .then((result) => {
                console.log("user: user added", uid, result.name);
                let tmpUser = {
                    fbID: result.name,
                    uid: uid
                };
                return tmpUser;
            }).then((tmpUser) => {
                return setUserVars(tmpUser);
            });
        } else {
            console.log("user: already a user", data);
            var key = Object.keys(result);
            data[0].fbID = key[0];
            setUserVars(data[0]);
        }
    });
}
        
function makeUserObj(uid){
    let userObj = { 
        uid: uid }; 
    return userObj;
}

module.exports = { 
    checkUserFB,
    getUser,
    setUser,
    setUserVars,
    getUserObj,
    };