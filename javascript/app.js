// Get references to firebase paths
var firebaseApplication = require('./firebaseApplication');
var currentChatRoomReference = require('./currentChatRoomReference');
var userList = require('./userList');

// currentUser module
var currentUser = require('./currentUser');

// addMessageToFirebase module
var addMessageToFirebase = require('./addMessageToFirebase');

// writeMessageToDOM module
var writeMessageToDOM = require('./writeMessageToDOM');

// addListenerToCurrentChatRoom module
var addListenerToCurrentChatRoom = require('./addListenerToCurrentChatRoom');

// addListenerToUsers module
var addListenerToUsers = require('./addListenerToUsers');

// createMessageObject module
var createMessageObject = require('./createMessageObject');

// eventListeners module
var eventListeners = require('./Events/events.js');


// ============== Application ================ //

// Activate event listeners
eventListeners();
// Set default chat room to main
currentChatRoomReference.set("main");
// Add listener for chatRoom messages
addListenerToCurrentChatRoom();
// Add listener for change in user data
addListenerToUsers();







