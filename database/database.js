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

      database.getCredits(123);



    });
  },

  addCredits: function(user, amount){
    amount = parseInt(amount);
    r.db('test').table('credits').get(user).run(database.connection, function(err, result){
      if(result){
        var numCredits = result.credits;
        r.db('test').table('credits').get(user).update({
          id: user,
          credits: (numCredits + amount)
        }).run(database.connection, function(err, result){if(err)console.log(err)});
      }else{
        r.db('test').table('credits').insert({
          id: user,
          credits: amount
        }).run(database.connection, function(err, result){if(err)console.log(err)});
      }
    });

  },

  removeCredits: function(user, amount){
    amount = parseInt(amount);
    r.db('test').table('credits').get(user).run(database.connection, function(err, result){
      if(result){
        var numCredits = result.credits;
        if(numCredits - amount < 0){
          numCredits = 0;
          amount = 0;
        }

        r.db('test').table('credits').get(user).update({
          id: user,
          credits: (numCredits + amount)
        }).run(database.connection, function(err, result){if(err)console.log(err)});
      }else{
        r.db('test').table('credits').insert({
          id: user,
          credits: amount
        }).run(database.connection, function(err, result){if(err)console.log(err)});
      }
    });
  },

  getCredits: function(user){
    console.log(user);
    return new Promise(function(resolve, reject){
      r.db('test').table('credits').get(user).run(database.connection, function(err, result){
        if(result){
          console.log(result);
          resolve(result.credits);
        }else{
          console.log("Inserting " + user + " into database");
          r.db('test').table('credits').insert({
            id: user,
            credits: 0
          }).run(database.connection, function(err, result){if(err)console.log(err)});
          numCredits = 0;
          resolve(0);
        }
      });
    });


  }

}

module.exports = database;
