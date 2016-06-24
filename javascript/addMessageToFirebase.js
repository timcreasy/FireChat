// Get currentChatRoomReference
var currentChatRoomReference = require('./currentChatRoomReference');

// Adds message to currentChatRoom in firebase
var addMessageToFirebase = function(message) {
  currentChatRoomReference.get().push(message);
};

// export currentUser
module.exports =  addMessageToFirebase;