var Chatty = (function(Chatty) {


  // ============= Loads message data from external source =============== //
  Chatty.loadData = function(dataSource) {

    // XML request to load data, with callbacks
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {

        var parsedData = JSON.parse(xmlhttp.responseText);
        Chatty.processDefaultMessages(parsedData);
      }
    };
    xmlhttp.open("GET", dataSource);
    xmlhttp.send();

  };


  // ============= Handles each individual messages formatting and writing =============== //
  Chatty.processDefaultMessages = function(messages) {

    // Get messages out of JSON, store as array
    var listOfMessages = messages.messages;

    // Loop through listOfMessages and process each message
    for (let i = 0; i < listOfMessages.length; i++) {
      // Get currentMessage
      var currentMessage = listOfMessages[i];
      // Set uniqueID for message
      currentMessage.messageID = Chatty.getUniqueID();

      Chatty.writeMessageToFirebase(currentMessage);

      // Add message to array
      Chatty.addMessage(currentMessage);
      // Write message to DOM
      Chatty.writeMessageToDOM(currentMessage);
    }

  };


  // Return augmented Chatty
  return Chatty;

})(Chatty || {});