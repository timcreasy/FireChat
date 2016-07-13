"use strict";

var clearSelectedPicture = require('./clearSelectedPicture');

// Adds event listener to addOwnPictureButton click event
var addOwnPictureButtonPressed = function() {

  $('#addOwnPictureButton').click(function() {

    // Hide default pictures
    $('.profileImages').addClass('hidden');
    // Hide add own picture button
    $('#addOwnPictureButton').addClass('hidden');
    // Show choose from defaults picture button
    $('#chooseFromDefaultPicturesButton').removeClass('hidden');
    // Remove any selected pictures
    clearSelectedPicture();
    // Show label and input to add own pictures
    $('#profilePictureInputLabel').removeClass("hidden");
    $('#profilePictureInput').removeClass("hidden");

  });

};

// export addOwnPictureButtonPressed
module.exports = addOwnPictureButtonPressed;
