// Initially set messageToEdit to null
var messageToEdit = null;

// export currentChatRoomReference
module.exports =  {
  set: function(newID) {
    messageToEdit = newID;
  },
  get: function() {
    return messageToEdit;
  }
};