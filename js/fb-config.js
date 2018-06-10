"use strict";

// console.log("Firebase config working");

import firebase, { initializeApp, getFBsettings } from "firebase/app";
import fb from "./fb-key";
let fbData = fb();

import "firebase/auth";import "firebase/database";
// (function () {
// Initialize Firebase
var config = {
    apiKey: fbData.apiKey,
    authDomain: fbData.authDomain,
    databaseURL: fbData.databaseURL,
    projectId: fbData.projectId,
    storageBucket: fbData.storageBucket
};
initializeApp(config);

getFBsettings = () => {
    //   console.log("firebase getFBsettings", config);
      return config;
};

export default firebase;