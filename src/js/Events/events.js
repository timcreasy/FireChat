"use strict";

var newMessageButtonPressed = require('./newMessageButtonPressed');
var addMessageButtonPressed = require('./addMessageButtonPressed');
var loginButtonPressed = require('./loginButtonPressed');
var loginUserButtonPressed = require('./loginUserButtonPressed');
var registerButtonPressed = require('./registerButtonPressed');
var createUserButtonPressed = require('./createUserButtonPressed');
var logoutButtonPressed = require('./logoutButtonPressed');
var profileButtonPressed = require('./profileButtonPressed');
var profileDoneButtonPressed = require('./profileDoneButtonPressed');
var addOwnPictureButtonPressed = require('./addOwnPictureButtonPressed');
var chooseFromDefaultPicturesButtonPressed = require('./chooseFromDefaultPicturesButtonPressed');
var editMessageDoneButtonPressed = require('./editMessageDoneButtonPressed');
var chatRoomsButtonPressed = require('./chatRoomsButtonPressed');
var chatRoomsJoinButtonPressed = require('./chatRoomsJoinButtonPressed');
var createNewChatRoomButtonPressed = require('./createNewChatRoomButtonPressed');
var chooseFromExistingChatRoomsButtonPressed = require('./chooseFromExistingChatRoomsButtonPressed');

var eventListeners = function() {

  newMessageButtonPressed();
  addMessageButtonPressed();
  loginButtonPressed();
  loginUserButtonPressed();
  registerButtonPressed();
  createUserButtonPressed();
  logoutButtonPressed();
  profileButtonPressed();
  profileDoneButtonPressed();
  addOwnPictureButtonPressed();
  chooseFromDefaultPicturesButtonPressed();
  editMessageDoneButtonPressed();
  chatRoomsButtonPressed();
  chatRoomsJoinButtonPressed();
  createNewChatRoomButtonPressed();
  chooseFromExistingChatRoomsButtonPressed();
};

module.exports = eventListeners;
