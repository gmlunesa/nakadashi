const assert = require('chai').assert;
const database = require('../../database/database');

describe('Database', function(){
  it('Database connects', function(){
    database.connect();
  });

  database.connect();

  it('Database sets and gets credits properly', function(){
    return database.setCredits(123,100).then(function(){
      return database.getCredits(123).then(function(credits){
        assert.equal(credits,100);
      });
    });
  });

  it('Database adds credits properly', function(){
    return database.setCredits(123,0).then(function(){
      return database.addCredits(123,10).then(function(){
        return database.getCredits(123).then(function(credits){
          assert.equal(credits,10);
        });
      });
    });
  });

  it('Database removes credits properly', function(){
    return database.setCredits(123,69).then(function(){
      return database.removeCredits(123,30).then(function(){
        return database.getCredits(123).then(function(credits){
          assert.equal(credits,39);
        });
      });
    });
  });


});
