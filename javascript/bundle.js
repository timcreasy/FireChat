(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var createMessageObject = require('../createMessageObject');
var currentUser = require('../currentUser');
var addMessageToFirebase = require('../addMessageToFirebase');

// Adds event listener to addMessageButton click event
var addMessageButtonPressed = function() {

  $('#addMessageButton').click(function() {

    // Clear any old errors
    $('#newMessageErrorOutput').html("");

    // If no message added, throw alert
    if ( $('#messageInput').val() === "" ) {

      // Build up alert
      var errorOutput = $('#newMessageErrorOutput');
      var errorContainer = $('<div class="alert alert-danger"></div>');

      // Add alert to modal
      errorContainer.append("Please enter a message");
      errorOutput.append(errorContainer);

    } else {

      // Get inputted message
      var messageText = $('#messageInput').val();

      // Create message object, with message text, and currentUser
      var message = createMessageObject( messageText, currentUser.get() );

      // Add message to firebase
      addMessageToFirebase(message);

      // Clear message field
      $('#editMessageInput').val("");

      // Clear error messages
      $('#editMessageErrorOutput').html("");

      // Dismiss modal
      $('#newMessageModal').modal('hide');

      // Clear inputted message
      $('#messageInput').val("")

      // Unbind enter listen
      $(document).unbind("keyup");
      
    }
  });
};

// export addMessageButtonPressed
module.exports = addMessageButtonPressed;
},{"../addMessageToFirebase":27,"../createMessageObject":29,"../currentUser":31}],2:[function(require,module,exports){
var clearSelectedPicture = require('./clearSelectedPicture');

// Adds event listener to addOwnPictureButton click event
var addOwnPictureButtonPressed = function() {

  $('#addOwnPictureButton').click(function() {
    
    // Hide default pictures
    $('.profileImages').addClass('hidden');
    // Hide add own picture button
    $('#addOwnPictureButton').addClass('hidden');
    // Show choose from defaults picture button
    $('#chooseFromDefaultPicturesButton').removeClass('hidden');
    // Remove any selected pictures
    clearSelectedPicture();
    // Show label and input to add own pictures
    $('#profilePictureInputLabel').removeClass("hidden");
    $('#profilePictureInput').removeClass("hidden");

  });

};

// export addOwnPictureButtonPressed
module.exports = addOwnPictureButtonPressed;
},{"./clearSelectedPicture":7}],3:[function(require,module,exports){
var updateChatRoomsSelectMenu = require('./updateChatRoomsSelectMenu');

// Adds event listener to chatRoomsButton click event
var chatRoomsButtonPressed = function() {
  $('#chatRoomsButton').click(function() {
    // Update chatRoomsSelect menu
    updateChatRoomsSelectMenu();
    // Present chat rooms modal
    $('#chatRoomsModal').modal('show');
    // Listen for enter key press
    $(document).unbind("keyup").keyup(function(e){ 
      var code = e.which; // 
      if(code==13)
      {
        $("#chatRoomsJoinButton").click();
      }
    });
  });
};

// export chatRoomsButtonPressed
module.exports = chatRoomsButtonPressed;
},{"./updateChatRoomsSelectMenu":23}],4:[function(require,module,exports){
var currentChatRoomReference = require('../currentChatRoomReference');
var addListenerToCurrentChatRoom = require('../addListenerToCurrentChatRoom');
var firebaseApplication = require('../firebaseApplication');

// Logic for when chatRoomsJoinButton is pressed
var chatRoomsJoinButtonPressed = function() {

  $('#chatRoomsJoinButton').click(function() {
    // If on select menu
    if ( $('#chooseFromExistingChatRoomsButton').hasClass("hidden") ) {

      // Get selected chat room based on input
      var chatRoomToJoin = $('#chatRoomsSelect :selected').text();
      // change Main to main
      var chatRoomToJoinName = null;
      if (chatRoomToJoin === "Main") {
        chatRoomToJoinName = "main";
      } else {
        chatRoomToJoinName = chatRoomToJoin;
      }

      // Set new chat room
      currentChatRoomReference.set(chatRoomToJoinName);

      // Empty messages container
      $('#messagesContainer').html('');

      // Add listener for this chat room for any value change (new message, remove message, editing)
      addListenerToCurrentChatRoom();

      // Change chat room header text
      $('#chatRoomNameHeader').html(chatRoomToJoin);

      // Unbind enter event listener
      $(document).unbind("keyup")

      // Hide new chat room modal
      $('#chatRoomsModal').modal('hide');


    // If on custom chat room screen
    } else {

      // If input is empty, throw error
      if ( $('#newChatRoomInput').val() === "" ) {

        // Build up alert
        var errorOutput = $('#chatRoomsErrorOutput');
        var errorContainer = $('<div class="alert alert-danger"></div>');

        // Add alert to modal
        errorContainer.append("Please enter a new chat room name");
        errorOutput.append(errorContainer);

      } else {

        // Create new chat room based on input
        var newChatRoomName = $('#newChatRoomInput').val();
        firebaseApplication.child(newChatRoomName).push("0");

        // Set new chat room
        currentChatRoomReference.set(newChatRoomName);

        // Add listener for this chat room for any value change (new message, remove message, editing)
        addListenerToCurrentChatRoom();

        // Change chat room header text
        $('#chatRoomNameHeader').html(newChatRoomName);

        // Unbind enter event listener
        $(document).unbind("keyup")

        // Hide new chat room modal
        $('#chatRoomsModal').modal('hide');

      }

    }

    // Clear select menu
    $('#chatRoomsSelect').html("");
  });
};

// Export chatRoomsJoinButtonPressed
module.exports = chatRoomsJoinButtonPressed;
},{"../addListenerToCurrentChatRoom":25,"../currentChatRoomReference":30,"../firebaseApplication":32}],5:[function(require,module,exports){
// Adds event listener to chooseFromDefaultPicturesButton click event
var chooseFromDefaultPicturesButtonPressed = function() {

  $('#chooseFromDefaultPicturesButton').click(function() {
    
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

  });
  
};

// export chooseFromDefaultPicturesButtonPressed
module.exports = chooseFromDefaultPicturesButtonPressed;
},{}],6:[function(require,module,exports){
// Adds event listener to chooseFromExistingChatRoomsButton click event
var chooseFromExistingChatRoomsButtonPressed = function() {
  $('#chooseFromExistingChatRoomsButton').click(function() {
    // Show create new chat room button
    $('#createNewChatRoomButton').removeClass("hidden");
    // Show chatRoomsSelectLabel
    $('#chatRoomsSelectLabel').removeClass("hidden");
    // Show chat room select menu
    $('#chatRoomsSelect').removeClass("hidden");
    // Hide choose from existing rooms button
    $('#chooseFromExistingChatRoomsButton').addClass("hidden");
    // Hide new chat room input label
    $('#newChatRoomInputLabel').addClass("hidden");
    // Hide new chat room input
    $('#newChatRoomInput').addClass("hidden");
  });
};

// export chooseFromExistingChatRoomsButtonPressed
module.exports = chooseFromExistingChatRoomsButtonPressed;
},{}],7:[function(require,module,exports){
// Clear selected picture from profile selection
var clearSelectedPicture = function() {
  // Get all images
  var images = $('.profileImages').children();
  // Remove class of selectedImage from each image
  for (let i = 0; i < images.length; i++) {
    var currentImage = $(images[i].children[0].children[0]);
    currentImage.removeClass("selectedImage");
  }
};

// Export clearSelectedPicture
module.exports = clearSelectedPicture;
},{}],8:[function(require,module,exports){
var firebaseApplication = require('../firebaseApplication');
var userList = require('../userList');

// Logic for when account is to be created
var createAccount = function(userEmail, userPassword) {

  firebaseApplication.createUser({
    "email": userEmail,
    "password": userPassword
  }, function(error, userData) {

    if (error) {
      
      console.log(error);
      // Build up alert
      var errorOutput = $('#registerErrorOutput');
      var errorContainer = $('<div class="alert alert-danger"></div>');

      // Add alert to modal
      errorContainer.append(error);
      errorOutput.append(errorContainer);

    } else {

      var defaultPicture = '../imgs/profile/guest.jpg';

      // Set default profile picture
      userList.child(userData.uid).set({
        "profileImage": defaultPicture
      });

      // Unbind enter key press listener
      $(document).unbind("keyup");

    }

  });

};

// Export createAccount
module.exports = createAccount;
},{"../firebaseApplication":32,"../userList":36}],9:[function(require,module,exports){
var updateChatRoomsSelectMenu = require('./updateChatRoomsSelectMenu');

// Adds event listener to createNewChatRoomButton click event
var createNewChatRoomButtonPressed = function() {
  $('#createNewChatRoomButton').click(function() {
    // Update select menu
    updateChatRoomsSelectMenu();
    // Hide create new chat room button
    $('#createNewChatRoomButton').addClass("hidden");
    // Hide chatRoomsSelectLabel
    $('#chatRoomsSelectLabel').addClass("hidden");
    // Hide chat room select menu
    $('#chatRoomsSelect').addClass("hidden");
    // Show choose from existing rooms button
    $('#chooseFromExistingChatRoomsButton').removeClass("hidden");
    // Show new chat room input label
    $('#newChatRoomInputLabel').removeClass("hidden");
    // Show new chat room input
    $('#newChatRoomInput').removeClass("hidden");
  });
};

// export createNewChatRoomButtonPressed
module.exports = createNewChatRoomButtonPressed;
},{"./updateChatRoomsSelectMenu":23}],10:[function(require,module,exports){
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
},{"./createAccount":8}],11:[function(require,module,exports){
var currentChatRoomReference = require('../currentChatRoomReference');
var messageToEdit = require('../messageToEdit');
var getTimestamp = require('../timestamp.js');

// Handles done button being pressed on edit message modal
var editMessageDoneButtonPressed = function() {

  $('#editMessageDoneButton').click(function() {

    // If no message added, throw alert
    if ( $('#editMessageInput').val() === "" ) {

      // Build up alert
      var errorOutput = $('#editMessageErrorOutput');
      var errorContainer = $('<div class="alert alert-danger"></div>');

      // Add alert to modal
      errorContainer.append("Please enter a message");
      errorOutput.append(errorContainer);

    } else {

      var editedMessage = $('#editMessageInput').val();

      // Edit message
      editMessage(editedMessage);

      // Dismiss edit message modal
      $('#editMessageModal').modal('hide');

      // Unbind enter key press listener
      $(document).unbind("keyup");

      // Clear message field
      $('#editMessageInput').val("");

      // Clear error messages
      $('#editMessageErrorOutput').html("");

      // Reset message to edit
      messageToEdit.set(null);
    }
  });
};

var editMessage = function(editedMessage) {

  var editedTimestamp = "Edited: " + getTimestamp();

  // Edit message
  currentChatRoomReference.get().child(messageToEdit.get()).update({
    "message": editedMessage,
    "timestamp": editedTimestamp
  });

};

// Export messageEditPressed
module.exports = editMessageDoneButtonPressed;
},{"../currentChatRoomReference":30,"../messageToEdit":33,"../timestamp.js":35}],12:[function(require,module,exports){
var newMessageButtonPressed = require('./newMessageButtonPressed');
var addMessageButtonPressed = require('./addMessageButtonPressed');
var loginButtonPressed = require('./loginButtonPressed');
var loginUserButtonPressed = require('./loginUserButtonPressed');
var registerButtonPressed = require('./registerButtonPressed');
var createUserButtonPressed = require('./createUserButtonPressed');
var logoutButtonPressed = require('./logoutButtonPressed');
var profileButtonPressed = require('./profileButtonPressed');
var profileDoneButtonPressed = require('./profileDoneButtonPressed');
var addOwnPictureButtonPressed = require('./addOwnPictureButtonPressed');
var chooseFromDefaultPicturesButtonPressed = require('./chooseFromDefaultPicturesButtonPressed');
var editMessageDoneButtonPressed = require('./editMessageDoneButtonPressed');
var chatRoomsButtonPressed = require('./chatRoomsButtonPressed');
var chatRoomsJoinButtonPressed = require('./chatRoomsJoinButtonPressed');
var createNewChatRoomButtonPressed = require('./createNewChatRoomButtonPressed');
var chooseFromExistingChatRoomsButtonPressed = require('./chooseFromExistingChatRoomsButtonPressed');

var eventListeners = function() {

  newMessageButtonPressed();
  addMessageButtonPressed();
  loginButtonPressed();
  loginUserButtonPressed();
  registerButtonPressed();
  createUserButtonPressed();
  logoutButtonPressed();
  profileButtonPressed();
  profileDoneButtonPressed();
  addOwnPictureButtonPressed();
  chooseFromDefaultPicturesButtonPressed();
  editMessageDoneButtonPressed();
  chatRoomsButtonPressed();
  chatRoomsJoinButtonPressed();
  createNewChatRoomButtonPressed();
  chooseFromExistingChatRoomsButtonPressed();
};

module.exports = eventListeners;
},{"./addMessageButtonPressed":1,"./addOwnPictureButtonPressed":2,"./chatRoomsButtonPressed":3,"./chatRoomsJoinButtonPressed":4,"./chooseFromDefaultPicturesButtonPressed":5,"./chooseFromExistingChatRoomsButtonPressed":6,"./createNewChatRoomButtonPressed":9,"./createUserButtonPressed":10,"./editMessageDoneButtonPressed":11,"./loginButtonPressed":13,"./loginUserButtonPressed":14,"./logoutButtonPressed":15,"./newMessageButtonPressed":18,"./profileButtonPressed":19,"./profileDoneButtonPressed":20,"./registerButtonPressed":22}],13:[function(require,module,exports){
// Adds event listener to loginButton click event
var loginButtonPressed = function() {
  $('#loginButton').click(function() {
    // Present loginUserModal modal
    $('#loginUserModal').modal('show');
    // Listen for enter key press
    $(document).unbind("keyup").keyup(function(e){ 
      var code = e.which; // 
      if(code==13)
      {
        // If enter pressed, simulate loginUserButton click
        $("#loginUserButton").trigger("click");
      }
    });
  });
};

// export loginButtonPressed
module.exports = loginButtonPressed;
},{}],14:[function(require,module,exports){
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
},{"./userLogin":24}],15:[function(require,module,exports){
var currentUser = require('../currentUser');
var firebaseApplication = require('../firebaseApplication');
var rewriteAllMessages = require('../rewriteAllMessages');

// Adds event listener to logoutButton click event
var logoutButtonPressed = function() {

  $('#logoutButton').click(function() {
    // Log user out
    firebaseApplication.unauth();
    // Hide Profile button
    $('#profileButton').addClass("hidden");
    // Hide Log Out button
    $('#logoutButton').addClass("hidden");
    // Show Log in button
    $('#loginButton').removeClass("hidden");
    // Show register button
    $('#registerButton').removeClass("hidden");
    // Reset user header
    $('#userLoginHeader').html("Adding messages as Guest");
    // Reset current user to guest
    currentUser.set("Guest", "Guest");
    // Rewrite all messages
    rewriteAllMessages();
  });
};

// export logoutButtonPressed
module.exports = logoutButtonPressed;
},{"../currentUser":31,"../firebaseApplication":32,"../rewriteAllMessages":34}],16:[function(require,module,exports){
var currentChatRoomReference = require('../currentChatRoomReference');

// Handles delete button being pressed on message
var messageDeletePressed = function() {

  // Get id of message which delete button was pressed on
  var messageID = event.target.parentElement.id.split("").splice(3).join("");

  // Remove message
  currentChatRoomReference.get().child(messageID).remove();

};

// Export messageDeletePressed
module.exports = messageDeletePressed;
},{"../currentChatRoomReference":30}],17:[function(require,module,exports){
var messageToEdit = require('../messageToEdit');

// Handles edit button being pressed on message
var messageEditPressed = function() {

  // set id of message which edit button was pressed on
  messageToEdit.set( event.target.parentElement.id.split("").splice(3).join("") );

  // Show edit message modal
  $('#editMessageModal').modal('show');

  // Listen for enter key press
  $(document).unbind("keyup").keyup(function(e){ 
    var code = e.which; // recommended to use e.which, it's normalized across browsers
    if(code == 13)
      {
        $("#editMessageDoneButton").click();
      }
  });
};

// Export messageEditPressed
module.exports = messageEditPressed;
},{"../messageToEdit":33}],18:[function(require,module,exports){
// Adds event listener to newMessageButton click event
var newMessageButtonPressed = function() {
  $('#newMessageButton').click(function() {
    // Present new message modal
    $('#newMessageModal').modal('show');
    // Listen for enter key press
    $(document).unbind("keyup").keyup(function(e){ 
      var code = e.which; // 
      if(code==13)
      {
        $("#addMessageButton").click();
      }
    });
  });
};

// export newMessageButtonPressed
module.exports = newMessageButtonPressed;
},{}],19:[function(require,module,exports){
var profileImageSelected = require('./profileImageSelected');

// Adds event listener to profileButton click event
var profileButtonPressed = function() {

  $('#profileButton').click(function() {
    
    $('#profileModal').modal('show');

    // Add event listener for images
    $('.profileImages').click(profileImageSelected);

  });
};

// export profileButtonPressed
module.exports = profileButtonPressed;
},{"./profileImageSelected":21}],20:[function(require,module,exports){
var userList = require('../userList');
var currentUser = require('../currentUser');
var userList = require('../userList');

// Adds event listener to profileDoneButton click event
var profileDoneButtonPressed = function() {

  $('#profileDoneButton').click(function() {
    
    // If on image select screen
    if( $('#chooseFromDefaultPicturesButton').hasClass('hidden') ) {

      // Get selected picture
      let newProfilePicture = getSelectedPicture();

      // If an image was selected
      if(newProfilePicture !== null) {
        // Set profile image to selected image
        userList.child(currentUser.get().id).update({
          "profileImage": newProfilePicture
        });

        // Dismiss profile modal
        $('#profileModal').modal('hide');
      }

    } else {

      // Ensure input is not blank
      if ( $('#profilePictureInput').val() === "" ) {

        // Build up alert
        var errorOutput = $('#profileErrorOutput');
        var errorContainer = $('<div class="alert alert-danger"></div>');

        // Add alert to modal
        errorContainer.append("Please enter a valid URL to an image");
        errorOutput.append(errorContainer);

      } else {

        // Get new profile picture url
        var newProfilePictureURL = $('#profilePictureInput').val();

        // Set profile image to url
        userList.child(currentUser.get().id).set({
          "profileImage": newProfilePictureURL,
        });

        // Clear input field
        $('#profilePictureInput').val("");

        // Simulate click to go back to defaults
        $('#chooseFromDefaultPicturesButton').click();

        // Dismiss profile modal
        $('#profileModal').modal('hide');
      }
    }
    // Clear any errors
    $('#profileErrorOutput').html("");
  });
};

var getSelectedPicture = function() {
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


// export profileDoneButtonPressed
module.exports = profileDoneButtonPressed;
},{"../currentUser":31,"../userList":36}],21:[function(require,module,exports){
var clearSelectedPicture = require('./clearSelectedPicture');

// Default profile picture selected in profile modal
var profileImageSelected = function() {

  // If image selected
  if (event.target.tagName === "IMG") {
    // Clear previously selected picture
    clearSelectedPicture();
    // Set new picture as selectedImage
    $(event.target).addClass("selectedImage");
  }

};

// export profileImageSelected
module.exports = profileImageSelected;
},{"./clearSelectedPicture":7}],22:[function(require,module,exports){
// Adds event listener to registerButton click event
var registerButtonPressed = function() {
  $('#registerButton').click(function() {
    // Present registerUserModal modal
    $('#registerUserModal').modal('show');
    // Listen for enter key press
    $(document).unbind("keyup").keyup(function(e){ 
      var code = e.which; // 
      if(code==13)
      {
        // If enter pressed, simulate createUserButton click
        $('#createUserButton').click();
      }
    });
  });
};

// export registerButtonPressed
module.exports = registerButtonPressed;
},{}],23:[function(require,module,exports){
var firebaseApplication = require('../firebaseApplication');
var currentChatRoomReference = require('../currentChatRoomReference');

// Updates chatRoomsSelect with most recent chat room list
var updateChatRoomsSelectMenu = function() {

  // Clear select menu
  $('#chatRoomsSelect').html("");

  // Populate select menu with most update chatroom list
  firebaseApplication.once("value", function(snapshot) {

    // Get each child node
    snapshot.forEach(function(childSnapshot) {

      // Get name of current chat room being examined
      var chatRoomName = childSnapshot.key();
      // Get name of currentChatRoom
      var currentChatRoomName = currentChatRoomReference.get().path.u[0];

      // If chatRoomName is main
      if (chatRoomName === "main") {
        // If currentChatRoomReference is to main
        if (currentChatRoomName === "main") {
          // Create option item and have it titled Main and be selected
          let optionItem = `<option selected>Main</option>`;
          $('#chatRoomsSelect').append(optionItem);
        } else {
          // Otherwise, just create option item and have it titled Main
          let optionItem = `<option>Main</option>`;
          $('#chatRoomsSelect').append(optionItem);
        }
      } else {
        // Weed out users child
        if (chatRoomName !== "users") {
          // If this is the currentChatRoom set option as selected
          if (chatRoomName === currentChatRoomName) {
            let optionItem = `<option selected>${chatRoomName}</option>`;
            $('#chatRoomsSelect').append(optionItem);
          } else {
            // Otherwise create option normally
            let optionItem = `<option>${chatRoomName}</option>`;
            $('#chatRoomsSelect').append(optionItem);
          }
        }
      }

    });
  });
}

// Export updateChatRoomsSelectMenu
module.exports = updateChatRoomsSelectMenu;
},{"../currentChatRoomReference":30,"../firebaseApplication":32}],24:[function(require,module,exports){
var currentUser = require('../currentUser');
var userReference = require('../userList');
var rewriteAllMessages = require('../rewriteAllMessages');

// Logic for when user logs in 
var userLogin = function(userEmail, userPassword) {

  userReference.authWithPassword({
    "email": userEmail,
    "password": userPassword
  }, function(error, authData) {
    if(error) {
      // Pass error to present to user
      loginFailure(error);  
    } else {
      // Show header with user login
      $('#userLoginHeader').html("Adding messages as " + authData.password.email)
      // Pass authData to loginSuccess
      loginSuccess(authData.password.email, authData.uid);
    }
  }, {
    remember: "sessionOnly"
  });

};

// Login failed
var loginFailure = function(error) {

  // Build up alert
  var errorOutput = $('#loginErrorOutput');
  var errorContainer = $('<div class="alert alert-danger"></div>');

  // Add alert to modal
  errorContainer.append(error);
  errorOutput.append(errorContainer);

};

// Login succeeded
var loginSuccess = function(userEmail, userID) {
  // Show Profile button
  $('#profileButton').removeClass("hidden");
  // Add styling to profile button
  $('#profileButton').addClass("btn btn-default");
  // Show Log out button
  $('#logoutButton').removeClass("hidden");
  // Add styling to log out button
  $('#logoutButton').addClass("btn btn-danger");
  // Hide log in button
  $('#loginButton').addClass("hidden");
  // Hide register button
  $('#registerButton').addClass("hidden");
  // Set current user to be logged in user
  currentUser.set(userEmail, userID);
  // Rewrite all messages
  rewriteAllMessages();
  // Clear loginEmailInput
  $('#loginEmailInput').val("");
  // Clear loginPasswordInput
  $('#loginPasswordInput').val("");
  // Unbind enter key press listener
  $(document).unbind("keyup");
  // Dismiss login modal
  $('#loginUserModal').modal('hide');
};

// export userLogin
module.exports =  userLogin;
},{"../currentUser":31,"../rewriteAllMessages":34,"../userList":36}],25:[function(require,module,exports){
// Get currentChatRoomReference
var currentChatRoomReference = require('./currentChatRoomReference');
var writeMessageToDOM = require('./writeMessageToDOM');

// Messages container
var messagesContainer = $('#messagesContainer');

// addListenerToCurrentChatRooms
var addListenerToCurrentChatRoom = function() {
  // Adds listener for any message added, removed, or edited
  currentChatRoomReference.get().on("value", function(data) {
    // All messages
    var messages = data.val();
    // Clear DOM
    messagesContainer.html("");
    // Write each message to DOM
    for (var key in messages) {
      var currentMessage = messages[key];
      // Filter out '0' seed for new chat rooms
      if (currentMessage !== "0") {
        writeMessageToDOM(currentMessage, key);
      }
    }
  });
};

// export addListenerToCurrentChatRoom
module.exports =  addListenerToCurrentChatRoom;
},{"./currentChatRoomReference":30,"./writeMessageToDOM":37}],26:[function(require,module,exports){
var userList = require('./userList');
var rewriteAllMessages = require('./rewriteAllMessages');

// Messages container
var messagesContainer = $('#messagesContainer');

// addListenerToCurrentChatRooms
var addListenerToUsers = function() {
  // Adds listener for any change to user data, if something changed, rewriteAllMessages
  userList.on("value", function(data) {
    rewriteAllMessages();
  });
};

// export addListenerToUsers
module.exports =  addListenerToUsers;
},{"./rewriteAllMessages":34,"./userList":36}],27:[function(require,module,exports){
// Get currentChatRoomReference
var currentChatRoomReference = require('./currentChatRoomReference');

// Adds message to currentChatRoom in firebase
var addMessageToFirebase = function(message) {
  currentChatRoomReference.get().push(message);
};

// export currentUser
module.exports =  addMessageToFirebase;
},{"./currentChatRoomReference":30}],28:[function(require,module,exports){
// Get references to firebase paths
var firebaseApplication = require('./firebaseApplication');
var currentChatRoomReference = require('./currentChatRoomReference');
var userList = require('./userList');

// currentUser module
var currentUser = require('./currentUser');

// addMessageToFirebase module
var addMessageToFirebase = require('./addMessageToFirebase');

// writeMessageToDOM module
var writeMessageToDOM = require('./writeMessageToDOM');

// addListenerToCurrentChatRoom module
var addListenerToCurrentChatRoom = require('./addListenerToCurrentChatRoom');

// addListenerToUsers module
var addListenerToUsers = require('./addListenerToUsers');

// createMessageObject module
var createMessageObject = require('./createMessageObject');

// eventListeners module
var eventListeners = require('./Events/events.js');


// ============== Application ================ //

// Activate event listeners
eventListeners();
// Set default chat room to main
currentChatRoomReference.set("main");
// Add listener for chatRoom messages
addListenerToCurrentChatRoom();
// Add listener for change in user data
addListenerToUsers();








},{"./Events/events.js":12,"./addListenerToCurrentChatRoom":25,"./addListenerToUsers":26,"./addMessageToFirebase":27,"./createMessageObject":29,"./currentChatRoomReference":30,"./currentUser":31,"./firebaseApplication":32,"./userList":36,"./writeMessageToDOM":37}],29:[function(require,module,exports){
var getTimestamp = require('./timestamp');

// Creates and return message object
var createMessageObject = function(messageText, messageUser) {

  // Build up messageObject
  var messageObject = {
    "message": messageText,
    "userName": messageUser.name,
    "userID": messageUser.id,
    "timestamp": getTimestamp()
  };

  // Return messageObject to caller
  return messageObject;

};

// export writeMessageToDOM
module.exports =  createMessageObject;
},{"./timestamp":35}],30:[function(require,module,exports){
// Initially set reference to main chat room
var chatRoomReference = new Firebase("https://chatifytc.firebaseio.com/");

// export currentChatRoomReference
module.exports =  {
  set: function(newChatRoom) {
    chatRoomReference = new Firebase("https://chatifytc.firebaseio.com/" + newChatRoom);
  },
  get: function() {
    return chatRoomReference;
  }
};
},{}],31:[function(require,module,exports){
// Initially set current user to guest
var currentUser = {
  name: "Guest",
  id: "Guest"
};

// export currentUser
module.exports =  {
  set: function(newUserName, newUserID) {
    currentUser = {
      name: newUserName,
      id: newUserID
    };
  },
  get: function() {
    return currentUser;
  }
};
},{}],32:[function(require,module,exports){
// Create reference to firebase application
var firebaseApplication = new Firebase("https://chatifytc.firebaseio.com/");

// export reference
module.exports = firebaseApplication;
},{}],33:[function(require,module,exports){
// Initially set messageToEdit to null
var messageToEdit = null;

// export currentChatRoomReference
module.exports =  {
  set: function(newID) {
    messageToEdit = newID;
  },
  get: function() {
    return messageToEdit;
  }
};
},{}],34:[function(require,module,exports){
var currentChatRoomReference = require('./currentChatRoomReference');
var writeMessageToDOM = require('./writeMessageToDOM');

// Rewrites all messages on DOM
var rewriteAllMessages = function() {

  // First, clear DOM
  $('#messagesContainer').html("");

  // Get all messages
  currentChatRoomReference.get().once("value", function(data) {
    // Store all messages
    var messages = data.val();
    // Loop through each message
    for (var key in messages) {
      // Get current message
      var currentMessage = messages[key];
      // Ignore seed '0' in chat rooms
      if(currentMessage !== "0") {
        // Write currentMessage to DOM
        writeMessageToDOM(currentMessage, key);
      }
    } 
    
  });
  
};

// export rewriteAllMessages
module.exports = rewriteAllMessages;
},{"./currentChatRoomReference":30,"./writeMessageToDOM":37}],35:[function(require,module,exports){
// ============= Creates and returns formatted timestamp =============== //
var timestamp = function() {

  // Create a date object with the current time
  var now = new Date();

  // Create an array with the current month, day and time
    var date = [ now.getMonth() + 1, now.getDate(), now.getFullYear() ];

  // Create an array with the current hour, minute and second
    var time = [ now.getHours(), now.getMinutes(), now.getSeconds() ];

  // Determine AM or PM suffix based on the hour
    var suffix = ( time[0] < 12 ) ? "AM" : "PM";

  // Convert hour from military time
    time[0] = ( time[0] < 12 ) ? time[0] : time[0] - 12;

  // If hour is 0, set it to 12
    time[0] = time[0] || 12;

  // If seconds and minutes are less than 10, add a zero
    for ( var i = 1; i < 3; i++ ) {
      if ( time[i] < 10 ) {
        time[i] = "0" + time[i];
      }
    }

  // Create formatted timestampString
  var timestampString = date.join("/") + " " + time.join(":") + " " + suffix;

  // Return timestampString
  return timestampString;

};

// export timestamp
module.exports = timestamp;
},{}],36:[function(require,module,exports){
// Get reference to user list
var userList = new Firebase("https://chatifytc.firebaseio.com/users");

// export reference
module.exports = userList;
},{}],37:[function(require,module,exports){
var currentLoggedInUser = require('./currentUser');
var userList = require('./userList');
var messageDeletePressed = require('./Events/messageDeletePressed');
var messageEditPressed = require('./Events/messageEditPressed');

// Messages container
var messagesContainer = $('#messagesContainer');

// Writes message to DOM in firebase
var writeMessageToDOM = function(message, messageKey) {

  // Get data out of message object
  var currentText = message.message;
  var currentUserName = message.userName;
  var currentUserID = message.userID;
  var currentMessageTimestamp = message.timestamp;

  // Create elements for message card buildout
  var messageImg = $('<div class="messageUserImage"></div>');
  var messageCard = $('<div class="messageCard"></div>'); 
  var messageText = $('<p class="messageText"></p>').text(currentText);
  var messageUser = $('<h6 class="messageUser"></h6>').text(currentUserName + ':');
  var messageTimestamp = $('<h6 class="messageTimestamp"></h6>').text( '(' + currentMessageTimestamp + ')');

  // If currentUserID was from Guest, set default image as profile picture
  if (currentUserID === "Guest") {

    // Create img element with image
    let imageElement = `<img src="../imgs/profile/guest.jpg">`;
    // Append to messageImg
    messageImg.append(imageElement);
    
  } else {

    // Reference database based on userID to get profile picture
    var userRef = userList.child(currentUserID);
    userRef.once("value", function(data) {
      // Get users profile image
      var profileImage = data.val().profileImage;
      // Create img element with image
      let imageElement = `<img src="${profileImage}">`;
      // Append to messageImg
      messageImg.append(imageElement);
    });

  }

  // Create message card buildout
  messageCard.append(messageImg);
  messageCard.append(" "); 
  messageCard.append(messageTimestamp);
  messageCard.append(" ");
  messageCard.append(messageUser);
  messageCard.append(" ");
  messageCard.append(messageText);

  // First, ensure message is not a guest message
  if(currentUserID !== "Guest") {
    // If currentLoggedInUser matches user of message, create edit and delete button, and add to messageCard
    if (currentUserID === currentLoggedInUser.get().id) {
      var messageEditButton = $('<button class="messageEditButton btn btn-default btn-sm">Edit</button>');
      var messageDeleteButton = $('<button class="messageDeleteButton btn btn-danger btn-sm">Delete</button>');
      messageCard.append(messageDeleteButton);
      messageCard.append(messageEditButton);
      // Add event listeners
      messageDeleteButton.click(messageDeletePressed);
      messageEditButton.click(messageEditPressed);
    }
  }

  // Add unique ID to messageCard
  messageCard.attr('id', "msg" + messageKey);

  // Add messageCard to messagesContainer
  messagesContainer.prepend(messageCard);

};

// export writeMessageToDOM
module.exports =  writeMessageToDOM;
},{"./Events/messageDeletePressed":16,"./Events/messageEditPressed":17,"./currentUser":31,"./userList":36}]},{},[28]);
