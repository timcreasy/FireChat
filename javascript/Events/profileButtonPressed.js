var profileImageSelected = require('./profileImageSelected');

// Adds event listener to profileButton click event
var profileButtonPressed = function() {

  $('#profileButton').click(function() {
    
    $('#profileModal').modal('show');

    // Add event listener for images
    $('.profileImages').click(profileImageSelected);

  });
};

// export profileButtonPressed
module.exports = profileButtonPressed;