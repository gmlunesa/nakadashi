const assert = require('chai').assert;
const database = require('../../database/database');

describe('Database', function(){
  it('Database connects', function(){
    database.connect();
  });

  database.connect();

  it('Database sets credits properly', function(){
    return database.setCredits(123,100).then(function(credits){
      assert.equal(credits,100);
    });
  });

  it('Database adds credits properly', function(){
    return database.addCredits(123,10).then(function(credits){
      assert.equal(credits,110);
    });
  });

  it('Database removes credits properly', function(){
    return database.removeCredits(123,20).then(function(credits){
      assert.equal(credits,90);
    });
  });

  it('Database gets credits properly', function(){
    return database.getCredits(123).then(function(credits){
      assert(credits,90);
    });
  });

});
