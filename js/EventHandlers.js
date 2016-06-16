var Chatty = (function(Chatty) {

  // ============= Firebase events =============== //
  Chatty.addFirebaseEvents = function() {

    // Retrieve new posts as they are added to our database
    Chatty.firebaseRef.on("child_added", function(snapshot) {
      // Get message
      var newMessage = snapshot.val();
      // Write message to DOM
      Chatty.writeMessageToDOM(newMessage);
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
    // Get a uniqueID
    var messageID = Chatty.getUniqueID();

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
      "user": userName,
      "messageID": messageID
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

    console.log("Delete button pressed");

  };


  // Return augmentted Chatty framework
  return Chatty;

})(Chatty || {});