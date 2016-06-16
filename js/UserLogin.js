var Chatty = (function(Chatty) {

  // ============= Login user account =============== //
  Chatty.userLogin = function(userEmail, userPassword) {

    Chatty.firebaseRef.authWithPassword({
      "email": userEmail,
      "password": userPassword
    }, function(error, authData) {
      if(error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
        $('#userLoginHeader').html("Adding messages as " + authData.password.email);
        Chatty.currentUser = authData.password.email;
        Chatty.rewriteMessagesOnLogin();
      }
    }, {
      remember: "sessionOnly"
    });

  };

  // Return augmented Chatty
  return Chatty;

})(Chatty || {});