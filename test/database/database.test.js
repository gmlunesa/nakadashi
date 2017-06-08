const assert = require('chai').assert;
const database = require('../../database/database');

describe('Database', function(){
  it('Database connects', function(){
    database.connect();
  });

  database.connect();

  it('Database sets and gets credits properly', function(){
    return database.setCredits(1,100).then(function(){
      return database.getCredits(1).then(function(credits){
        assert.equal(credits,100);
      });
    });
  });

  it('Database adds credits properly', function(){
    return database.setCredits(2,0).then(function(){
      return database.addCredits(2,10).then(function(){
        return database.getCredits(2).then(function(credits){
          assert.equal(credits,10);
        });
      });
    });
  });

  it('Database removes credits properly', function(){
    return database.setCredits(3,69).then(function(){
      return database.removeCredits(3,30).then(function(){
        return database.getCredits(3).then(function(credits){
          assert.equal(credits,39);
        });
      });
    });
  });

  it('Database parses integers from strings', function(){
    return database.setCredits(4,'10').then(function(){
      return database.addCredits(4,'30').then(function(){
        return database.getCredits(4).then(function(credits){
          assert.equal(credits,40);
        });
      });
    });
  });


});
