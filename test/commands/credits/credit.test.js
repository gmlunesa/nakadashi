import CreditCommand from '../../../commands/credits/credit';
const assert = require('chai').assert;
const sinon = require('sinon');
const database = require('../../../database/database');

describe('CreditCommand', function(){
  var creditCommand = new CreditCommand({});
  // var fakeDB = {
  var addCreditsSpy = sinon.spy(database, 'addCredits');
  var removeCreditsSpy = sinon.spy(database, 'removeCredits');

  // }
  var fakeMsg = {
    content: "!credit",
    author: {
      username: "TestUser"
    },
    channel: {
      send: function(){}
    }
  }

  it('Should call getCredits when there are no arguments', function(){
    var getCreditsSpy = sinon.spy(database, 'getCredits');
    creditCommand.run(fakeMsg);
    assert.equal(getCreditsSpy.callCount, 1);
    getCreditsSpy.restore();
  })

  it('Should call getCredits on another user with one user argument', function(){
    var getCreditsSpy = sinon.spy(database, 'getCredits');
    fakeMsg.content = "!credit AnotherUser";
    creditCommand.run(fakeMsg);
    assert.equal(getCreditsSpy.calledWithExactly("AnotherUser"), true);
    getCreditsSpy.restore();
  });
});
