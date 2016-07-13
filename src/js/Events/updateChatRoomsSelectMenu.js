"use strict";

var firebaseApplication = require('../firebaseApplication');
var currentChatRoomReference = require('../currentChatRoomReference');

// Updates chatRoomsSelect with most recent chat room list
var updateChatRoomsSelectMenu = function() {

  // Clear select menu
  $('#chatRoomsSelect').html("");

  // Populate select menu with most update chatroom list
  firebaseApplication.once("value", function(snapshot) {

    // Get each child node
    snapshot.forEach(function(childSnapshot) {

      // Get name of current chat room being examined
      var chatRoomName = childSnapshot.key();
      // Get name of currentChatRoom
      var currentChatRoomName = currentChatRoomReference.get().path.u[0];

      // If chatRoomName is main
      if (chatRoomName === "main") {
        // If currentChatRoomReference is to main
        if (currentChatRoomName === "main") {
          // Create option item and have it titled Main and be selected
          let optionItem = `<option selected>Main</option>`;
          $('#chatRoomsSelect').append(optionItem);
        } else {
          // Otherwise, just create option item and have it titled Main
          let optionItem = `<option>Main</option>`;
          $('#chatRoomsSelect').append(optionItem);
        }
      } else {
        // Weed out users child
        if (chatRoomName !== "users") {
          // If this is the currentChatRoom set option as selected
          if (chatRoomName === currentChatRoomName) {
            let optionItem = `<option selected>${chatRoomName}</option>`;
            $('#chatRoomsSelect').append(optionItem);
          } else {
            // Otherwise create option normally
            let optionItem = `<option>${chatRoomName}</option>`;
            $('#chatRoomsSelect').append(optionItem);
          }
        }
      }

    });
  });
};

// Export updateChatRoomsSelectMenu
module.exports = updateChatRoomsSelectMenu;
