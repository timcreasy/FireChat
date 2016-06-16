var Chatty = (function(Chatty) {

  // ============= Firebase events =============== //
  Chatty.addFirebaseEvents = function() {

    // Retrieve new posts as they are added to our database
    Chatty.firebaseRef.on("child_added", function(snapshot) {
      // Get message
      var newMessage = snapshot.val();
      // Write message to DOM
      Chatty.writeMessageToDOM(newMessage);
    });

  };


  // ============= Handles messageCard selection =============== //
  Chatty.messageCardClicked = function() {

    // Ignore messageCard delete button being clicked
    if ( !$(event.target).hasClass("messageDeleteButton") ) {
      console.log("messageCardClicked");
    }

  };


  // ============= Handles messageCard delete button pressed =============== //
  Chatty.addNewMessageClicked = function() {

    var messageText = $('#messageInput').val();
    var userName = $('#userNameInput').val();
    var messageID = Chatty.getUniqueID();

    var newMessage = {
      "message": messageText,
      "user": userName,
      "messageID": messageID
    };

    Chatty.addMessageToFirebase(newMessage);

  };


  // ============= Handles messageCard delete button pressed =============== //
  Chatty.messageDeleteClicked = function() {

    // Get currentMessageCard
    var currentMessageCard = event.target.parentNode;

    // Get currentMessageID
    var currentMessageID = Chatty.getMessageID(currentMessageCard);

    // Get array of messages
    var messages = Chatty.getMessages();

    // Search array of messages for matching id
    var foundMessageIndex = Chatty.findMessageByID(currentMessageID);

    // Remove found message from array of messages
    Chatty.removeMessageByID(foundMessageIndex);

    // Remove all messages from DOM
    Chatty.clearAllMessages();

    // Add updated array of messages to DOM
    Chatty.writeAllMessagesToDOM();

  };


  // Return augmentted Chatty framework
  return Chatty;

})(Chatty || {});