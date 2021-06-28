const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.status(200).json({Welcome_msg:'Use create,read,update,delete routes to this Express API '});
});


router.post('/create', function(req, res, next) {
  
  const { id, firstName } = req.body;
  if (typeof id !== 'string') {
    res.status(400).json({ error: '"id" must be a string' });
  } else if (typeof firstName !== 'string') {
    res.status(400).json({ error: '"firstName" must be a string' });
  }

  const params = {
    TableName: 'Notes',
    Item: {
      "id": id,
      "firstName": firstName,
    },
    ReturnValues: 'ALL_OLD'
  };

  
  dynamoDb.put(params, (error,data) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error:error });
    }else if(Object.keys(data).length === 0 && data.constructor === Object){
      res.status(200).json({Item:{id,firstName}})
    }
    else{
    res.status(400).json({Item:'Item already exist'});
    }
  });
  
  

})


router.post("/readUser", async function (req, res) {
  id=req.body.id
  res.redirect('/dev/users/readUser/' + id)
})


router.get("/read/:id", async function (req, res) {
  
  const params = {
    TableName: 'Notes',
    Key: {
      "id": req.params.id,
    }
  };

  try {
    dynamoDb.get(params, function (err, data) {
      if(err){
        res.status(400).json({ error: 'Could not read user' });
      }else if (Object.keys(data).length === 0 && data.constructor === Object) {
        
        res.status(400).json({ error: 'Item does not exist' });
      }
      else {
        res.status(200).json(data);
      }
  })
}
    
   catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not retreive user" });
  }
});

router.put('/update/:id', function(req, res, next) {
  
  const { id, firstName } = req.body;
  if (typeof id !== 'string') {
    res.status(400).json({ error: '"id" must be a string' });
  } else if (typeof firstName !== 'string') {
    res.status(400).json({ error: '"firstName" must be a string' });
  }
  
  
  const params = {
    TableName: 'Notes',
    Key: {
      "id": req.params.id
    },
    UpdateExpression: "set firstName = :y",
    ConditionExpression: "attribute_exists(id)",
    ExpressionAttributeValues:{
            ":y":firstName
    },
    ReturnValues:"UPDATED_NEW"
  };

  dynamoDb.update(params, (error,data) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error:"Item does not exist for updation" });
    }
    else {
      res.status(200).json(data);
    }
    
  });
})

router.delete('/delete/:id',function(req, res, next) {
  
  const params = {
    TableName: 'Notes',
    Key: {
      "id": req.params.id,
    },
    ConditionExpression: "attribute_exists(id)",
    ReturnValues: 'ALL_OLD'
  };

  dynamoDb.delete(params, function (error,data) {
    if (error) {
      console.log(error);
      res.status(400).json({ error:"Item does not exist for deletion" });
    }
    else {
      res.status(200).json(data);
    }
  });
})

module.exports = router;
