const commando = require('discord.js-commando');
const MarkovChain = require('markovchain');
const reddit = require('redwrap');

class CopypastaCommand extends commando.Command{
  constructor(client){
    super(client, {
      name: 'copypasta',
      group: 'random',
      memberName: 'copypasta',
      description: 'Blend together copypastas from /r/copypasta into a work of art'
    });

    this.copypastas;

    this.loadPastas(function(data){
      this.copypastas = data;
    }.bind(this));
  }

  async run(message, args){
    var chain = this.createChain(500,1000, this.copypastas);
    message.channel.send(chain);
  }

  loadPastas(callback){
    var input = "";
    reddit.r('copypasta', function(err, data, res){
      for(var i = 0; i < data.data.children.length; i++){
        var child = data.data.children[i];
        var post = child.data.selftext;
        input+=post;
      }

      reddit.r('copypasta').sort('hot', function(err, data, res){
        for(var i = 0; i < data.data.children.length; i++){
          var child = data.data.children[i];
          var post = child.data.selftext;
          input+=post;
        }

        reddit.r('copypasta').sort('top', function(err, data, res){
          for(var i = 0; i < data.data.children.length; i++){
            var child = data.data.children[i];
            var post = child.data.selftext;
            input+=post;
          }

          callback(input);
        });

      });

    });

    setTimeout(function(){
      this.loadPastas(function(data){
        this.copypastas = data;
      }.bind(this))
    }.bind(this),3600000);
  }

  createChain(min, max, input){
    var tries = 0;
    var result = "";
    while(result.length < min && tries < 10){
      var quotes = new MarkovChain(input);
      var words = input.split(" ");
      var first = words[Math.floor(random(words.length-1))];
      var chain = quotes.start(first).end(max).process();
      if(chain.length > result.length) result = chain;
      tries++;
    }

    return result;
  }


}

function random(min,max){
  if(arguments.length == 1){
    max = min;
    min = 0;
  }
  return (Math.random() * (max-min) + min);
}

module.exports = CopypastaCommand;
