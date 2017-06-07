//var db = require('');

var database = {
  addCredits: function(user, amount){
    //console.log("Adding",amount, "credits to ", user);
  },

  removeCredits: function(user, amount){
    //console.log("Removing",amount, "credits from", user);
  },

  getCredits: function(user){
    //console.log(user, "has x credits");
    return "x";
  }
}

module.exports = database;
