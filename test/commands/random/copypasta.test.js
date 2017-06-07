var assert = require('chai').assert;
var sinon = require('sinon');
var spy = sinon.spy();
import CopypastaCommand from '../../../commands/random/copypasta';

describe('CopypastaCommand', function(){
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

  it('Markov chain copypasta is generated', function() {
    var result = copypastaCommand.createChain(500,1000, "This is a random test paragraph. This is for testing the createChain function");
    assert.isAtLeast(result.length, 1);
  });

  var clock;
  before(function () { clock = sinon.useFakeTimers(); });
  after(function () { clock.restore(); });

  it('New copypastas should be loaded every hour', function(){
    var loadPastasSpy = sinon.spy(copypastaCommand, 'loadPastas');
    clock.tick(3600001);
    clock.tick(3600001);
    assert.equal(loadPastasSpy.callCount,2);
    loadPastasSpy.restore();
  });
});
