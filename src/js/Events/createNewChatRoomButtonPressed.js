"use strict";

var updateChatRoomsSelectMenu = require('./updateChatRoomsSelectMenu');

// Adds event listener to createNewChatRoomButton click event
var createNewChatRoomButtonPressed = function() {
  $('#createNewChatRoomButton').click(function() {
    // Update select menu
    updateChatRoomsSelectMenu();
    // Hide create new chat room button
    $('#createNewChatRoomButton').addClass("hidden");
    // Hide chatRoomsSelectLabel
    $('#chatRoomsSelectLabel').addClass("hidden");
    // Hide chat room select menu
    $('#chatRoomsSelect').addClass("hidden");
    // Show choose from existing rooms button
    $('#chooseFromExistingChatRoomsButton').removeClass("hidden");
    // Show new chat room input label
    $('#newChatRoomInputLabel').removeClass("hidden");
    // Show new chat room input
    $('#newChatRoomInput').removeClass("hidden");
  });
};

// export createNewChatRoomButtonPressed
module.exports = createNewChatRoomButtonPressed;
