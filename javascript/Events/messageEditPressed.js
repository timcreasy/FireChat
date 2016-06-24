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