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
    try{
      var msg = message.content;
      var user = message.author.username;
      var args = msg.split(" ");
      if(db) database = db;

      switch(args[1]){
        case "add":
          if(args[2]){
            var amount = args[2];
            if(args[3]) user = args[3];
            if(amount > 0){
              database.addCredits(user,amount);
              message.channel.send('You have added ' + amount + ' credits to ' + user);
              message.channel.send(user + " now has " + database.getCredits(user) + ' credits');
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
            if(args[3]) user = args[3];

            if(amount > 0){
              database.removeCredits(user,amount);
              message.channel.send('You have removed ' + amount + ' credits from ' + user);
              message.channel.send(user + " now has " + database.getCredits(user) + ' credits');
            }else{
              message.channel.send("Amount must be larger than 0!");
            }
          }else{
            message.channel.send("You must include an amount!");
          }
          break;
        default:
          if(args[1]) user = args[1];
          message.channel.send(user + " has " + database.getCredits(user) + " credits.");
      }
    }catch(err){
      console.log(err);
    }
  }


}

module.exports = CreditCommand;
