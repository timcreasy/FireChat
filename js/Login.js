var Chatty = (function(Chatty) {



  // ============= Login user account =============== //
  Chatty.userLogin = function(userEmail, userPassword) {

    Chatty.firebaseUsersRef.authWithPassword({
      "email": userEmail,
      "password": userPassword
    }, function(error, authData) {
      if(error) {
        // Pass error to present to user
        Chatty.loginFailure(error);  
      } else {
        // Show header with user login
        $('#userLoginHeader').html("Adding messages as " + authData.password.email);
        // Set currentUser of session
        Chatty.currentUser = authData.password.email;
        Chatty.currentUserID = authData.uid;
        // Rewrite messages to DOM with appropriate delete buttons
        Chatty.rewriteMessages(Chatty.currentChatRoomRef);
        // Call loginSuccess
        Chatty.loginSuccess();
      }
    }, {
      remember: "sessionOnly"
    });

  };



  Chatty.lastLogin = function() {

    var lastLoginString = Chatty.getTimestamp();
    // Set profile image to url
    Chatty.firebaseRef.child("users").child(Chatty.currentUserID).update({
      "lastLogin": lastLoginString
    });

  };



  // ============= Login user account failure =============== //
  Chatty.loginFailure = function(error) {

    // Build up alert
    var errorOutput = $('#loginErrorOutput');
    var errorContainer = $('<div class="alert alert-danger"></div>');

    // Add alert to modal
    errorContainer.append(error);
    errorOutput.append(errorContainer);

  };



  // ============= Login user account success =============== //
  Chatty.loginSuccess = function() {
    // Unbind enter key
    $(document).unbind("keyup");
    // Show Profile button
    $('#profileButton').removeClass("hidden");
    // Add styling to profile button
    $('#profileButton').addClass("btn btn-default");
    // Show Log out button
    $('#logoutButton').removeClass("hidden");
    // Add styling to log out button
    $('#logoutButton').addClass("btn btn-danger");
    // Hide log in button
    $('#loginButton').addClass("hidden");
    // Hide register button
    $('#registerButton').addClass("hidden");
    // Clear fields
    $('#loginEmailInput').val("");
    $('#loginPasswordInput').val("");
    // Hide modal
    $('#loginUserModal').modal('hide');
    Chatty.lastLogin();
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
    // Add enter event listener
    $(document).unbind("keyup").keyup(function(e){ 
      var code = e.which; // recommended to use e.which, it's normalized across browsers
      if(code==13)
      {
          $("#loginUserButton").click();
      }
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
    Chatty.rewriteMessages(Chatty.currentChatRoomRef);

  };


  // Return augmented Chatty
  return Chatty;

})(Chatty || {});