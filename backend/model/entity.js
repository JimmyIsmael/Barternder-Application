var Connection = require('tedious').Connection;
var ConnectionPool = require('tedious-connection-pool');
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var tp = require('tedious-promises');
const { resolve } = require('path');
var md5 = require('md5');

//This line alows to read environment variables from .env file or Azure App Service
require('dotenv').config();

var poolConfig = {
    min: 0,
    max: 100,
    idleTimeoutMillis: 30000,
    log: true //uncomment to see connection pool logs on terminal
};

var connectionConfig = {

    userName: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER_IP,
    options: {encrypt: true, database: process.env.DB_NAME, port: 1488}
};

//create the pool
var pool = new ConnectionPool(poolConfig, connectionConfig);
tp.setConnectionPool(pool);
pool.on('error', function(err) {
    console.error(err);
});

//Query Example
exports.getAllUsers = function() {
    return new Promise( resolve => {
        tp.sql("SELECT * FROM [Bartender].[dbo].[Users]")
        .execute()
        .then(function(results) {
            // console.log(results);
            resolve(results);
        }).fail(function(err) {
            console.log(err);
        });
    });
}

exports.getUserByUserNameAndPassword = function(userName, password) {
    return new Promise( resolve => {
        tp.sql("SELECT [id] ,[first_name] ,[last_name] ,[username],[role],[email], [status] " +
        " FROM [Bartender].[dbo].[Users] where username= '"+userName+"' and password=HashBytes('MD5', '"+password+"') and status = 'Active'")
        .execute()
        .then(function(results) {
            //console.log(results);
            resolve(results);
        }).fail(function(err) {
            console.log(err);
        });
    });
}

// Use this example for when we need to insert something to DB
exports.createNewUser = function(userObject) {
  console.log(userObject);
  pool.acquire(function (err, connection) {
      if (err) {
          console.error(err);
          return;
      }
      //use the connection as normal
      var request = new Request("INSERT INTO [dbo].[Users] ([first_name], [last_name], [username], [password], [home_phone], [work_phone], [cell_phone], [email], [educational_background], " +
      " [current_licenses], [emergency_contact_name], [emergency_contact_phone], [emergency_contact_email], [emergency_contact_address], [drivers_license], [social_security], " +
      " [address], [availability], [role], [status]) " +
      " VALUES (@FIRST_NAME, @LAST_NAME, @USER_NAME, HashBytes('MD5', @PASSWORD), @HOME_PHONE, @WORK_PHONE, @CELL_PHONE, @EMAIL, @EDUCATION, @LICENSES," +
      " @EMERGENCY_FIRST_NAME, @EMERGENCY_PHONE, @EMERGENCY_EMAIL, @EMERGENCY_ADDRESS, @DRIVER_LICENSE, @SOCIAL_SECURITY, " +
      " @ADDRESS, @AVAILABILITY, @ROLE, @STATUS)",
      function(err, rowCount) {
          if (err) {
              console.error(err);
              return;
          }
          //release the connection back to the pool when finished
          connection.release();
      });

      request.addParameter('FIRST_NAME', TYPES.VarChar, userObject.firstName);
      request.addParameter('LAST_NAME', TYPES.VarChar, userObject.lastName);
      request.addParameter('USER_NAME', TYPES.VarChar, userObject.username);
      request.addParameter('PASSWORD', TYPES.VarChar, userObject.password);
      request.addParameter('EMAIL', TYPES.VarChar, userObject.email);
      request.addParameter('ADDRESS', TYPES.VarChar, userObject.address);
      request.addParameter('HOME_PHONE', TYPES.VarChar, userObject.homePhone);
      request.addParameter('CELL_PHONE', TYPES.VarChar, userObject.cellPhone);
      request.addParameter('WORK_PHONE', TYPES.VarChar, userObject.workPhone);
      request.addParameter('EDUCATION', TYPES.VarChar, userObject.education);
      request.addParameter('LICENSES', TYPES.VarChar, userObject.licenses);
      request.addParameter('AVAILABILITY', TYPES.VarChar, userObject.availability);
      request.addParameter('ROLE', TYPES.VarChar, userObject.role);
      request.addParameter('STATUS', TYPES.VarChar, userObject.status);
      request.addParameter('DRIVER_LICENSE', TYPES.Bit, userObject.driversLicense);
      request.addParameter('SOCIAL_SECURITY', TYPES.Bit, userObject.socialSecurity);
      request.addParameter('EMERGENCY_FIRST_NAME', TYPES.VarChar, userObject.emergencyFirstName);
      request.addParameter('EMERGENCY_LAST_NAME', TYPES.VarChar, userObject.emergencyLastName);
      request.addParameter('EMERGENCY_EMAIL', TYPES.VarChar, userObject.emergencyEmail);
      request.addParameter('EMERGENCY_PHONE', TYPES.VarChar, userObject.emergencyPhone);
      request.addParameter('EMERGENCY_ADDRESS', TYPES.VarChar, userObject.emergencyAddress);
      connection.execSql(request);
  });

  // Returning one if no error occurred.
  return 1;
}

exports.getAllUsersByStatus = function(status) {
  return new Promise( resolve => {
      tp.sql("SELECT * FROM [Bartender].[dbo].[Users] where status='"+status+"'")
      .execute()
      .then(function(results) {
          // console.log(results);
          resolve(results);
      }).fail(function(err) {
          console.log(err);
      });
  });
}

