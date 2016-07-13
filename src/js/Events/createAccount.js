"use strict";

var firebaseApplication = require('../firebaseApplication');
var userList = require('../userList');

// Logic for when account is to be created
var createAccount = function(userEmail, userPassword) {

  firebaseApplication.createUser({
    "email": userEmail,
    "password": userPassword
  }, function(error, userData) {

    if (error) {

      console.log(error);
      // Build up alert
      var errorOutput = $('#registerErrorOutput');
      var errorContainer = $('<div class="alert alert-danger"></div>');

      // Add alert to modal
      errorContainer.append(error);
      errorOutput.append(errorContainer);

    } else {

      var defaultPicture = '../imgs/profile/guest.jpg';

      // Set default profile picture
      userList.child(userData.uid).set({
        "profileImage": defaultPicture
      });

      // Unbind enter key press listener
      $(document).unbind("keyup");

    }

  });

};

// Export createAccount
module.exports = createAccount;
