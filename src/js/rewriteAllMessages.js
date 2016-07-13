"use strict";

var currentChatRoomReference = require('./currentChatRoomReference');
var writeMessageToDOM = require('./writeMessageToDOM');

// Rewrites all messages on DOM
var rewriteAllMessages = function() {

  // First, clear DOM
  $('#messagesContainer').html("");

  // Get all messages
  currentChatRoomReference.get().once("value", function(data) {
    // Store all messages
    var messages = data.val();
    // Loop through each message
    for (var key in messages) {
      // Get current message
      var currentMessage = messages[key];
      // Ignore seed '0' in chat rooms
      if(currentMessage !== "0") {
        // Write currentMessage to DOM
        writeMessageToDOM(currentMessage, key);
      }
    }

  });

};

// export rewriteAllMessages
module.exports = rewriteAllMessages;
