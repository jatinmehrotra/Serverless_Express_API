<blockquote>とてもはやいデプロイとかじどうてきなスケーリングとかpay-per-invocationのねだんがあるのでさいきんはおくのひとがWeb<span class="Y2IQFc" lang="ja">アプリケーションをデプロイするのためにだんだんサーバーレスアーキテクチャをつかっています。</span>

このブログは、nodejsとserverlessとexpress frameworkをつかった、<span class="Y2IQFc" lang="ja">サーバーレス</span>REST APIのデプロイについてについてはなします。</blockquote>
<h2 id="tw-target-text" class="tw-data-text tw-text-large XcVN5d tw-ta" dir="ltr" data-placeholder="Translation"><span class="Y2IQFc" lang="ja">サーバーレスフレームワークはなんですか
</span></h2>
<p id="tw-target-text" class="tw-data-text tw-text-large XcVN5d tw-ta" dir="ltr" data-placeholder="Translation"><span class="Y2IQFc" lang="ja"><a href="https://www.serverless.com/">サーバーレスフレームワーク</a>は<span class="kanji-2-up kanji">かん</span><span class="kanji-2-up kanji">すう(Function-as-a-service)をかいはつとかデプロイすることができてオープンソースのCLIツールです。</span></span><span class="Y2IQFc" lang="ja"><span class="kanji-2-up kanji">それイーブンドリブンとかサーバーレスアーキテクチャをつくってかんすうとイベントとリソースでこうせいされています。</span></span></p>
<p class="tw-data-text tw-text-large XcVN5d tw-ta" dir="ltr" data-placeholder="Translation"><span class="Y2IQFc" lang="ja"><span class="kanji-2-up kanji"><a href="https://www.serverless.com/framework/docs/providers/aws/guide/intro/">かんすう</a>にひつようなコードとインフラをかんりしています。3つのたいせつコンポがあります：ー</span></span></p>

<ul>
 	<li dir="ltr" data-placeholder="Translation"><span class="Y2IQFc" lang="ja"><span class="Y2IQFc" lang="ja"><strong><span class="kanji-2-up kanji">かん</span></strong><span class="kanji-2-up kanji"><strong>すう</strong>　ー＞　これはコードです。</span></span></span>それはマイクロサービスのようなものです。たとえば：ユーザーをデータベースにsaveします。AWSのなかにlambdaです</li>
 	<li id="tw-target-text" class="tw-data-text tw-text-large XcVN5d tw-ta" dir="ltr" data-placeholder="Translation"><strong><span class="Y2IQFc" lang="ja">イベント　</span></strong><span class="Y2IQFc" lang="ja">ー＞　AWS Lambda Functionのトリガーです。たとえばAWS API GatewayのHTTPリクエストです</span></li>
 	<li dir="ltr" data-placeholder="Translation"><strong>リソース</strong>　ー＞　Functionsが使用するインフラストラクチャコンポーネントです。たとえばユーザーをデータベースにsaveするのためにAWSのDynamoDBです。</li>
</ul>
<h2 class="tw-data-text tw-text-large XcVN5d tw-ta" dir="ltr" data-placeholder="Translation"><span class="Y2IQFc" lang="ja">エクスプレス</span><span class="Y2IQFc" lang="ja">フレームワークはなんですか</span></h2>
<p class="tw-data-text tw-text-large XcVN5d tw-ta" dir="ltr" data-placeholder="Translation"><span class="Y2IQFc" lang="ja"><a href="https://expressjs.com/">エクスプレスは</a>とてもにんきのNodeのフレームワークです。Nodeの<span class="kanji-2-up kanji">コードをかんたんにかくことができます。</span></span></p>

