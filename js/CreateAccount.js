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

  // Return augmented Chatty
  return Chatty;

})(Chatty || {});