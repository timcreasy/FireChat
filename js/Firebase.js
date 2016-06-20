var Chatty = (function(Chatty) {

  // ============= Firebase events =============== //
  Chatty.addFirebaseEvents = function() {

    // Retrieve new messages as they are added to our database
    Chatty.firebaseMessagesRef.on("child_added", function(snapshot) {
      
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
    Chatty.firebaseMessagesRef.on('child_removed', function(oldChildSnapshot) {
      
      // Get removed message DOM tag
      var messageTag = "#msg" + oldChildSnapshot.key();

      
      // Remove message
      $(messageTag).remove();

    });

    // When users changes
    Chatty.firebaseUsersRef.on('value', function(dataSnapshot) {
      Chatty.rewriteMessages();
    });


    // When message edited
    Chatty.firebaseMessagesRef.on('value', function(dataSnapshot) {
      Chatty.rewriteMessages();
    });

  };
  

  // Return augmentted Chatty framework
  return Chatty;

})(Chatty || {});