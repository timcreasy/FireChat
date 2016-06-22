var Chatty = (function(Chatty) {

  // ============= Firebase events =============== //
  Chatty.addFirebaseEvents = function() {

    // Add listener for this chat room for any value change (new message, remove message, editing)
    Chatty.firebaseMessagesRef.on('value', function(dataSnapshot) {
      Chatty.rewriteMessages();
    });



    // When users changes
    Chatty.firebaseUsersRef.on('value', function(dataSnapshot) {
      Chatty.rewriteMessages(Chatty.currentChatRoomRef);
    });

  };
  

  // Return augmentted Chatty framework
  return Chatty;

})(Chatty || {});