/**
 @author: Deep
 configuration is define to make connection with the database for the different environment.
*/

var getDbConnection = function () {
    switch (process.env.NODE_ENV) {
    case 'development':
      var db = mongoose.connect('mongodb://deepak_db:deepak1@ds163610.mlab.com:63610/mean_stack_db');
      return checkMongooseConnection(db)
     case 'staging':
       var db = mongoose.connect('mongodb://');
        return checkMongooseConnection(db)
    case 'production':
      var db = mongoose.connect('mongodb://');
       return checkMongooseConnection(db)

    case 'test':
        var db = mongoose.connect('mongodb://');
        return checkMongooseConnection(db)
    }
}


 //function to check connection to database server
 function checkMongooseConnection(db){
       mongoose.connection.on('open', function (ref) {
            Logger.info('Connected to mongo server.');
            return db
       });
       mongoose.connection.on('error', function (err) {
          Logger.error('Could not connect to mongo server!');
          Logger.error(err);
      });
 }



module.exports.getDbConnection = getDbConnection;
