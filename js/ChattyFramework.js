var Chatty = (function(Chatty) {
  

  // ============= Firebase app reference =============== //
  Chatty.firebaseRef = new Firebase("https://chattytc.firebaseio.com");


  // ============= Firebase messages reference =============== //
  Chatty.firebaseMessagesRef = new Firebase("https://chattytc.firebaseio.com/messages");


  // ============= Firebase users reference =============== //
  Chatty.firebaseUsersRef = new Firebase("https://chattytc.firebaseio.com/users");


  // ============= Firebase app reference =============== //
  Chatty.uniqueID = null;


  // ============= Firebase logged in user name =============== //
  Chatty.currentUser = null;


  // ============= Firebase logged in user ID =============== //
  Chatty.currentUserID = null;


  // ============= Current chat room ref =============== //
  Chatty.currentChatRoomRef = Chatty.firebaseMessagesRef;


  // ============= Current chat room ref =============== //
  Chatty.currentChatRoomName = "Main";


  // ============= Adds a message to firebase =============== //
  Chatty.addMessageToFirebase = function(newMessage) {
    Chatty.currentChatRoomRef.push(newMessage);
  };


  // Return augmented Chatty
  return Chatty;

})(Chatty || {});