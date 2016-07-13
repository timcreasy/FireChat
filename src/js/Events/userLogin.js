"use strict";

var currentUser = require('../currentUser');
var userReference = require('../userList');
var rewriteAllMessages = require('../rewriteAllMessages');

// Logic for when user logs in
var userLogin = function(userEmail, userPassword) {

  userReference.authWithPassword({
    "email": userEmail,
    "password": userPassword
  }, function(error, authData) {
    if(error) {
      // Pass error to present to user
      loginFailure(error);
    } else {
      // Show header with user login
      $('#userLoginHeader').html("Adding messages as " + authData.password.email);
      // Pass authData to loginSuccess
      loginSuccess(authData.password.email, authData.uid);
    }
  }, {
    remember: "sessionOnly"
  });

};

// Login failed
var loginFailure = function(error) {

  // Build up alert
  var errorOutput = $('#loginErrorOutput');
  var errorContainer = $('<div class="alert alert-danger"></div>');

  // Add alert to modal
  errorContainer.append(error);
  errorOutput.append(errorContainer);

};

// Login succeeded
var loginSuccess = function(userEmail, userID) {
  // Show Profile button
  $('#profileButton').removeClass("hidden");
  // Add styling to profile button
  $('#profileButton').addClass("btn btn-default");
  // Show Log out button
  $('#logoutButton').removeClass("hidden");
  // Add styling to log out button
  $('#logoutButton').addClass("btn btn-danger");
  // Hide log in button
  $('#loginButton').addClass("hidden");
  // Hide register button
  $('#registerButton').addClass("hidden");
  // Set current user to be logged in user
  currentUser.set(userEmail, userID);
  // Rewrite all messages
  rewriteAllMessages();
  // Clear loginEmailInput
  $('#loginEmailInput').val("");
  // Clear loginPasswordInput
  $('#loginPasswordInput').val("");
  // Unbind enter key press listener
  $(document).unbind("keyup");
  // Dismiss login modal
  $('#loginUserModal').modal('hide');
};

// export userLogin
module.exports =  userLogin;
