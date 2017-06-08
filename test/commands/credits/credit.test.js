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
      addCredits: function(){
        return new Promise(function(resolve, reject){
          resolve(":D");
        })
      },
      removeCredits: function(){
        return new Promise(function(resolve, reject){
          resolve(":O");
        })
      },
      getCredits: function(){
        return new Promise(function(resolve, reject){
          resolve(":)");
        })
      }
    }
    var getCreditsSpy = sinon.spy(fakeDB, 'getCredits');
    fakeMsg.content = "!credit"
    var promise = creditCommand.run(fakeMsg,[],fakeDB);

    return promise.then(function(){
      getCreditsSpy.restore();
      assert.equal(getCreditsSpy.calledWithExactly(fakeMsg.member.user.id), true);
    });


  })

  it('Should call getCredits on another user with one user argument', function(){
    var fakeDB = {
      addCredits: function(){
        return new Promise(function(resolve, reject){
          resolve(":D");
        })
      },
      removeCredits: function(){
        return new Promise(function(resolve, reject){
          resolve(":O");
        })
      },
      getCredits: function(){
        return new Promise(function(resolve, reject){
          resolve(":)");
        })
      }
    }
    
    var getCreditsSpy = sinon.spy(fakeDB  , 'getCredits');
    fakeMsg.content = "!credit <@321>";
    var promise = creditCommand.run(fakeMsg,[],fakeDB);
    return promise.then(function(){
      getCreditsSpy.restore();
      assert.equal(getCreditsSpy.calledWithExactly("321"), true);
    });


  });
});
