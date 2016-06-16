var Chatty = (function(Chatty) {


  // ============= Writes each message passed to DOM =============== //
  Chatty.writeMessageToDOM = function(message) {
    
    // Get output container
    var messagesContainer = $("#messagesContainer");

    // Get message card for message
    var messageCard = Chatty.createMessageCard(message);

    // Add messageCard to container
    messagesContainer.prepend(messageCard);

  };



  // ============= Creates each individual messageCard =============== //
  Chatty.createMessageCard = function(message) {

    // Get data out of message object
    var currentMessageID = message.messageID;
    var currentMessage = message.message;
    var currentUser = message.user;

    // Create elements for message card buildout
    var messageCard = $('<div class="messageCard"></div>');
    var messageText = $('<p class="messageText"></p>').text(currentMessage);
    var messageUser = $('<h6 class="messageUser"></h6>').text(currentUser);
    var messageTimestamp = $('<h6 class="messageTimestamp"></h6>').text(Chatty.getTimestamp);
    var messageDeleteButton = $('<button class="messageDeleteButton">Delete</button>');

    // Create message card buildout
    messageCard.append(messageText);
    messageCard.append(messageUser);
    messageCard.append(messageTimestamp);
    messageCard.append(messageDeleteButton);

    // Add click event listener to delete button
    messageDeleteButton.click(Chatty.messageDeleteClicked);

    // Add click event listener to card
    messageCard.click(Chatty.messageCardClicked);

    // Add unique ID to messageCard
    messageCard.attr('id', "msg--" + currentMessageID);

    // Return messageCard;
    return messageCard;

  };


  // ============= Creates and returns formatted timestamp =============== //
  Chatty.getTimestamp = function() {

    // Create a date object with the current time
    var now = new Date();

    // Create an array with the current month, day and time
      var date = [ now.getMonth() + 1, now.getDate(), now.getFullYear() ];

    // Create an array with the current hour, minute and second
      var time = [ now.getHours(), now.getMinutes(), now.getSeconds() ];

    // Determine AM or PM suffix based on the hour
      var suffix = ( time[0] < 12 ) ? "AM" : "PM";

    // Convert hour from military time
      time[0] = ( time[0] < 12 ) ? time[0] : time[0] - 12;

    // If hour is 0, set it to 12
      time[0] = time[0] || 12;

    // If seconds and minutes are less than 10, add a zero
      for ( var i = 1; i < 3; i++ ) {
        if ( time[i] < 10 ) {
          time[i] = "0" + time[i];
        }
      }

    // Create formatted timestampString
    var timestampString = date.join("/") + " " + time.join(":") + " " + suffix;

    // Return messageCard with timestamp appended
    return timestampString;

  };


  // Return augmented Chatty
  return Chatty;

})(Chatty || {});