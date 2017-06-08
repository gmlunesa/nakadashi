var assert = require('chai').assert;
var sinon = require('sinon');
var spy = sinon.spy();
import RedditCommand from '../../../commands/random/reddit';

describe('RedditCommand', function(){
  var redditCommand = new RedditCommand({});

  it('Posts are loaded', function(done) {
    this.timeout(5000);
    redditCommand.loadPosts('copypasta', (pastas) => {
      var data = pastas;
      assert.isAtLeast(data.length, 1);
      done();
    });
  });

  it('A post is picked', function(){
    this.timeout(5000);
    return redditCommand.findPost('copypasta').then(function(post){
      assert.isAtLeast(post.length, 1);
    });
  });

});
