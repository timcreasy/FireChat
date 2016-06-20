var Chatty = (function(Chatty) {



  // ============= Add own picture button clicked =============== //
  Chatty.addOwnPictureButtonClicked = function() {
    // Hide default pictures
    $('.profileImages').addClass('hidden');
    // Hide add own picture button
    $('#addOwnPictureButton').addClass('hidden');
    // Show choose from defaults picture button
    $('#chooseFromDefaultPicturesButton').removeClass('hidden');
    // Remove any selected pictures
    Chatty.clearSelectedPicture();
    // Show label and input to add own pictures
    $('#profilePictureInputLabel').removeClass("hidden");
    $('#profilePictureInput').removeClass("hidden");
  };



  // ============= Choose from default pictures button clicked =============== //
  Chatty.chooseFromDefaultPicturesButtonClicked = function() {
    // Clear any lingering errors
    $('#profileErrorOutput').html("");
    // Show add own picture button
    $('#addOwnPictureButton').removeClass('hidden');
    // Hide choose from defaults picture button
    $('#chooseFromDefaultPicturesButton').addClass('hidden');
    // Clear any input from field
    $('#profilePictureInput').val("");
    // Show default pictures
    $('.profileImages').removeClass('hidden');
    // Hide label and input to add own pictures
    $('#profilePictureInputLabel').addClass("hidden");
    $('#profilePictureInput').addClass("hidden");
  };



  // ============= Retrieves profile image URL by userID =============== //
  Chatty.getProfilePictureByID = function(id) {

    // Set profile picture to null
    var profilePicture = null;

    for (var key in userInfo) {
      // If key matches id passed
      if (key === id) {
        profilePicture = userInfo[key].profileImage;
      }
    }

    // Return either profileImage or null
    return profilePicture;

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
    
    // Unbind enter event listener
    $(document).unbind("keyup");

    // Clear any lingering errors
    $('#profileErrorOutput').html("");

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

      if ( $('#profilePictureInput').val() === "" ) {
        
        // Build up alert
        var errorOutput = $('#profileErrorOutput');
        var errorContainer = $('<div class="alert alert-danger"></div>');

        // Add alert to modal
        errorContainer.append("Please enter a valid URL to an image");
        errorOutput.append(errorContainer);

      } else {

        // Get new profile picture
        var newProfilePicture = $('#profilePictureInput').val();

        // Set profile image to url
        Chatty.firebaseRef.child("users").child(Chatty.currentUserID).set({
          "profileImage": newProfilePicture,
        });

        // Rewrite messages based on new image
        Chatty.rewriteMessages();

        // Clear input field
        $('#profilePictureInput').val("");

        // Dismiss profile modal
        $('#profileModal').modal('hide');

      }

    }

  };



  // ============= Profile button clicked in navbar =============== //
  Chatty.profileButtonClicked = function() {

    $('#profileModal').modal('show');

    // add event listeners to profile images
    $('.profileImages').click(Chatty.profilePictureSelected);

    // Add enter event listener to modal
    $(document).unbind("keyup").keyup(function(e){ 
      var code = e.which; // recommended to use e.which, it's normalized across browsers
      if(code==13)
      {
          $("#profileDoneButton").click();
      }
    });

  };


  // ============= Retrieves profile image URL by userID =============== //
  Chatty.getProfilePictureByID = function(id) {

    // Set profile picture to null
    var profilePicture = null;

    for (var key in userInfo) {
      // If key matches id passed
      if (key === id) {
        profilePicture = userInfo[key].profileImage;
      }
    }

    // Return either profileImage or null
    return profilePicture;

  };



  // Return augmented Chatty
  return Chatty;

})(Chatty || {});