var currentLoggedInUser = require('./currentUser');
var userList = require('./userList');
var messageDeletePressed = require('./Events/messageDeletePressed');
var messageEditPressed = require('./Events/messageEditPressed');

// Messages container
var messagesContainer = $('#messagesContainer');

// Writes message to DOM in firebase
var writeMessageToDOM = function(message, messageKey) {

  // Get data out of message object
  var currentText = message.message;
  var currentUserName = message.userName;
  var currentUserID = message.userID;
  var currentMessageTimestamp = message.timestamp;

  // Create elements for message card buildout
  var messageImg = $('<div class="messageUserImage"></div>');
  var messageCard = $('<div class="messageCard"></div>'); 
  var messageText = $('<p class="messageText"></p>').text(currentText);
  var messageUser = $('<h6 class="messageUser"></h6>').text(currentUserName + ':');
  var messageTimestamp = $('<h6 class="messageTimestamp"></h6>').text( '(' + currentMessageTimestamp + ')');

  // If currentUserID was from Guest, set default image as profile picture
  if (currentUserID === "Guest") {

    // Create img element with image
    let imageElement = `<img src="../imgs/profile/guest.jpg">`;
    // Append to messageImg
    messageImg.append(imageElement);
    
  } else {

    // Reference database based on userID to get profile picture
    var userRef = userList.child(currentUserID);
    userRef.once("value", function(data) {
      // Get users profile image
      var profileImage = data.val().profileImage;
      // Create img element with image
      let imageElement = `<img src="${profileImage}">`;
      // Append to messageImg
      messageImg.append(imageElement);
    });

  }

  // Create message card buildout
  messageCard.append(messageImg);
  messageCard.append(" "); 
  messageCard.append(messageTimestamp);
  messageCard.append(" ");
  messageCard.append(messageUser);
  messageCard.append(" ");
  messageCard.append(messageText);

  // First, ensure message is not a guest message
  if(currentUserID !== "Guest") {
    // If currentLoggedInUser matches user of message, create edit and delete button, and add to messageCard
    if (currentUserID === currentLoggedInUser.get().id) {
      var messageEditButton = $('<button class="messageEditButton btn btn-default btn-sm">Edit</button>');
      var messageDeleteButton = $('<button class="messageDeleteButton btn btn-danger btn-sm">Delete</button>');
      messageCard.append(messageDeleteButton);
      messageCard.append(messageEditButton);
      // Add event listeners
      messageDeleteButton.click(messageDeletePressed);
      messageEditButton.click(messageEditPressed);
    }
  }

  // Add unique ID to messageCard
  messageCard.attr('id', "msg" + messageKey);

  // Add messageCard to messagesContainer
  messagesContainer.prepend(messageCard);

};

// export writeMessageToDOM
module.exports =  writeMessageToDOM;