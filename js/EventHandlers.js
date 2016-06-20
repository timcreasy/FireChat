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

    // When users changes
    Chatty.firebaseUsersRef.on('value', function(dataSnapshot) {
      Chatty.rewriteMessages();
    });

  };



  // ============= Log Out button pressed in nav bar =============== //
  Chatty.logoutButtonClicked = function() {
    
    // Log user out
    Chatty.firebaseUsersRef.unauth();
    // Hide Profile button
    $('#profileButton').addClass("hidden");
    // Hide Log Out button
    $('#logoutButton').addClass("hidden");
    // Show Log in button
    $('#loginButton').removeClass("hidden");
    // Add styling to log in button
    $('#loginButton').addClass("btn btn-default");
    // Show register button
    $('#registerButton').removeClass("hidden");
    // Add styling to register button
    $('#registerButton').addClass("btn btn-default");
    // Reset user header
    $('#userLoginHeader').html("Adding messages as Guest");
    // Reset currentUser
    Chatty.currentUser = null;
    // Reset currentUserID
    Chatty.currentUserID = null;
    // Rewrite messages to DOM as guest
    Chatty.rewriteMessages();

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



  // ============= Clears selected picture =============== //
  Chatty.clearSelectedPicture = function() {

    var images = $('.profileImages').children();
    // Loop through each image
    for (let i = 0; i < images.length; i++) {
      var currentImage = $(images[i].children[0].children[0]);
      currentImage.removeClass("selectedImage");
    }

  };



  // ============= Fetches Profile picture image selected =============== //
  Chatty.getSelectedPicture = function() {

    // Get images
    var images = $('.profileImages').children();
    // Loop through each image
    for (let i = 0; i < images.length; i++) {
      var currentImage = $(images[i].children[0].children[0]);
      // If currentImage is selected
      if (currentImage.hasClass("selectedImage")) {
        return currentImage.attr("src");
      }
    }
    return null;
  };



  // ============= Profile picture image selected =============== //
  Chatty.profilePictureSelected = function() {

    // Check if image was selected
    if (event.target.tagName === "IMG") {

      // First clear selected class from all images
      Chatty.clearSelectedPicture();

      // Add selected class to image
      $(event.target).addClass("selectedImage");

    }

  };



  // ============= Profile done button clicked in modal =============== //
  Chatty.profileDoneButtonClicked = function() {

    var userID = Chatty.currentUserID;

    // If a default image is selected
    if (Chatty.getSelectedPicture()) {

      let newProfilePicture = Chatty.getSelectedPicture();

      // Set profile image to url
      Chatty.firebaseRef.child("users").child(Chatty.currentUserID).set({
        "profileImage": newProfilePicture,
      });

      // Rewrite messages based on new image
      Chatty.rewriteMessages();

      // Dismiss profile modal
      $('#profileModal').modal('hide');


    } else {


      // Get new profile picture
      var newProfilePicture = $('#profilePictureInput').val();

      // Set profile image to url
      Chatty.firebaseRef.child("users").child(Chatty.currentUserID).set({
        "profileImage": newProfilePicture,
      });

      // Rewrite messages based on new image
      Chatty.rewriteMessages();

      // Dismiss profile modal
      $('#profileModal').modal('hide');

    }

  };



  // ============= Profile button clicked in navbar =============== //
  Chatty.profileButtonClicked = function() {

    $('#profileModal').modal('show');

    // add event listeners to profile images
    $('.profileImages').click(Chatty.profilePictureSelected);

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
    Chatty.firebaseMessagesRef.child(messageID).remove();

  };


  // Return augmentted Chatty framework
  return Chatty;

})(Chatty || {});