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