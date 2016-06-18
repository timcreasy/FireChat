var Chatty = (function(Chatty) {

  var userInfo;



  Chatty.getUserInfo = function(){
    return userInfo;
  };



  Chatty.setUserInfo = function() {

    Chatty.firebaseUsersRef.once("value", function(data) {
      userInfo = data.val();
      console.log(userInfo);
    });

  };



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