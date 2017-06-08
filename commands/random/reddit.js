const commando = require('discord.js-commando');
const reddit = require('redwrap');

class RedditCommand extends commando.Command{
  constructor(client){
    super(client, {
      name: 'reddit',
      group: 'random',
      memberName: 'reddit',
      description: 'Finds a random post from a given subreddit'
    });

  }

  async run(message, args){
    try{
      var args = message.content.split(" ");
      if(args.length >= 2){
        var subreddit = args[1];
        this.findPost(subreddit).then(function(pasta){
          if(pasta){
            message.channel.send(pasta);
          }else{
            message.channel.send("Post not found");
          }
        });
      }else{
        message.channel.send("You must include a subreddit");
      }
    }catch(err){console.log(err);}

  }

  loadPosts(subreddit, callback){
    var arr = [];
    reddit.r(subreddit, function(err, data, res){
      if(err) console.log(err);
      if(!data.data.children) return;
      for(var i = 0; i < data.data.children.length; i++){
        var child = data.data.children[i];
        var post = child.data.selftext;
        arr.push(post);
      }
      callback(arr);
    });
  }

  findPost(subreddit){
    return new Promise(function(resolve, reject){
      this.loadPosts(subreddit, function(posts){
        resolve(posts[Math.floor(random(posts.length))]);
      }.bind(this));
    }.bind(this));

  }


}

function random(min,max){
  if(arguments.length == 1){
    max = min;
    min = 0;
  }
  return (Math.random() * (max-min) + min);
}

module.exports = RedditCommand;
