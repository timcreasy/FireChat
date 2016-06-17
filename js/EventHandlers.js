var Chatty = (function(Chatty) {

  // ============= Firebase events =============== //
  Chatty.addFirebaseEvents = function() {

    // Retrieve new messages as they are added to our database
    Chatty.firebaseMessagesRef.on("child_added", function(snapshot) {
      
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
    Chatty.firebaseMessagesRef.on('child_removed', function(oldChildSnapshot) {
      
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


  // ============= Log Out button pressed in nav bar =============== //
  Chatty.logoutButtonClicked = function() {
    
    // Log user out
    Chatty.firebaseUsersRef.unauth();
    // Reset user header
    $('#userLoginHeader').html("Adding messages as Guest");
    // Reset currentUser
    Chatty.currentUser = null;
    // Reset currentUserID
    Chatty.currentUserID = null;
    // Rewrite messages to DOM as guest
    Chatty.rewriteMessagesOnLoginLogout();

  };


  // ============= Login button pressed in modal =============== //
  Chatty.loginUserButtonClicked = function() {

    // Clear any possible old errors
    $('#loginErrorOutput').html("");

    // Get values from fields
    var loginEmail = $('#loginEmailInput').val();
    var loginPassword = $('#loginPasswordInput').val();

    // Login with information
    Chatty.userLogin(loginEmail, loginPassword);

  }; 


  // ============= Login button pressed in navbar =============== //
  Chatty.loginButtonClicked = function() {

    // Present login modal
    $('#loginUserModal').modal('show');

  }; 


  // ============= Create user button pressed in modal =============== //
  Chatty.createUserButtonClicked = function() {

    // Clear any possible old errors
    $('#registerUserErrorOutput').html("");

    var errorOutput = $('#registerUserErrorOutput');

    // If userEmailInput is blank, throw error
    if ( $('#createUserEmailInput').val() === "" ) {

      // Build up alert
      
      let errorContainer = $('<div class="alert alert-danger"></div>');

      // Add alert to modal
      errorContainer.append("Please enter a user email");
      errorOutput.append(errorContainer);

    } 

    if ( $('#createUserPasswordInput').val() === "" ) {

      // Build up alert
      let errorContainer = $('<div class="alert alert-danger"></div>');

      // Add alert to modal
      errorContainer.append("Please enter a password");
      errorOutput.append(errorContainer);

    } 

    if ( $('#createUserEmailInput').val() !== "" && $('#createUserPasswordInput').val() !== "" ) {

      // Get values from fields
      var newEmail = $('#createUserEmailInput').val();
      var newPassword = $('#createUserPasswordInput').val();

      // Create account based on inputted information
      Chatty.createAccount(newEmail, newPassword);

      // Clear fields in modal
      $('#createUserEmailInput').val("");
      $('#createUserPasswordInput').val("");

      // Dismiss register modal
      $('#registerUserModal').modal('hide');

    }

  }; 


  // ============= Register user button pressed in navbar =============== //
  Chatty.registerButtonClicked = function() {

    //Present register modal
    $('#registerUserModal').modal('show');

  };  


  // ============= Add message button clicked in modal =============== //
  Chatty.addMessageButtonClicked = function() {

    // Clear any old errors
    $('#newMessageErrorOutput').html("");

    // If no message added, throw alert
    if ( $('#messageInput').val() === "" ) {
      // Build up alert
      var errorOutput = $('#newMessageErrorOutput');
      var errorContainer = $('<div class="alert alert-danger"></div>');

      // Add alert to modal
      errorContainer.append("Please enter a message");
      errorOutput.append(errorContainer);

    } else {

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

      // Get timestamp
      var timestamp = Chatty.getTimestamp();

      // Get userID
      var userID = null;

      if (Chatty.currentUserID !== null) {
        userID = Chatty.currentUserID;
      } else {
        userID = "Guest";
      }

      // Create a newMessage object based on inputs
      var newMessage = {
        "message": messageText,
        "user": userName,
        "timestamp": timestamp,
        "userID": userID
      };

      // Add newMessage to firebase
      Chatty.addMessageToFirebase(newMessage);

      // Clear message input field
      $('#messageInput').val("");

      // Dismiss new message modal
      $('#newMessageModal').modal('hide');

    }

  };


  // ============= Profile done button clicked in modal =============== //
  Chatty.profileDoneButtonClicked = function() {


    // Get new profile picture
    var newProfilePicture = $('#profilePictureInput').val();

    var userID = Chatty.currentUserID;

    // Set profile image to url
    var ref = new Firebase("https://chattytc.firebaseio.com");
    ref.child("users").child(Chatty.currentUserID).set({
      "profileImage": newProfilePicture,
    });

    // Update UserInfo array
    Chatty.setUserInfo();

    // Rewrite messages based on new image
    Chatty.rewriteMessagesOnLoginLogout();

    // Dismiss profile modal
    $('#profileModal').modal('hide');

  };



  // ============= Profile button clicked in navbar =============== //
  Chatty.profileButtonClicked = function() {

    $('#profileModal').modal('show');

  };


  // ============= New messsage button clicked in navbar =============== //
  Chatty.newMessageButtonClicked = function() {

    // Present new message modal
    $('#newMessageModal').modal('show');

  };


  // ============= Handles messageCard delete button pressed =============== //
  Chatty.messageDeleteClicked = function() {

    // Get ID of message clicked
    var messageID = event.target.parentNode.id.split("").splice(3).join("");
    // Remove message based on id
    Chatty.firebaseMessagesRefRef.child(messageID).remove();

  };


  // Return augmentted Chatty framework
  return Chatty;

})(Chatty || {});