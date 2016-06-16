var Chatty = (function(Chatty) {

  // Private array to hold messages
  var messages = [];
  // Private variable to hold unique id counter
  var id = 3;

  // ============= Firebase app reference =============== //
  Chatty.firebaseRef = new Firebase("https://chattytc.firebaseio.com");


  // ============= Firebase logged in user =============== //
  Chatty.currentUser = null;


  // ============= Fetches current unique ID from private var =============== //
  Chatty.getUniqueID = function() {
    // Increment id
    id = id + 1;
    // Return id
    return id;
  };
  

  // ============= Adds a message to firebase =============== //
  Chatty.addMessageToFirebase = function(newMessage) {
    Chatty.firebaseRef.push(newMessage);
  };


  // Return augmented Chatty
  return Chatty;

})(Chatty || {});