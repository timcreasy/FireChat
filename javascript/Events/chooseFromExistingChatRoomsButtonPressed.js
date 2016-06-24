// Adds event listener to chooseFromExistingChatRoomsButton click event
var chooseFromExistingChatRoomsButtonPressed = function() {
  $('#chooseFromExistingChatRoomsButton').click(function() {
    // Show create new chat room button
    $('#createNewChatRoomButton').removeClass("hidden");
    // Show chatRoomsSelectLabel
    $('#chatRoomsSelectLabel').removeClass("hidden");
    // Show chat room select menu
    $('#chatRoomsSelect').removeClass("hidden");
    // Hide choose from existing rooms button
    $('#chooseFromExistingChatRoomsButton').addClass("hidden");
    // Hide new chat room input label
    $('#newChatRoomInputLabel').addClass("hidden");
    // Hide new chat room input
    $('#newChatRoomInput').addClass("hidden");
  });
};

// export chooseFromExistingChatRoomsButtonPressed
module.exports = chooseFromExistingChatRoomsButtonPressed;