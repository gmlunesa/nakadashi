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
    this.commandClient = client;
  }

  async run(message, args, db){

    try{
      var msg = message.content;
      var userID = message.member.user.id;
      var args = msg.split(" ");
      if(db) database = db;

      switch(args[1]){
        case "add":
          if(args[2]){
            var amount = args[2];
            if(args[3]) userID = args[3].substring(2,args[3].length-1);
            return this.isUserValid(userID).then(function(){
                  var username = "<@" + userID + ">";

                  if(amount > 0){
                    database.addCredits(userID,amount);
                    message.channel.send('You have added ' + amount + ' credits to ' + username);
                  }else{
                    message.channel.send("Amount must be larger than 0!");
                  }
                }, function(err){
                  message.channel.send("That is not a valid user!");
                });

          }else{
            message.channel.send("You must include an amount!");
          }
          break;
        case "remove":
          if(args[2]){
            var amount = args[2];
            if(args[3]) userID = args[3].substring(2,args[3].length-1);

              return this.isUserValid(userID).then(function(){
                  var username = "<@" + userID + ">";

                  if(amount > 0){
                    database.removeCredits(userID,amount);
                    message.channel.send('You have removed ' + amount + ' credits from ' + username);
                  }else{
                    message.channel.send("Amount must be larger than 0!");
                  }
              }, function(err){
                message.channel.send("That is not a valid user!");
              });

          }else{
            message.channel.send("You must include an amount!");
          }
          break;
        default:
          if(args[1]) userID = args[1].substring(2,args[1].length-1);


          return this.isUserValid(userID).then(function(){
              var username = "<@" + userID + ">";
              database.getCredits(userID).then(function(credits){
                message.channel.send(username + " now has " + credits + ' credits');
              }, function(){});
          }, function(err){
            message.channel.send("That is not a valid user!");
          });
          break;

      }
    }catch(err){
      console.log(err);
    }
  }

  isUserValid(userID){
    return this.commandClient.fetchUser(userID);
  }

}

module.exports = CreditCommand;
