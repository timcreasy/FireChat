"use strict";

var currentUser = require('../currentUser');
var firebaseApplication = require('../firebaseApplication');
var rewriteAllMessages = require('../rewriteAllMessages');

// Adds event listener to logoutButton click event
var logoutButtonPressed = function() {

  $('#logoutButton').click(function() {
    // Log user out
    firebaseApplication.unauth();
    // Hide Profile button
    $('#profileButton').addClass("hidden");
    // Hide Log Out button
    $('#logoutButton').addClass("hidden");
    // Show Log in button
    $('#loginButton').removeClass("hidden");
    // Show register button
    $('#registerButton').removeClass("hidden");
    // Reset user header
    $('#userLoginHeader').html("Adding messages as Guest");
    // Reset current user to guest
    currentUser.set("Guest", "Guest");
    // Rewrite all messages
    rewriteAllMessages();
  });
};

// export logoutButtonPressed
module.exports = logoutButtonPressed;