<ul>
 	<li dir="ltr" data-placeholder="Translation">いろいろなURL(route)のためにいろいろなHTTPverbsのリクエストをかくことができます。</li>
 	<li dir="ltr" data-placeholder="Translation">いろいろなview renderingエンジン(たとえば<a href="https://handlebarsjs.com/">handlebars</a>)とかmiddlewareのintegrationがかんたんになります。</li>
 	<li dir="ltr" data-placeholder="Translation"><span class="Y2IQFc" lang="ja"><span class="Y2IQFc" lang="ja">renderingのためにテンプレートのばしょとenv variableを</span></span>セットすることができます。</li>
</ul>
<h3><span class="kanji-3-up kanji">じょう</span><span class="kanji-2-up kanji">けん</span></h3>
<ul>
 	<li><span class="Y2IQFc" lang="ja"><a href="https://nodejs.org/en/download/">Node</a>とnpmと<a href="https://www.serverless.com/framework/docs/providers/aws/guide/installation/">サーバーレスフレームワークCLI</a>をインストールするひつようがあって、AWS CLIを<a href="https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html">configure</a>をするひつようです</span></li>
 	<li>Expressフレームワークをしっています</li>
</ul>
<h2>APIについて</h2>
<ul>
 	<li><img class="aligncenter size-full wp-image-742037" src="https://cdn-ssl-devio-img.classmethod.jp/wp-content/uploads/2021/06/architecture.png" alt="" width="781" height="345" /></li>
 	<li>このREST APIのbackendはサーバーレスです。せいかくにはAWS Lambdaです</li>
 	<li><span class="furigana"><span class="kanji-1-up kanji">ぶ</span><span class="kanji-2-up kanji">たい</span><span class="kanji-2-up kanji">うらAPIはAWSGatewayによってpublishとつくらています。</span></span></li>
 	<li>このブログのなかにユーザーとそのIDをセーブのためにCRUD(Create,Read,Update,Delete)のオペレーションをすろのでからAPIはDynamoDBまでconnectedです。</li>
 	<li>しんぱいしなしでください、lambdaとAPI GatewayとdynamoDbはサーバーレスフレームワークによってデプロイされます。</li>
 	<li>APIのコードはこの<a href="https://github.com/jatinmehrotra/Serverless_Express_API">git</a>にあります</li>
</ul>
<h3 id="tw-target-text" class="tw-data-text tw-text-large XcVN5d tw-ta" dir="ltr" data-placeholder="Translation"><span class="Y2IQFc" lang="ja">Express APIのさくせい</span></h3>
<ul>
 	<li>プロジェクのためにdirectoryをつくって、express generatorをしようしてapplicationのskeletonをつくります。</li>
</ul>

[sourcecode language="text"] 
mkdir serverless_blog;cd serverless_blog
npx express-generator --view=hbs
npm install ; npm i serverless-http aws-sdk
[/sourcecode]

<ul>
 	<li>app.jsのなかにこのコードをついかしてください</li>
</ul>

[sourcecode language="text"]
const serverless = require('serverless-http');
app.use('/', indexRouter);
app.use('/users',usersRouter);

//module.exports = app;
module.exports.handler = serverless(app);
[/sourcecode]

<ul>
 	<li>routedirectoryのなかにusers.jsファイルをeditして、editをしたあとでこのようになります。</li><!--more-->

<!--more-->


 	<li>

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

</li>
 	<li>プロジェクのrootで<code>serverless.yml</code>をつくります。</li>
 	<li>serverless.ymlのなかにこのコードをついかしてください</li>
</ul>

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

<ul>
 	<li>serverless.ymlファイルのなかにlambdaでdynamodbのアクセスするのためにIAM roleのアクセスきょかをついかして、リソースブロックのなかにNOTESというなまえのdynamoDBテーブルをつくっています、そしてイベントブロックでlambdaかんすうのトリガーするためにpathをついかしています</li>
