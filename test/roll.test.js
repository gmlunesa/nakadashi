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

    it('should roll a number between 0 and 6 by default', () => {
      var rollCommand = new RollCommand({});
      var text = "!roll";
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
      return promise.then( (roll) => {
        var result = roll;
        assert.isAtMost(result,6);
      });
    });

    it('should roll a number beween 0 and first argument', () => {
      var rollCommand = new RollCommand({});
      var max =  10;
      var text = "!roll " + max;
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
      return promise.then( (roll) => {
        var result = roll;
        assert.isAtMost(result,max);
      });
    });

    it('should roll 0 when passed 0 as argument', () => {
      var rollCommand = new RollCommand({});
      var text = "!roll 0";
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
      return promise.then( (roll) => {
        var result = roll;
        assert.equal(result,0);
      });
    });

    it('should roll 0 when passed argument less than 0', () => {
      var rollCommand = new RollCommand({});
      var text = "!roll -5";
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
      return promise.then( (roll) => {
        var result = roll;
        assert.equal(result,0);
      });
    });
});
