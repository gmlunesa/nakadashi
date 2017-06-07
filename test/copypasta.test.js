var assert = require('chai').assert;
import CopypastaCommand from '../commands/random/copypasta';

describe('CopypastaCommand', () => {
  var copypastaCommand = new CopypastaCommand({});

  var message = {
    content: "!copypasta",
    author: {
      username: ""
    },
    channel: {
      send: function(){}
    }
  }

  it('Copypastas are loaded', function(done) {
    this.timeout(5000);
    copypastaCommand.loadPastas((pastas) => {
      var data = pastas;
      assert.isAtLeast(data.length, 1);
      done();
    });
  });

  it('Markov chain copypasta is generated', () => {
    var result = copypastaCommand.createChain(500,1000, "This is a random test paragraph. This is for testing the createChain function");
    assert.isAtLeast(result.length, 1);
  });
});
