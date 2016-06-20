var Chatty = (function(Chatty) {


    // ============= Adds event listeners to elements =============== //
  Chatty.addEventListeners = function() {

    // New message button in navbar
    $('#newMessageButton').click(Chatty.newMessageButtonClicked);
    // Add message button in modal
    $('#addMessageButton').click(Chatty.addMessageButtonClicked);

    // Register button in navbar
    $('#registerButton').click(Chatty.registerButtonClicked);
    // Create user button in modal
    $('#createUserButton').click(Chatty.createUserButtonClicked);

    // Login button in navbar
    $('#loginButton').click(Chatty.loginButtonClicked);
    // Login button in modal
    $('#loginUserButton').click(Chatty.loginUserButtonClicked);

    // Profile button in navbar
    $('#profileButton').click(Chatty.profileButtonClicked);
    // Profile done button in modal
    $('#profileDoneButton').click(Chatty.profileDoneButtonClicked);

    // Logout button in navbar
    $('#logoutButton').click(Chatty.logoutButtonClicked);

    // Add own picture button in profile modal
    $('#addOwnPictureButton').click(Chatty.addOwnPictureButtonClicked);

    // Choose from default pictures button clicked
    $('#chooseFromDefaultPicturesButton').click(Chatty.chooseFromDefaultPicturesButtonClicked);

    // Edit message done button in modal
    $('#editMessageDoneButton').click(Chatty.editMessageDoneButtonClicked);

  };

  // Return augmented Chatty
  return Chatty;

})(Chatty || {});