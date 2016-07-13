"use strict";

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
