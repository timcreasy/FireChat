"use strict";

var userList = require('./userList');
var rewriteAllMessages = require('./rewriteAllMessages');

// Messages container
var messagesContainer = $('#messagesContainer');

// addListenerToCurrentChatRooms
var addListenerToUsers = function() {
  // Adds listener for any change to user data, if something changed, rewriteAllMessages
  userList.on("value", function(data) {
    rewriteAllMessages();
  });
};

// export addListenerToUsers
module.exports =  addListenerToUsers;
