var Chatty = (function(Chatty) {

  // ============= Firebase events =============== //
  Chatty.addFirebaseEvents = function() {

    // Retrieve new messages as they are added to our database
    Chatty.firebaseRef.on("child_added", function(snapshot) {
      
      // Get message
      var newMessage = snapshot.val();
      var newMessageKey = snapshot.key();
      
      // If message added matches logged in user, add delete button
      if(newMessage.user === Chatty.currentUser) {
        Chatty.writeMessageToDOM(newMessage, newMessageKey);
      } else {
        Chatty.writeMessageToDOMAsGuest(newMessage, newMessageKey);
      }

    });

    // Remove messages when removed from database
    Chatty.firebaseRef.on('child_removed', function(oldChildSnapshot) {
      
      // Get removed message DOM tag
      var messageTag = "#msg" + oldChildSnapshot.key();
      
      // Remove message
      $(messageTag).remove();

    });

  };


  // ============= Handles messageCard selection =============== //
  Chatty.messageCardClicked = function() {

    // Ignore messageCard delete button being clicked
    if ( !$(event.target).hasClass("messageDeleteButton") ) {
      console.log("messageCardClicked");
    }

  };


  // ============= Login button pressed in modal =============== //
  Chatty.loginUserButtonClicked = function() {

    // Get values from fields
    var loginEmail = $('#loginEmailInput').val();
    var loginPassword = $('#loginPasswordInput').val();

    // Login with information
    Chatty.userLogin(loginEmail, loginPassword);

    // Dismiss login modal
    $('#loginUserModal').modal('hide');

  }; 


  // ============= Login button pressed in navbar =============== //
  Chatty.loginButtonClicked = function() {

    // Present login modal
    $('#loginUserModal').modal('show');

  }; 


  // ============= Create user button pressed in modal =============== //
  Chatty.createUserButtonClicked = function() {

    // Get values from fields
    var newEmail = $('#createUserEmailInput').val();
    var newPassword = $('#createUserPasswordInput').val();

    // Create account based on inputted information
    Chatty.createAccount(newEmail, newPassword);

    // Dismiss register modal
    $('#registerUserModal').modal('hide');

  }; 


  // ============= Register user button pressed in navbar =============== //
  Chatty.registerButtonClicked = function() {

    //Present register modal
    $('#registerUserModal').modal('show');

  };  


  // ============= Add message button clicked in modal =============== //
  Chatty.addMessageButtonClicked = function() {

    // Get inputted message
    var messageText = $('#messageInput').val();

    // Get user info
    var userName;
    // If a user is logged in, set userName equal to user's email
    if (Chatty.currentUser !== null) {
      userName = Chatty.currentUser;
    } else {
      // Otherwise create message as Guest
      userName = "Guest";
    }

    // Create a newMessage object based on inputs
    var newMessage = {
      "message": messageText,
      "user": userName
    };

    // Add newMessage to firebase
    Chatty.addMessageToFirebase(newMessage);

    // Dismiss new message modal
    $('#newMessageModal').modal('hide');

  };


  // ============= New messsage button clicked in navbar =============== //
  Chatty.newMessageButtonClicked = function() {

    // Present new message modal
    $('#newMessageModal').modal('show');

  };


  // ============= Handles messageCard delete button pressed =============== //
  Chatty.messageDeleteClicked = function() {

    var messageID = event.target.parentNode.id.split("").splice(3).join("");

    Chatty.firebaseRef.child(messageID).remove();

  };


  // Return augmentted Chatty framework
  return Chatty;

})(Chatty || {});