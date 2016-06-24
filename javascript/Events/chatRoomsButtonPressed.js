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