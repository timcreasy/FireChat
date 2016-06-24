var currentChatRoomReference = require('../currentChatRoomReference');
var addListenerToCurrentChatRoom = require('../addListenerToCurrentChatRoom');
var firebaseApplication = require('../firebaseApplication');

// Logic for when chatRoomsJoinButton is pressed
var chatRoomsJoinButtonPressed = function() {

  $('#chatRoomsJoinButton').click(function() {
    // If on select menu
    if ( $('#chooseFromExistingChatRoomsButton').hasClass("hidden") ) {

      // Get selected chat room based on input
      var chatRoomToJoin = $('#chatRoomsSelect :selected').text();
      // change Main to main
      var chatRoomToJoinName = null;
      if (chatRoomToJoin === "Main") {
        chatRoomToJoinName = "main";
      } else {
        chatRoomToJoinName = chatRoomToJoin;
      }

      // Set new chat room
      currentChatRoomReference.set(chatRoomToJoinName);

      // Empty messages container
      $('#messagesContainer').html('');

      // Add listener for this chat room for any value change (new message, remove message, editing)
      addListenerToCurrentChatRoom();

      // Change chat room header text
      $('#chatRoomNameHeader').html(chatRoomToJoin);

      // Unbind enter event listener
      $(document).unbind("keyup")

      // Hide new chat room modal
      $('#chatRoomsModal').modal('hide');


    // If on custom chat room screen
    } else {

      // If input is empty, throw error
      if ( $('#newChatRoomInput').val() === "" ) {

        // Build up alert
        var errorOutput = $('#chatRoomsErrorOutput');
        var errorContainer = $('<div class="alert alert-danger"></div>');

        // Add alert to modal
        errorContainer.append("Please enter a new chat room name");
        errorOutput.append(errorContainer);

      } else {

        // Create new chat room based on input
        var newChatRoomName = $('#newChatRoomInput').val();
        firebaseApplication.child(newChatRoomName).push("0");

        // Set new chat room
        currentChatRoomReference.set(newChatRoomName);

        // Add listener for this chat room for any value change (new message, remove message, editing)
        addListenerToCurrentChatRoom();

        // Change chat room header text
        $('#chatRoomNameHeader').html(newChatRoomName);

        // Unbind enter event listener
        $(document).unbind("keyup")

        // Hide new chat room modal
        $('#chatRoomsModal').modal('hide');

      }

    }

    // Clear select menu
    $('#chatRoomsSelect').html("");
  });
};

// Export chatRoomsJoinButtonPressed
module.exports = chatRoomsJoinButtonPressed;