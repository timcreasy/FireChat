var getTimestamp = require('./timestamp');

// Creates and return message object
var createMessageObject = function(messageText, messageUser) {

  // Build up messageObject
  var messageObject = {
    "message": messageText,
    "userName": messageUser.name,
    "userID": messageUser.id,
    "timestamp": getTimestamp()
  };

  // Return messageObject to caller
  return messageObject;

};

// export writeMessageToDOM
module.exports =  createMessageObject;