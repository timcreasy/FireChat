var Chatty = (function(Chatty) {


  // ============= Handles messageCard selection =============== //
  Chatty.messageCardClicked = function() {

    // Ignore messageCard delete button being clicked
    if ( !$(event.target).hasClass("messageDeleteButton") ) {
      console.log("messageCardClicked");
    }

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