var Chatty = (function(Chatty) {
  

  // ============= Firebase app reference =============== //
  Chatty.firebaseRef = new Firebase("https://chattytc.firebaseio.com");


  // ============= Firebase app reference =============== //
  Chatty.uniqueIdRef = new Firebase("https://chattytc.firebaseio.com/messageID");


  // ============= Firebase app reference =============== //
  Chatty.uniqueID = null;


  // ============= Firebase logged in user =============== //
  Chatty.currentUser = null;


  // ============= Adds a message to firebase =============== //
  Chatty.addMessageToFirebase = function(newMessage) {
    Chatty.firebaseRef.push(newMessage);
  };


  // Return augmented Chatty
  return Chatty;

})(Chatty || {});