exports.getAllUsersBySearchValue = function(searchValue) {
  return new Promise( resolve => {
      var sql = "SELECT * FROM [Bartender].[dbo].[Users] where first_name like '%'+'" +searchValue+ "'+ '%' or last_name like '%'+'" + searchValue + "' + '%'";
      console.log(sql);
      tp.sql(sql)
      .execute()
      .then(function(results) {
          // console.log(results);
          resolve(results);
      }).fail(function(err) {
          console.log(err);
      });
  });
}

exports.createNewDrink = function(drinkObject) {
  //console.log(drinkObject);
  pool.acquire(function (err, connection) {
      if (err) {
          console.error(err);
          return;
      }
      //use the connection as normal
      var request = new Request("INSERT INTO [dbo].[Drinks] ([drink_name], [drink_description], [drink_price], [drink_recipe]) values (@DRINK_NAME, @DRINK_DESCRIPTION, @DRINK_PRICE, @DRINK_RECIPE)",
      function(err, rowCount) {
          if (err) {
              console.error(err);
              return;
          }
          //release the connection back to the pool when finished
          connection.release();
      });

      request.addParameter('DRINK_NAME', TYPES.VarChar, drinkObject.name);
      request.addParameter('DRINK_DESCRIPTION', TYPES.VarChar, drinkObject.description);
      request.addParameter('DRINK_PRICE', TYPES.VarChar, drinkObject.price);
      request.addParameter('DRINK_RECIPE', TYPES.VarChar, drinkObject.recipe);
      connection.execSql(request);
  });

  // Returning one if no error occurred.
  return 1;
}

exports.editDrink = function(drinkObject) {
  //console.log(drinkObject);
  pool.acquire(function (err, connection) {
      if (err) {
          console.error(err);
          return;
      }
      //use the connection as normal
      var request = new Request("UPDATE [dbo].[Drinks] SET [drink_name] = @DRINK_NAME, [drink_description] = @DRINK_DESCRIPTION, [drink_recipe] = @DRINK_RECIPE, [drink_price] = @DRINK_PRICE " +
      " WHERE id = @DRINK_ID",
      function(err, rowCount) {
          if (err) {
              console.error(err);
              return;
          }
          //release the connection back to the pool when finished
          connection.release();
      });

      request.addParameter('DRINK_ID', TYPES.VarChar, drinkObject.id);
      request.addParameter('DRINK_NAME', TYPES.VarChar, drinkObject.name);
      request.addParameter('DRINK_DESCRIPTION', TYPES.VarChar, drinkObject.description);
      request.addParameter('DRINK_PRICE', TYPES.VarChar, drinkObject.price);
      request.addParameter('DRINK_RECIPE', TYPES.VarChar, drinkObject.recipe);
      connection.execSql(request);
  });

  // Returning one if no error occurred.
  return 1;
}

exports.getAllDrinks = function() {
  return new Promise( resolve => {
      tp.sql("SELECT [id] ,[drink_name] as [name], [drink_description] as [description], [drink_recipe] as [recipe], [drink_price] as [price] FROM [Bartender].[dbo].[Drinks] order by id")
      .execute()
      .then(function(results) {
          // console.log(results);
          resolve(results);
      }).fail(function(err) {
          console.log(err);
      });
  });
}

exports.getDrink = function(drinkId) {
  return new Promise( resolve => {
      tp.sql("SELECT [id] ,[drink_name] as [name], [drink_description] as [description], [drink_recipe] as [recipe], [drink_price] as [price] FROM [Bartender].[dbo].[Drinks]"
      + " where id=" + drinkId)
      .execute()
      .then(function(results) {
          // console.log(results);
          resolve(results);
      }).fail(function(err) {
          console.log(err);
      });
  });
}

exports.listDrinksByLowerPrice = function() {
  return new Promise( resolve => {
      tp.sql("SELECT [id] ,[drink_name] as [name], [drink_description] as [description], [drink_recipe] as [recipe], [drink_price] as [price] FROM [Bartender].[dbo].[Drinks] order by [price] asc")
      .execute()
      .then(function(results) {
          resolve(results);
      }).fail(function(err) {
          console.log(err);
      });
  });
}

exports.listDrinksByHigherPrice = function() {
  return new Promise( resolve => {
      tp.sql("SELECT [id] ,[drink_name] as [name], [drink_description] as [description], [drink_recipe] as [recipe], [drink_price] as [price] FROM [Bartender].[dbo].[Drinks] order by [price] desc")
      .execute()
      .then(function(results) {
          resolve(results);
      }).fail(function(err) {
          console.log(err);
      });
  });
}

exports.listDrinksByKeyword = function(keyword) {
  return new Promise( resolve => {
    var sql ="SELECT [id] ,[drink_name] as [name], [drink_description] as [description], [drink_recipe] as [recipe], [drink_price] as [price] FROM [Bartender].[dbo].[Drinks]" +
    "where [drink_name] like '%' + '"+ keyword + "' + '%' or [drink_description] like '%' + '" + keyword +"' + '%'";
    tp.sql(sql)
    .execute()
    .then(function(results) {
        resolve(results);
    }).fail(function(err) {
        console.log(err);
    });
  });
}
