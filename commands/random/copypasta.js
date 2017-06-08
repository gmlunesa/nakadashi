const commando = require('discord.js-commando');
const MarkovChain = require('markovchain');
const reddit = require('redwrap');

class CopypastaCommand extends commando.Command{
  constructor(client){
    super(client, {
      name: 'copypasta',
      group: 'random',
      memberName: 'copypasta',
      description: 'Finds a random copypasta from /r/copypasta'
    });

    this.copypastas = [];

    this.loadPastas(function(data){
      this.copypastas = data;
    }.bind(this));
  }

  async run(message, args){
    // var chain = this.createChain(500,1000, this.copypastas);
    var pasta = this.pickCopypasta(this.copypastas);
    message.channel.send(pasta);
  }

  loadPastas(callback){
    var arr = [];
    reddit.r('copypasta', function(err, data, res){
      for(var i = 0; i < data.data.children.length; i++){
        var child = data.data.children[i];
        var post = child.data.selftext;
        arr.push(post);
      }

      reddit.r('copypasta').sort('hot', function(err, data, res){
        for(var i = 0; i < data.data.children.length; i++){
          var child = data.data.children[i];
          var post = child.data.selftext;
          arr.push(post);
        }

        reddit.r('copypasta').sort('top', function(err, data, res){
          for(var i = 0; i < data.data.children.length; i++){
            var child = data.data.children[i];
            var post = child.data.selftext;
            arr.push(post);
          }

          callback(arr);
        });

      });

    });

    setTimeout(function(){
      this.loadPastas(function(data){
        this.copypastas = data;
      }.bind(this))
    }.bind(this),3600000);
  }

  /*createChain(min, max, input){  OUTDATED
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
  }*/

  pickCopypasta(posts){
    return posts[Math.floor(random(posts.length))];
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
