// Clear selected picture from profile selection
var clearSelectedPicture = function() {
  // Get all images
  var images = $('.profileImages').children();
  // Remove class of selectedImage from each image
  for (let i = 0; i < images.length; i++) {
    var currentImage = $(images[i].children[0].children[0]);
    currentImage.removeClass("selectedImage");
  }
};

// Export clearSelectedPicture
module.exports = clearSelectedPicture;