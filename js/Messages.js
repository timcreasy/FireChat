var Chatty = (function(Chatty) {

  // Holds message to edit
  Chatty.messageToEdit = null;


  // ============= New messsage button clicked in navbar =============== //
  Chatty.newMessageButtonClicked = function() {

    // Present new message modal
    $('#newMessageModal').modal('show');
    // Listen for enter key press
    $(document).unbind("keyup").keyup(function(e){ 
      var code = e.which; // recommended to use e.which, it's normalized across browsers
      if(code==13)
      {
          $("#addMessageButton").click();
      }
    });

  };



  // ============= Edits message =============== //
  Chatty.editMessage = function(editedMessage) {

    var editedTimestamp = "Edited: " + Chatty.getTimestamp();

      // Edit message
      Chatty.currentChatRoomRef.child(Chatty.messageToEdit).update({
        "message": editedMessage,
        "timestamp": editedTimestamp
      });

  };



  // ============= Edit message done button pressed =============== //
  Chatty.editMessageDoneButtonClicked = function() {

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
      Chatty.editMessage(editedMessage);

      // Dismiss edit message modal
      $('#editMessageModal').modal('hide');

      // Unbind enter key press listener
      $(document).unbind("keyup");

      // Clear message field
      $('#editMessageInput').val("");

      // Clear error messages
      $('#editMessageErrorOutput').html("");

      // Reset message to edit
      Chatty.messageToEdit = null;

    }

  };



  // ============= Handles messageCard edit button pressed =============== //
  Chatty.messageEditClicked = function() {
    
    // Get ID of message clicked
    Chatty.messageToEdit = event.target.parentNode.id.split("").splice(3).join("");
    
    // Show edit message modal
    $('#editMessageModal').modal('show');

    // Listen for enter key press
    $(document).unbind("keyup").keyup(function(e){ 
      var code = e.which; // recommended to use e.which, it's normalized across browsers
      if(code==13)
      {
          $("#editMessageDoneButton").click();
      }
    });

  };



  // ============= Handles messageCard delete button pressed =============== //
  Chatty.messageDeleteClicked = function() {

    // Get ID of message clicked
    var messageID = event.target.parentNode.id.split("").splice(3).join("");
    // Remove message based on id
    Chatty.currentChatRoomRef.child(messageID).remove();

  };



  // ============= Add message button clicked in modal =============== //
  Chatty.addMessageButtonClicked = function() {

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

      // Unbind enter key presss
      $(document).unbind("keyup");

      // Get inputted message
      var messageText = $('#messageInput').val();

      // Get user info
      var userName;
      // If a user is logged in, set userName equal to user's email
      if (Chatty.currentUser !== null) {
        userName = Chatty.currentUser;
      } else {
        // Otherwise create message as Guest
        userName = "Guest";
      }

      // Get timestamp
      var timestamp = Chatty.getTimestamp();

      // Get userID
      var userID = null;

      if (Chatty.currentUserID !== null) {
        userID = Chatty.currentUserID;
      } else {
        userID = "Guest";
      }

      // Create a newMessage object based on inputs
      var newMessage = {
        "message": messageText,
        "user": userName,
        "timestamp": timestamp,
        "userID": userID
      };

      // Add newMessage to firebase
      Chatty.addMessageToFirebase(newMessage);

      // Clear message input field
      $('#messageInput').val("");

      // Dismiss new message modal
      $('#newMessageModal').modal('hide');

    }

  };

  // Return augmented Chatty
  return Chatty;

})(Chatty || {});