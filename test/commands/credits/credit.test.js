import CreditCommand from '../../../commands/credits/credit';
const assert = require('chai').assert;
const sinon = require('sinon');

describe('CreditCommand', function(){
  var creditCommand = new CreditCommand({
    fetchUser: function(){
      return new Promise(function(resolve, reject){
        resolve({username: "FakeUser"});
      });
    }
  });

  var fakeMsg = {
    content: "!credit",
    author: {
      username: "TestUser"
    },
    member: {
      user: {
        id: 123
      }
    },
    channel: {
      send: function(){}
    }
  }

  it('Should call getCredits on self when there are no arguments', function(){
    var fakeDB = {
      addCredits: function(){},
      removeCredits: function(){},
      getCredits: function(){}
    }
    var getCreditsSpy = sinon.spy(fakeDB, 'getCredits');
    fakeMsg.content = "!credit"
    creditCommand.run(fakeMsg,[],fakeDB);
    getCreditsSpy.restore();
    assert.equal(getCreditsSpy.calledWithExactly(fakeMsg.member.user.id), true);
  })

  it('Should call getCredits on another user with one user argument', function(){
    var fakeDB = {
      addCredits: function(){},
      removeCredits: function(){},
      getCredits: function(){}
    }
    var getCreditsSpy = sinon.spy(fakeDB  , 'getCredits');
    fakeMsg.content = "!credit <@321>";
    creditCommand.run(fakeMsg,[],fakeDB);
    getCreditsSpy.restore();
    assert.equal(getCreditsSpy.calledWithExactly("321"), true);
  });
});
