var r = require('rethinkdb');

var database = {
  connection: null,
  connect: function(){
    r.connect({ host: 'localhost', port: 28015 }, function(err, conn) {
      if(err) throw err;
      database.connection = conn;

      r.db('test').tableList().contains('credits').run(database.connection, function(err, result){
        if(err) console.log(err);
        if(result === false){
          r.db('test').tableCreate('credits').run(database.connection, function(err,result){
            if(err) console.log(err);
          });
        }
      });
    });
  },

  addCredits: function(user, amount){
    amount = parseInt(amount);
    return new Promise(function(resolve, reject){
      r.db('test').table('credits').get(user).run(database.connection, function(err, result){
        if(result){
          var numCredits = result.credits + amount;
          r.db('test').table('credits').get(user).update({
            id: user,
            credits: numCredits
          }).run(database.connection, function(err, result){if(err)console.log(err)});
          resolve(numCredits);
        }else{
          r.db('test').table('credits').insert({
            id: user,
            credits: amount
          }).run(database.connection, function(err, result){if(err)console.log(err)});
          resolve(amount);
        }
      });
    });
  },

  removeCredits: function(user, amount){
    amount = parseInt(amount);
    return new Promise(function(resolve, reject){
      r.db('test').table('credits').get(user).run(database.connection, function(err, result){
        if(result){
          var numCredits = result.credits - amount;
          if(numCredits < 0){
            numCredits = 0;
          }

          r.db('test').table('credits').get(user).update({
            id: user,
            credits: numCredits
          }).run(database.connection, function(err, result){if(err)console.log(err)});
          resolve(numCredits);
        }else{
          r.db('test').table('credits').insert({
            id: user,
            credits: 0
          }).run(database.connection, function(err, result){if(err)console.log(err)});
          resolve(0);
        }
      });
    });

  },

  getCredits: function(user){
    console.log(user);
    return new Promise(function(resolve, reject){
      r.db('test').table('credits').get(user).run(database.connection, function(err, result){
        if(result){
          resolve(result.credits);
        }else{
          r.db('test').table('credits').insert({
            id: user,
            credits: 0
          }).run(database.connection, function(err, result){if(err)console.log(err)});
          resolve(0);
        }
      });
    });
  },

  setCredits: function(user, credits){
    credits = parseInt(credits);
    return new Promise(function(resolve, reject){
      r.db('test').table('credits').get(user).run(database.connection,function(err, result){
        if(result){
          r.db('test').table('credits').get(user).update({
            id: user,
            credits: credits
          }).run(database.connection, function(err, result){if(err)console.log(err)});
          resolve(credits);
        }else{
          r.db('test').table('credits').insert({
            id: user,
            credits: credits
          }).run(database.connection, function(err, result){if(err)console.log(err)});
          resolve(credits);
        }
      });
    });
  }

}

module.exports = database;
