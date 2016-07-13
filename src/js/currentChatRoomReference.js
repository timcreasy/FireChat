"use strict";

// Initially set reference to main chat room
var chatRoomReference = new Firebase("https://chatifytc.firebaseio.com/");

// export currentChatRoomReference
module.exports =  {
  set: function(newChatRoom) {
    chatRoomReference = new Firebase("https://chatifytc.firebaseio.com/" + newChatRoom);
  },
  get: function() {
    return chatRoomReference;
  }
};
