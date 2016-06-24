// Get currentChatRoomReference
var currentChatRoomReference = require('./currentChatRoomReference');
var writeMessageToDOM = require('./writeMessageToDOM');

// Messages container
var messagesContainer = $('#messagesContainer');

// addListenerToCurrentChatRooms
var addListenerToCurrentChatRoom = function() {
  // Adds listener for any message added, removed, or edited
  currentChatRoomReference.get().on("value", function(data) {
    // All messages
    var messages = data.val();
    // Clear DOM
    messagesContainer.html("");
    // Write each message to DOM
    for (var key in messages) {
      var currentMessage = messages[key];
      // Filter out '0' seed for new chat rooms
      if (currentMessage !== "0") {
        writeMessageToDOM(currentMessage, key);
      }
    }
  });
};

// export addListenerToCurrentChatRoom
module.exports =  addListenerToCurrentChatRoom;