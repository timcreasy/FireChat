var userList = require('../userList');
var currentUser = require('../currentUser');
var userList = require('../userList');

// Adds event listener to profileDoneButton click event
var profileDoneButtonPressed = function() {

  $('#profileDoneButton').click(function() {
    
    // If on image select screen
    if( $('#chooseFromDefaultPicturesButton').hasClass('hidden') ) {

      // Get selected picture
      let newProfilePicture = getSelectedPicture();

      // If an image was selected
      if(newProfilePicture !== null) {
        // Set profile image to selected image
        userList.child(currentUser.get().id).update({
          "profileImage": newProfilePicture
        });

        // Dismiss profile modal
        $('#profileModal').modal('hide');
      }

    } else {

      // Ensure input is not blank
      if ( $('#profilePictureInput').val() === "" ) {

        // Build up alert
        var errorOutput = $('#profileErrorOutput');
        var errorContainer = $('<div class="alert alert-danger"></div>');

        // Add alert to modal
        errorContainer.append("Please enter a valid URL to an image");
        errorOutput.append(errorContainer);

      } else {

        // Get new profile picture url
        var newProfilePictureURL = $('#profilePictureInput').val();

        // Set profile image to url
        userList.child(currentUser.get().id).set({
          "profileImage": newProfilePictureURL,
        });

        // Clear input field
        $('#profilePictureInput').val("");

        // Simulate click to go back to defaults
        $('#chooseFromDefaultPicturesButton').click();

        // Dismiss profile modal
        $('#profileModal').modal('hide');
      }
    }
    // Clear any errors
    $('#profileErrorOutput').html("");
  });
};

var getSelectedPicture = function() {
  // Get images
  var images = $('.profileImages').children();
  // Loop through each image
  for (let i = 0; i < images.length; i++) {
    var currentImage = $(images[i].children[0].children[0]);
    // If currentImage is selected
    if (currentImage.hasClass("selectedImage")) {
      return currentImage.attr("src");
    }
  }
  return null;
};


// export profileDoneButtonPressed
module.exports = profileDoneButtonPressed;