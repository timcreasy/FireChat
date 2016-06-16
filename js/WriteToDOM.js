var Chatty = (function(Chatty) {


  // ============= Rewrites messages with appropriate delete button on user login =============== //
  Chatty.rewriteMessagesOnLogin = function() {

    // Empty messages container
    $('#messagesContainer').html('');

    Chatty.firebaseRef.once("value", function(data) {

      // Get all messages
      var messages = data.val();
      console.log(messages);
      // Loop through each message
      for (var key in messages) {
        // Get current message
        var currentMessage = messages[key];
        // If currentMessage user tag matches currently logged in user, add delete button with printout
        if (currentMessage.user === Chatty.currentUser) {
          Chatty.writeMessageToDOM(currentMessage, key);
        } else {
          Chatty.writeMessageToDOMAsGuest(currentMessage, key);
        }
      }

    });

  };



  // ============= Write message to DOM as authenticated user =============== //
  Chatty.writeMessageToDOM = function(message, messageKey) {
    
    // Get output container
    var messagesContainer = $("#messagesContainer");

    // Get message card for message
    var messageCard = Chatty.createMessageCard(message, messageKey);

    // Add messageCard to container
    messagesContainer.prepend(messageCard);

  };



  // ============= Write message to DOM as guest =============== //
  Chatty.writeMessageToDOMAsGuest = function(message, messageKey) {

    // Get output container
    var messagesContainer = $("#messagesContainer");

    // Get message card for message
    var messageCard = Chatty.createMessageCardNoDelete(message, messageKey);

    // Add messageCard to container
    messagesContainer.prepend(messageCard);


  };



  // ============= Buildout message card without delete button =============== //
  Chatty.createMessageCardNoDelete = function(message, messageKey) {

    // Get data out of message object
    var currentMessage = message.message;
    var currentUser = message.user;

    // Create elements for message card buildout
    var messageCard = $('<div class="messageCard"></div>');
    var messageText = $('<p class="messageText"></p>').text(currentMessage);
    var messageUser = $('<h6 class="messageUser"></h6>').text(currentUser + ':');
    var messageTimestamp = $('<h6 class="messageTimestamp"></h6>').text( '(' + Chatty.getTimestamp() + ')');

    // Create message card buildout
    messageCard.append(messageTimestamp);
    messageCard.append(" ");
    messageCard.append(messageUser);
    messageCard.append(" ");
    messageCard.append(messageText);


    // Add click event listener to card
    messageCard.click(Chatty.messageCardClicked);

    // Add unique ID to messageCard
    messageCard.attr('id', "msg" + messageKey);

    // Return messageCard;
    return messageCard;

  };



  // ============= Buildout message card with delete button =============== //
  Chatty.createMessageCard = function(message, messageKey) {

    // Get data out of message object
    var currentMessage = message.message;
    var currentUser = message.user;

    // Create elements for message card buildout
    var messageCard = $('<div class="messageCard"></div>');
    var messageText = $('<p class="messageText"></p>').text(currentMessage);
    var messageUser = $('<h6 class="messageUser"></h6>').text(currentUser + ': ');
    var messageTimestamp = $('<h6 class="messageTimestamp"></h6>').text( '(' + Chatty.getTimestamp() + ') ' );
    var messageDeleteButton = $('<button class="messageDeleteButton">Delete</button>');

    // Create message card buildout
    messageCard.append(messageTimestamp);
    messageCard.append(" ");
    messageCard.append(messageUser);
    messageCard.append(" ");
    messageCard.append(messageText);
    messageCard.append(messageDeleteButton);

    // Add click event listener to delete button
    messageDeleteButton.click(Chatty.messageDeleteClicked);

    // Add click event listener to card
    messageCard.click(Chatty.messageCardClicked);

    // Add unique ID to messageCard
    messageCard.attr('id', "msg" + messageKey);

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