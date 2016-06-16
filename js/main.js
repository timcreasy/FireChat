// On initial load, load default messages
//Chatty.loadData("../json/data.json");

// // Retrieve new posts as they are added to our database
// Chatty.firebaseRef.on("child_added", function(snapshot) {
//   var newMessage = snapshot.val();
  
// });

Chatty.addFirebaseEvents();

// var myTestMessage = {
//   "message": "I am testing adding to Firebase",
//   "user": "Dale",
//   "messageID": Chatty.getUniqueID()
// };

// Chatty.addMessageToFirebase(myTestMessage);

document.getElementById('newMessageButton').addEventListener("click", Chatty.addNewMessageClicked);