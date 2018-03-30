"use strict";

// console.log("Firebase config working");

let firebase = require("firebase/app"),
    fb = require("./fb-key"),
    fbData = fb();

require("firebase/auth");
require("firebase/database");

// (function () {
// Initialize Firebase
var config = {
    apiKey: fbData.apiKey,
    authDomain: fbData.authDomain,
    databaseURL: fbData.databaseURL,
    projectId: fbData.projectId,
    storageBucket: fbData.storageBucket
};
firebase.initializeApp(config);

firebase.getFBsettings = () => {
    //   console.log("firebase getFBsettings", config);
      return config;
};

module.exports = firebase;