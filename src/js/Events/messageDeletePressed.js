"use strict";

var currentChatRoomReference = require('../currentChatRoomReference');

// Handles delete button being pressed on message
var messageDeletePressed = function() {

  // Get id of message which delete button was pressed on
  var messageID = event.target.parentElement.id.split("").splice(3).join("");

  // Remove message
  currentChatRoomReference.get().child(messageID).remove();

};

// Export messageDeletePressed
module.exports = messageDeletePressed;
