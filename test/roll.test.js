import RollCommand from '../commands/random/roll';
var assert = require('chai').assert;

describe("RollCommand", () => {
    it('constructs properly', () => {
        new RollCommand({});
    });

    it('run should be a function', () => {
      var rollCommand = new RollCommand({});
      assert.typeOf(rollCommand.run, 'function');
    });

    it('run should return the message text', () => {
      var rollCommand = new RollCommand({});
      var text = "Test";
      var message = {
        content: text,
        author: {
          username: ""
        },
        channel: {
          send: function(){}
        }
      }

      var promise = rollCommand.run(message, {});
      promise.then( (msg) => {
        var result = msg;
        assert.equal(result,text);
      });
    });
});
