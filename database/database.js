//var db = require('');

var database = {

  credits: {},

  addCredits: function(user, amount){
    if(this.credits[user]){
      this.credits[user] = this.credits[user] + parseInt(amount);
    }else{
      this.credits[user] = parseInt(amount);
    }
  },

  removeCredits: function(user, amount){
    if(this.credits[user]){
      this.credits[user] = this.credits[user] - parseInt(amount);
    }else{
      this.credits[user] = 0;
    }

    if(this.credits[user] < 0) this.credits[user] = 0;
  },

  getCredits: function(user){
    if(!this.credits[user]) this.credits[user] = 0;
    return this.credits[user];
  }
}

module.exports = database;
