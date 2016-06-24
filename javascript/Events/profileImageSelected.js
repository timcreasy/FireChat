var clearSelectedPicture = require('./clearSelectedPicture');

// Default profile picture selected in profile modal
var profileImageSelected = function() {

  // If image selected
  if (event.target.tagName === "IMG") {
    // Clear previously selected picture
    clearSelectedPicture();
    // Set new picture as selectedImage
    $(event.target).addClass("selectedImage");
  }

};

// export profileImageSelected
module.exports = profileImageSelected;