const sql = require('../../model/entity');

exports.getNotFound = function (req, res,next){
    res.status(404).send();
}

exports.getHelloWorld = function (req, res,next){
    res.status(200).send('Hello World');
}

exports.getAllUsers = async function (req, res,next){
    let UserList = [];
    UserList = await sql.getAllUsers();
    if(UserList.length > 0){
        res.status(200).json({status:200, results: UserList, resultsLength: UserList.length});
    }else{
        res.status(204).send();
    }
}

exports.getUserByUserNameAndPassword = async function (req, res,next){
    let UserList = [];
    UserList = await sql.getUserByUserNameAndPassword(req.params.userName,req.params.password);
    if(UserList.length > 0){
        res.status(200).json({status:200, results: UserList, resultsLength: UserList.length});
    }else{
        res.status(204).send();
    }
}

exports.createNewUser = async function (req, res,next){
  let rowCount = sql.createNewUser(req.body);
  console.log(rowCount);
  if(rowCount == 1){
    res.status(201).json({userCreated: true});
  }else{
    res.status(202).send();
  }
}

exports.getAllUsersByStatus = async function (req, res,next){
  let UserList = [];
  UserList = await sql.getAllUsersByStatus(req.params.status);
  if(UserList.length > 0){
      res.status(200).json({status:200, results: UserList, resultsLength: UserList.length});
  }else{
      res.status(204).send();
  }
}

exports.getAllUsersBySearchValue = async function (req, res,next){
  let UserList = [];
  UserList = await sql.getAllUsersBySearchValue(req.params.searchValue);
  if(UserList.length > 0){
      res.status(200).json({status:200, results: UserList, resultsLength: UserList.length});
  }else{
      res.status(204).send();
  }
}

exports.createNewDrink = async function (req, res,next){
  let rowCount = sql.createNewDrink(req.body);
  console.log(rowCount);
  if(rowCount == 1){
    res.status(201).json({drinkCreated: true});
  }else{
    res.status(202).send();
  }
}

exports.editDrink = async function (req, res,next){
  let rowCount = sql.editDrink(req.body);
  console.log(rowCount);
  if(rowCount == 1){
    res.status(201).json({drinkCreated: true});
  }else{
    res.status(202).send();
  }
}

exports.getAllDrinks = async function (req, res,next){
  let drinkList = [];
  drinkList = await sql.getAllDrinks();
  if(drinkList.length > 0){
      res.status(200).json({status:200, results: drinkList, resultsLength: drinkList.length});
  }else{
      res.status(204).send();
  }
}

exports.getDrink = async function (req, res,next){
  let drinkList = [];
  drinkList = await sql.getDrink(req.params.drinkId);
  if(drinkList.length > 0){
      res.status(200).json({status:200, results: drinkList, resultsLength: drinkList.length});
  }else{
      res.status(204).send();
  }
}

exports.listDrinksByLowerPrice = async function (req, res,next){
  let drinkList = [];
  drinkList = await sql.listDrinksByLowerPrice();
  if(drinkList.length > 0){
      res.status(200).json({status:200, results: drinkList, resultsLength: drinkList.length});
  }else{
      res.status(204).send();
  }
}

exports.listDrinksByHigherPrice = async function (req, res,next){
  let drinkList = [];
  drinkList = await sql.listDrinksByHigherPrice();
  if(drinkList.length > 0){
      res.status(200).json({status:200, results: drinkList, resultsLength: drinkList.length});
  }else{
      res.status(204).send();
  }
}

exports.listDrinksByKeyword = async function (req, res,next){
  let drinkList = [];
  drinkList = await sql.listDrinksByKeyword(req.params.keyword);
  if(drinkList.length > 0){
      res.status(200).json({status:200, results: drinkList, resultsLength: drinkList.length});
  }else{
      res.status(204).send();
  }
}

exports.createNewOrder = async function (req, res,next){
  let rowCount = sql.createNewOrder(req.body);
  console.log(rowCount);
  if(rowCount == 1){
    res.status(201).json({orderCreated: true});
  }else{
    res.status(202).send();
  }
}
