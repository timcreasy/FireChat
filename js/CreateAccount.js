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
        console.log("Successfully created user account with uid:", userData.uid);
      }

    });
  };

  // Return augmented Chatty
  return Chatty;

})(Chatty || {});