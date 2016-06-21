var Chatty = (function(Chatty) {



  // ============= Choose from existing chat room button clicked =============== //
  Chatty.chooseFromExistingChatRoomsButtonClicked = function() {
    // Show create new chat room button
    $('#createNewChatRoomButton').removeClass("hidden");
    // Show chat room select menu
    $('#chatRoomsSelect').removeClass("hidden");
    // Hide choose from existing rooms button
    $('#chooseFromExistingChatRoomsButton').addClass("hidden");
    // Hide new chat room input label
    $('#newChatRoomInputLabel').addClass("hidden");
    // Hide new chat room input
    $('#newChatRoomInput').addClass("hidden");
  };


  // ============= Create new chat room button clicked =============== //
  Chatty.createNewChatRoomButtonClicked = function() {
    // Update select menu
    Chatty.updateChattySelectMenu();
    // Hide create new chat room button
    $('#createNewChatRoomButton').addClass("hidden");
    // Hide chat room select menu
    $('#chatRoomsSelect').addClass("hidden");
    // Show choose from existing rooms button
    $('#chooseFromExistingChatRoomsButton').removeClass("hidden");
    // Show new chat room input label
    $('#newChatRoomInputLabel').removeClass("hidden");
    // Show new chat room input
    $('#newChatRoomInput').removeClass("hidden");
    // Clear select menu
    $('#chatRoomsSelect').html("");
  };


  Chatty.updateChattySelectMenu = function() {

    // Clear select menu
    $('#chatRoomsSelect').html("");

    // Populate select menu with most update chatroom list
    Chatty.firebaseRef.once("value", function(snapshot) {
      // Get each child node
      snapshot.forEach(function(childSnapshot) {
        // Get name of current chat room being examined
        var chatRoomName = childSnapshot.key();
        
        // If chatRoomName is messages
        if (chatRoomName === "messages") {
          if (Chatty.currentChatRoomName === "Main") {
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
            if (chatRoomName === Chatty.currentChatRoomName) {
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


  // ============= Chat Rooms button clicked in navbar =============== //
  Chatty.chatRoomsButtonClicked = function() {
    Chatty.updateChattySelectMenu();
    $('#chatRoomsModal').modal('show');
  };


  // ============= Chat Rooms join button clicked in modal =============== //
  Chatty.chatRoomsJoinButtonClicked = function() {

    // If on select menu
    if ( $('#chooseFromExistingChatRoomsButton').hasClass("hidden") ) {

      // Get selected chat room based on input
      var chatRoomToJoin = $('#chatRoomsSelect :selected').text();
      // change Main to messages
      var chatRoomToJoinURL = null;
      if (chatRoomToJoin === "Main") {
        chatRoomToJoinURL = "https://chattytc.firebaseio.com/messages";
      } else {
        chatRoomToJoinURL = "https://chattytc.firebaseio.com/" + chatRoomToJoin;
      }

      // Set new chat room
      Chatty.currentChatRoomRef = new Firebase(chatRoomToJoinURL);
      Chatty.currentChatRoomName = chatRoomToJoin;

      // Rewrite messages to DOM based on chat room selected
      Chatty.rewriteMessages();

      // Add event listeners

      // // Retrieve new messages as they are added to our database in main chat
      // Chatty.currentChatRoomRef.on("child_added", function(snapshot) {

      //   // Get message
      //   var newMessage = snapshot.val();
      //   var newMessageKey = snapshot.key();
      //   console.log(newMessage);

      //   if (newMessage !== "0") {
      //     // If message added matches logged in user, add delete button
      //     if(newMessage.user === Chatty.currentUser) {
      //       Chatty.writeMessageToDOM(newMessage, newMessageKey);
      //     } else {
      //       Chatty.writeMessageToDOMAsGuest(newMessage, newMessageKey);
      //     }

      //   }

      // });

      // Remove messages when removed from database
      Chatty.currentChatRoomRef.on('child_removed', function(oldChildSnapshot) {
        
        // Get removed message DOM tag
        var messageTag = "#msg" + oldChildSnapshot.key();

        // Remove message
        $(messageTag).remove();

      });

      // When users changes
      Chatty.firebaseUsersRef.on('value', function(dataSnapshot) {
        Chatty.rewriteMessages(Chatty.currentChatRoomRef);
      });

      // When message edited
      Chatty.currentChatRoomRef.on('value', function(dataSnapshot) {
        Chatty.rewriteMessages(Chatty.currentChatRoomRef);
      });

      // Change chat room header text
      $('#chatRoomNameHeader').html(Chatty.currentChatRoomName);

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
        Chatty.firebaseRef.child(newChatRoomName).push("0");

        var newChatRoomURL = "https://chattytc.firebaseio.com/" + newChatRoomName;

        // Set new chat room
        Chatty.currentChatRoomRef = new Firebase(newChatRoomURL);
        Chatty.currentChatRoomName = newChatRoomName;

        // Rewrite messages to DOM based on chat room
        Chatty.rewriteMessages();


        // Add event listeners

        // Retrieve new messages as they are added to our database in main chat
        Chatty.currentChatRoomRef.on("child_added", function(snapshot) {
          
          // Get message
          var newMessage = snapshot.val();
          var newMessageKey = snapshot.key();


          // If message added matches logged in user, add delete button
          if(newMessage.user === Chatty.currentUser) {
            Chatty.writeMessageToDOM(newMessage, newMessageKey);
          } else {
            Chatty.writeMessageToDOMAsGuest(newMessage, newMessageKey);
          }

        });

        // Remove messages when removed from database
        Chatty.currentChatRoomRef.on('child_removed', function(oldChildSnapshot) {
          
          // Get removed message DOM tag
          var messageTag = "#msg" + oldChildSnapshot.key();

          // Remove message
          $(messageTag).remove();

        });

        // When users changes
        Chatty.firebaseUsersRef.on('value', function(dataSnapshot) {
          Chatty.rewriteMessages(Chatty.currentChatRoomRef);
        });

        // When message edited
        Chatty.currentChatRoomRef.on('value', function(dataSnapshot) {
          Chatty.rewriteMessages(Chatty.currentChatRoomRef);
        });

        // Change chat room header text
        $('#chatRoomNameHeader').html(Chatty.currentChatRoomName);

        // Hide new chat room modal
        $('#chatRoomsModal').modal('hide');

      }

    }

    // Clear select menu
    $('#chatRoomsSelect').html("");

  };

  // Return augmentted Chatty
  return Chatty;

})(Chatty || {});