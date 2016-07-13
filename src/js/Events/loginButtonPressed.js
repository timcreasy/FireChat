"use strict";

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
