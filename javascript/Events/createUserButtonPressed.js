var createAccount = require('./createAccount');

// Adds event listener to createUserButton click event in register modal
var createUserButtonPressed = function() {

  $('#createUserButton').click(function() {
  
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
      createAccount(newEmail, newPassword);

      // Clear fields in modal
      $('#createUserEmailInput').val("");
      $('#createUserPasswordInput').val("");

      // Dismiss register modal
      $('#registerUserModal').modal('hide');

    }


  });
};

// export createUserButtonPressed
module.exports = createUserButtonPressed;