import RollCommand from '../../../commands/random/roll';
var assert = require('chai').assert;

describe("RollCommand", () => {
  var rollCommand = new RollCommand({});

  var message = {
    content: "",
    author: {
      username: ""
    },
    channel: {
      send: function(){}
    }
  }

  it('run should be a function', () => {
    assert.typeOf(rollCommand.run, 'function');
  });

  it('should roll a number between 0 and 6 by default', () => {
    var text = "!roll";
    message.content = text;

    var promise = rollCommand.run(message, {});
    return promise.then( (roll) => {
      var result = roll;
      assert.isAtMost(result,6);
    });
  });

  it('should roll a number beween 0 and first argument', () => {
    var max =  10;
    var text = "!roll " + max;
    message.content = text;

    var promise = rollCommand.run(message, {});
    return promise.then( (roll) => {
      var result = roll;
      assert.isAtMost(result,max);
    });
  });

  it('should roll 0 when passed 0 as argument', () => {
    var text = "!roll 0";
    message.content = text;

    var promise = rollCommand.run(message, {});
    return promise.then( (roll) => {
      var result = roll;
      assert.equal(result,0);
    });
  });

  it('should roll 0 when passed argument less than 0', () => {
    var text = "!roll -5";
    message.content = text;

    var promise = rollCommand.run(message, {});
    return promise.then( (roll) => {
      var result = roll;
      assert.equal(result,0);
    });
  });

  it('should roll 0 when given non-number argument', () => {
    var text = "!roll string";
    message.content = text;

    var promise = rollCommand.run(message, {});
    return promise.then( (roll) => {
      var result = roll;
      assert.equal(result,0);
    });
  });
});
