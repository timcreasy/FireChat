var Chatty = (function(Chatty){


  // ============= Create new user account =============== //
  Chatty.createAccount = function(userEmail, userPassword) {

    Chatty.firebaseUsersRef.createUser({
      "email": userEmail,
      "password": userPassword
    }, function(error, userData) {

      if (error) {
        console.log("Error creating user:", error);
      } else {
        // Log account UID
        console.log("Successfully created user account with uid:", userData.uid);

        // Set default profile picture
        Chatty.firebaseRef.child("users").child(userData.uid).set({
          "profileImage": "http://www.cenpatico.com/files/2014/01/noprofile.gif"
        });

      }

    });
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

      // Unbind enter event listener
      $(document).unbind("keyup");

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
    // Add enter event listener
    $(document).unbind("keyup").keyup(function(e){ 
      var code = e.which; // recommended to use e.which, it's normalized across browsers
      if(code==13)
      {
          $("#createUserButton").click();
      }
    });

  };  


  // Return augmented Chatty
  return Chatty;

})(Chatty || {});