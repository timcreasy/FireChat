var userLogin = require('./userLogin');

// Adds event listener to loginUserButton click event in login modal
var loginUserButtonPressed = function() {

  $('#loginUserButton').click(function() {
    // Clear any possible old errors
    $('#loginErrorOutput').html("");

    // Get values from fields
    var loginEmail = $('#loginEmailInput').val();
    var loginPassword = $('#loginPasswordInput').val();

    // Login with information
    userLogin(loginEmail, loginPassword);
  });

};

// export loginUserButtonPressed
module.exports = loginUserButtonPressed;