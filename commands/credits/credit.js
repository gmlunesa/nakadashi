const commando = require('discord.js-commando');
var database = require('../../database/database');

class CreditCommand extends commando.Command{
  constructor(client){
    super(client, {
      name: 'credit',
      group: 'credits',
      memberName: 'credit',
      description: 'General command for credit management'
    });
  }

  async run(message, args, db){

    //TODO: Check if user is valid

    try{
      var msg = message.content;
      var userID = message.member.user.id;
      var args = msg.split(" ");
      if(db) database = db;

      switch(args[1]){
        case "add":
          if(args[2]){
            var amount = args[2];
            if(args[3]){
              userID = args[3].substring(2,args[3].length-1);
              username = args[3];
            }else{
              username = "<@" + userID + ">";
            }

            if(amount > 0){
              database.addCredits(userID,amount);
              var credits = database.getCredits(userID);
              message.channel.send('You have added ' + amount + ' credits to ' + username);
              message.channel.send(username + " now has " + credits + ' credits');
            }else{
              message.channel.send("Amount must be larger than 0!");
            }
          }else{
            message.channel.send("You must include an amount!");
          }
          break;
        case "remove":
          if(args[2]){
            var amount = args[2];
            if(args[3]){
              userID = args[3].substring(2,args[3].length-1);
              username = args[3];
            }else{
              username = "<@" + userID + ">";
            }

            if(amount > 0){
              database.removeCredits(userID,amount);
              var credits = database.getCredits(userID);
              message.channel.send('You have removed ' + amount + ' credits from ' + username);
              message.channel.send(username + " now has " + credits + ' credits');
            }else{
              message.channel.send("Amount must be larger than 0!");
            }
          }else{
            message.channel.send("You must include an amount!");
          }
          break;
        default:
          var username;
          if(args[1]){
            userID = args[1].substring(2,args[1].length-1);
            username = args[1];
          }else{
            username = "<@" + userID + ">";
          }
          var credits = database.getCredits(userID);
          message.channel.send(username + " has " + credits + " credits.");
      }
    }catch(err){
      console.log(err);
    }
  }


}

module.exports = CreditCommand;
