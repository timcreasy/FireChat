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