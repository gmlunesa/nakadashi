import CreditCommand from '../../../commands/credits/credit';
const assert = require('chai').assert;
const sinon = require('sinon');

describe('CreditCommand', function(){
  var creditCommand = new CreditCommand({});
  var fakeDB = {
    addCredits: function(){},
    removeCredits: function(){},
    getCredits: function(){}
  }
  var fakeMsg = {
    content: "!credit",
    author: {
      username: "TestUser"
    },
    channel: {
      send: function(){}
    }
  }

  it('Should call getCredits on self when there are no arguments', function(){
    var getCreditsSpy = sinon.spy(fakeDB, 'getCredits');
    creditCommand.run(fakeMsg,[],fakeDB);
    getCreditsSpy.restore();
    assert.equal(getCreditsSpy.calledWithExactly("TestUser"), true);
  })

  it('Should call getCredits on another user with one user argument', function(){
    var getCreditsSpy = sinon.spy(fakeDB, 'getCredits');
    fakeMsg.content = "!credit AnotherUser";
    creditCommand.run(fakeMsg);
    getCreditsSpy.restore();
    assert.equal(getCreditsSpy.calledWithExactly("AnotherUser"), true);
  });
});
