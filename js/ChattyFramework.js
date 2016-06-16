var Chatty = (function(Chatty) {

  // Private array to hold messages
  var messages = [];
  // Private variable to hold unique id counter
  var id = 0;


  // ============= Removes message from array based on id passed =============== //
  Chatty.removeMessageByID = function(id) {

    messages.splice(id, 1);

  };


  // ============= Fetches index of message based on id passed =============== //
  Chatty.findMessageByID = function(id) {

    for (let i = 0; i < messages.length; i++) {
      if (messages[i].messageID == id) {
        return i;
      }

    }

  };


  // ============= Fetches current unique ID from private var =============== //
  Chatty.getMessageID = function(message) {
    
    // Strip out msg-- and get numeric id
    var messageID = message.id.split("").splice(5, 1).join("");

    return messageID;
  };  


  // ============= Fetches current unique ID from private var =============== //
  Chatty.getUniqueID = function() {
    // Increment id
    id = id + 1;
    // Return id
    return id;
  };


  // ============= Adds a message to a private array =============== //
  Chatty.addMessage = function(newMessage) {
    messages.push(newMessage);
  };


  // ============= Fetches all messages from private array =============== //
  Chatty.getMessages = function() {
    return messages;
  };


  // Return augmented Chatty
  return Chatty;

})(Chatty || {});