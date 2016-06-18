var Chatty = (function(Chatty) {


  // Retrieves profile image URL by userID
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