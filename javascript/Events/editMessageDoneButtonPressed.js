var currentChatRoomReference = require('../currentChatRoomReference');
var messageToEdit = require('../messageToEdit');
var getTimestamp = require('../timestamp.js');

// Handles done button being pressed on edit message modal
var editMessageDoneButtonPressed = function() {

  $('#editMessageDoneButton').click(function() {

    // If no message added, throw alert
    if ( $('#editMessageInput').val() === "" ) {

      // Build up alert
      var errorOutput = $('#editMessageErrorOutput');
      var errorContainer = $('<div class="alert alert-danger"></div>');

      // Add alert to modal
      errorContainer.append("Please enter a message");
      errorOutput.append(errorContainer);

    } else {

      var editedMessage = $('#editMessageInput').val();

      // Edit message
      editMessage(editedMessage);

      // Dismiss edit message modal
      $('#editMessageModal').modal('hide');

      // Unbind enter key press listener
      $(document).unbind("keyup");

      // Clear message field
      $('#editMessageInput').val("");

      // Clear error messages
      $('#editMessageErrorOutput').html("");

      // Reset message to edit
      messageToEdit.set(null);
    }
  });
};

var editMessage = function(editedMessage) {

  var editedTimestamp = "Edited: " + getTimestamp();

  // Edit message
  currentChatRoomReference.get().child(messageToEdit.get()).update({
    "message": editedMessage,
    "timestamp": editedTimestamp
  });

};

// Export messageEditPressed
module.exports = editMessageDoneButtonPressed;