</ul>
<strong>NOTE:-dynamo dbテーブルのattributeなまえに<a href="https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/ReservedWords.html">reserved</a>なまえをつかわないでください、または<a href="https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.ExpressionAttributeNames.html"><em>expression attribute name</em></a> を つかってください</strong>
<h2 id="tw-target-text" class="tw-data-text tw-text-large XcVN5d tw-ta" dir="ltr" data-placeholder="Translation"><span class="Y2IQFc" lang="ja">Express APIのデプロイとテスト</span></h2>
<ul>
 	<li>In order to deploy run this command</li>
 	<li>Lambda<span class="Y2IQFc" lang="ja"><span class="Y2IQFc" lang="ja"><span class="kanji-2-up kanji">かん</span><span class="kanji-2-up kanji">すうのデプロイのためにこの</span></span></span>コマンドを<span class="kanji-2-up kanji">じっ</span><span class="kanji-2-up kanji">こうしてください</span>

[sourcecode language="text"] sls deploy --aws-profile personal[/sourcecode]

</li>
 	<li><strong>NOTE:-コマンドを<span class="kanji-2-up kanji">じっ</span><span class="kanji-2-up kanji">こうしたあとで「profile is not configured error」というエラーメッセージをみせたらこの<a href="https://stackoverflow.com/q/66560150/13126651">stackoverflowのpost</a>をcheckをしてくだいさい</span></strong></li>
 	<li>コマンドの<span class="kanji-2-up kanji">じっ</span><span class="kanji-2-up kanji"><span class="kanji-2-up kanji">こうにせいこうしたあとで</span></span>サーバーレスからAPIのEndpointをもらいます。</li>
 	<li>APIのテストのためにCURLコマンドをつかってください,postmanをつかうこともできます</li>
 	<li><strong>POSTのために</strong></li>
</ul>

[sourcecode language="text"] curl -H "Content-Type: application/json" -X POST https://3469t9kwr1.execute-api.ap-southeast-1.amazonaws.com/dev/user/create -d '{"id":"1","firstName": "testuser"}'[/sourcecode]

<ul>
 	<li><strong>GETのために</strong></li>
</ul>

[sourcecode language="text"] curl -H "Content-Type: application/json" -X GET  https://3469t9kwr1.execute-api.ap-southeast-1.amazonaws.com/dev/user/read/1[/sourcecode]

<ul>
 	<li><strong>PUTのために</strong></li>
</ul>

[sourcecode language="text"] curl -H "Content-Type: application/json" -X PUT https://3469t9kwr1.execute-api.ap-southeast-1.amazonaws.com/dev/user/update/1 -d '{"id":"1","firstName": "test123"}'[/sourcecode]

<ul>
 	<li><strong>DELETEのために</strong></li>
</ul>

[sourcecode language="text"]curl -H "Content-Type: application/json" -X DELETE  https://3469t9kwr1.execute-api.ap-southeast-1.amazonaws.com/dev/user/delete/1  [/sourcecode]

<ul>
 	<li><span style="font-size: 13.28px; color: #222222;">コストを さけるためにつくったinfrastructureをこわれるひつようがあります</span>

[sourcecode language="text"] sls remove--aws-profile personal[/sourcecode]

</li>
</ul>
<h2><span class="kanji-2-up kanji">さい</span><span class="kanji-1-up kanji">ご</span></h2>
このブログでのなかにみた、サーバーレス<span class="Y2IQFc" lang="ja">フレームワークをしようしてRESTAPIをデプロイするのがとてもかんたんになります.サーバーレスフレームワークは<span class="kanji-2-up kanji">ぼう</span><span class="kanji-2-up kanji">だいととても</span></span><span class="Y2IQFc" lang="ja">フレキシブル。いろいろな</span><span class="Y2IQFc" lang="ja">クラウドプロバイダーと<span class="kanji-2-up kanji">とよくう</span><span class="kanji-2-up kanji">ごうします.サーバーレスフレームワークのほかのたとえばのためにこの<a href="https://www.serverless.com/examples/">リンク</a>をみてください</span></span>

それまでは、ハッピー・ラーニング
