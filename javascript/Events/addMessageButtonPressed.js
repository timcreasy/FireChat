var createMessageObject = require('../createMessageObject');
var currentUser = require('../currentUser');
var addMessageToFirebase = require('../addMessageToFirebase');

// Adds event listener to addMessageButton click event
var addMessageButtonPressed = function() {

  $('#addMessageButton').click(function() {

    // Clear any old errors
    $('#newMessageErrorOutput').html("");

    // If no message added, throw alert
    if ( $('#messageInput').val() === "" ) {

      // Build up alert
      var errorOutput = $('#newMessageErrorOutput');
      var errorContainer = $('<div class="alert alert-danger"></div>');

      // Add alert to modal
      errorContainer.append("Please enter a message");
      errorOutput.append(errorContainer);

    } else {

      // Get inputted message
      var messageText = $('#messageInput').val();

      // Create message object, with message text, and currentUser
      var message = createMessageObject( messageText, currentUser.get() );

      // Add message to firebase
      addMessageToFirebase(message);

      // Clear message field
      $('#editMessageInput').val("");

      // Clear error messages
      $('#editMessageErrorOutput').html("");

      // Dismiss modal
      $('#newMessageModal').modal('hide');

      // Clear inputted message
      $('#messageInput').val("")

      // Unbind enter listen
      $(document).unbind("keyup");
      
    }
  });
};

// export addMessageButtonPressed
module.exports = addMessageButtonPressed;