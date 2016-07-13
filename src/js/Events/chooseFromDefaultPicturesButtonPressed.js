"use strict";

// Adds event listener to chooseFromDefaultPicturesButton click event
var chooseFromDefaultPicturesButtonPressed = function() {

  $('#chooseFromDefaultPicturesButton').click(function() {

    // Clear any lingering errors
    $('#profileErrorOutput').html("");
    // Show add own picture button
    $('#addOwnPictureButton').removeClass('hidden');
    // Hide choose from defaults picture button
    $('#chooseFromDefaultPicturesButton').addClass('hidden');
    // Clear any input from field
    $('#profilePictureInput').val("");
    // Show default pictures
    $('.profileImages').removeClass('hidden');
    // Hide label and input to add own pictures
    $('#profilePictureInputLabel').addClass("hidden");
    $('#profilePictureInput').addClass("hidden");

  });

};

// export chooseFromDefaultPicturesButtonPressed
module.exports = chooseFromDefaultPicturesButtonPressed;
