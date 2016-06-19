var Chatty = (function(Chatty) {


  // ============= New messsage button clicked in navbar =============== //
  Chatty.newMessageButtonClicked = function() {

    // Present new message modal
    $('#newMessageModal').modal('show');

  };



  // ============= Handles messageCard edit button pressed =============== //
  Chatty.messageEditClicked = function() {
    // Get ID of message clicked
    var messageID = event.target.parentNode.id.split("").splice(3).join("");
    console.log("Editing message:", messageID);
  };



  // ============= Handles messageCard delete button pressed =============== //
  Chatty.messageDeleteClicked = function() {

    // Get ID of message clicked
    var messageID = event.target.parentNode.id.split("").splice(3).join("");
    // Remove message based on id
    Chatty.firebaseMessagesRef.child(messageID).remove();

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