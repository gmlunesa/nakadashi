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
          message.channel.send(pasta);
        }, function(err){
          message.channel.send(err);
        });
      }else{
        message.channel.send("You must include a subreddit");
      }
    }catch(err){console.log(err);}

  }

  loadPosts(subreddit){
    var arr = [];
    return new Promise(function(resolve, reject){
      reddit.r(subreddit, function(err, data, res){
        if(err) console.log(err);
        if(!data.data || !data.data.children || data.data.children.length == 0){
          reject("Does this subreddit exist?");
        }else{
          for(var i = 0; i < data.data.children.length; i++){
            var child = data.data.children[i];
            var post = child.data.selftext;
            if(!post) post = "";
            arr.push("**" +child.data.title + "**\n" + post.substring(0,1800) + "\n" + child.data.url + "\n");

          }
          resolve(arr);
        }
      });
    });
  }

  findPost(subreddit){
    return new Promise(function(resolve, reject){
      this.loadPosts(subreddit).then(function(posts){
        resolve(posts[Math.floor(random(posts.length))]);
      }, function(err){
        reject(err);
      });
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
