var Chatty = (function(Chatty) {

  // ============= Login user account =============== //
  Chatty.userLogin = function(userEmail, userPassword) {

    Chatty.firebaseRef.authWithPassword({
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
        // Rewrite messages to DOM with appropriate delete buttons
        Chatty.rewriteMessagesOnLoginLogout();
        // Call loginSuccess
        Chatty.loginSuccess();
      }
    }, {
      remember: "sessionOnly"
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
    // Clear fields
    $('#loginEmailInput').val("");
    $('#loginPasswordInput').val("");
    // Hide modal
    $('#loginUserModal').modal('hide');
  };

  // Return augmented Chatty
  return Chatty;

})(Chatty || {});