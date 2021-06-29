このブログでは、NodeJSとServerless FrameworkとExpressをつかった、サーバーレスREST APIのデプロイについてに紹介します。

## Serverless Frameworkとは？

Serverless FrameworkとはFunction-as-a-serviceの開発やデプロイを簡単に実行することができるオープンソースのツールです。

関数を作成するのに必要なコードとインフラを管理しています。

3つの大事なコンポーネントがあります。

- 関数
  - プログラムのコードです。たとえばユーザー情報をデータベースに保存します。
- イベント
  - AWS Lambda Functionのトリガーです。たとえばAWS API GatewayのHTTPリクエストなどです。
- リソース
  - インフラストラクチャコンポーネントです。たとえばユーザーデータを保存するAWSのDynamoDBです。

## Expressフレームワークとは？

Expressはとても人気のNodeのフレームワークです。NodeJSのコードを簡単にかくことができます。

<!-- TODO:I don't understand what u want to say. Fix it by user self -->
<!-- いろいろなURL(route)のためにいろいろなHTTPverbsのリクエストをかくことができます。 ???-->

HandlebarsなどのView RenderingエンジンやMiddlewareとの統合がかんたんにできます。

<!-- TODO:I don't understand what u want to say. Fix it by user self -->
<!-- Renderingのためにテンプレートのばしょとenv variableをセットすることができます。 -->

## さいしょに

NodeJSとServerless Frameworkをインストールするひつようがあります。

<!-- TODO:I don't understand what u want to say. Fix it by user self -->
<!-- AWS CLIをconfigureをするひつようです
Expressフレームワークをしっています -->

## APIについて

<img class="aligncenter size-full wp-image-742037" src="https://cdn-ssl-devio-img.classmethod.jp/wp-content/uploads/2021/06/architecture.png" alt="" width="781" height="345" />

- このREST APIのBackendはサーバーレスです
- ユーザーIDを保存するためにCRUD(Create,Read,Update,Delete)のオペレーションをします
- LambdaとAPI GatewayとDynamoDBはServerless Frameworkによってデプロイされます
- APIのコードは[GitHub](https://github.com/jatinmehrotra/Serverless_Express_API)にあります

## Expressの作成

プロジェクのためにDirectoryをつくって、Express Generatorを使用してApplicationのSkeletonをつくります。

[sourcecode language="text"]
mkdir serverless_blog;cd serverless_blog
npx express-generator --view=hbs
npm install ; npm i serverless-http aws-sdk
[/sourcecode]

- `app.js`のコード

[sourcecode language="text"]
const serverless = require('serverless-http');
app.use('/', indexRouter);
app.use('/users',usersRouter);

//module.exports = app;
module.exports.handler = serverless(app);
[/sourcecode]

- route directoryのなかに`users.js`ファイルを作成

[sourcecode language="text"]
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

[/sourcecode]

プロジェクトのrootで`serverless.yml`をつくります。

- `serverless.yml`のコード

[sourcecode language="text"]
service: node-serverless-api

# app and org for use with dashboard.serverless.com

app: node-serverless-api
org: jatinjmehrotra

# You can pin your service to only deploy with a specific Serverless version

# Check out our docs for more details

frameworkVersion: "2"

provider:
  name: aws
  runtime: nodejs12.x
  lambdaHashingVersion: 20201221
  region: ap-southeast-1
  iam:
    role:
      statements:
        - Effect: Allow
          Action:
            - dynamodb:DescribeTable
            - dynamodb:Query
            - dynamodb:Scan
            - dynamodb:GetItem
            - dynamodb:PutItem
            - dynamodb:UpdateItem
            - dynamodb:DeleteItem
          Resource: arn:aws:dynamodb:ap-southeast-1:*:*

resources:
  Resources:
    NotesTable:
      Type: "AWS::DynamoDB::Table"
      Properties:
        AttributeDefinitions:
          - AttributeName: id
            AttributeType: S
        KeySchema:
          - AttributeName: id
            KeyType: HASH
        ProvisionedThroughput:
          ReadCapacityUnits: 1
          WriteCapacityUnits: 1
        TableName: "Notes"

functions:
  hello:
    handler: app.handler
    events:
      - http:
          path: /user
          method: ANY
      - http:
          path: /user/{proxy+}
          method: ANY

[/sourcecode]

`serverless.yml`ファイルのなかに、LambdaでDynamodbへアクセスするのためのIAM Roleのアクセス許可を作っています。

リソースブロックのなかには、`NotesTable`というなまえのDynamoDBテーブルをつくっています。

そしてイベントブロックで、LambdaをトリガーするためにPathをつくっています。

**NOTE: DynamoDBテーブルのAttribute NameにReserved Nameをつかわないでください。Expression Attribute Name をつかってください**

## Express APIのデプロイとテスト

Lambdaのデプロイのためにこのコマンドをじっこうしてください。

[sourcecode language="text"] sls deploy --aws-profile personal[/sourcecode]

**NOTE: コマンドをじっこうしたあとで「profile is not configured error」というエラーメッセージがでたら、この[stackoverflowのpost](https://stackoverflow.com/q/66560150/13126651)をcheckをしてください**

コマンドのじっこうに成功したらAPIのEndpointが得られます。

APIのテストのためにはCurlコマンドをつかってください。もしくは、Postmanをつかうこともできます。

[sourcecode language="text"] curl -H "Content-Type: application/json" -X POST <https://3469t9kwr1.execute-api.ap-southeast-1.amazonaws.com/dev/user/create> -d '{"id":"1","firstName": "testuser"}'[/sourcecode]

- GET

[sourcecode language="text"] curl -H "Content-Type: application/json" -X GET  <https://3469t9kwr1.execute-api.ap-southeast-1.amazonaws.com/dev/user/read/1[/sourcecode>]

- PUT

[sourcecode language="text"] curl -H "Content-Type: application/json" -X PUT <https://3469t9kwr1.execute-api.ap-southeast-1.amazonaws.com/dev/user/update/1> -d '{"id":"1","firstName": "test123"}'[/sourcecode]

- DELETE

[sourcecode language="text"]curl -H "Content-Type: application/json" -X DELETE  <https://3469t9kwr1.execute-api.ap-southeast-1.amazonaws.com/dev/user/delete/1>  [/sourcecode]

つくったInfrastructureは削除しましょう。

[sourcecode language="text"] sls remove--aws-profile personal[/sourcecode]

## さいごに

Serverless Frameworkを使用すればREST APIをデプロイするのがとてもかんたんになります。

Serverless Frameworkはフレキシブルでいろいろなクラウドプロバイダーと統合できます。

Serverless Frameworkのほかの例は[このリンク](https://www.serverless.com/examples/)をみてください

それでは、**Happy Learning!**
