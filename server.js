const express =  require('express');
const app = express();
const bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))
const MongoClient =  require('mongodb').MongoClient;
app.set('view engine', 'ejs');

MongoClient.connect('mongodb+srv://admin:1111@cluster0.tryklup.mongodb.net/?retryWrites=true&w=majority', function(에러, client){
//연결되면 할일
if(에러) return console.log(에러);
db = client.db('Todo-app');

app.listen(8080, function(){
    console.log('listening on 8080')
});
})


app.get('/pet', function(요청, 응답){
    응답.send('펫용품 쇼핑할 수 있는 페이지입니다.');
});

app.get('/beauty', function(요청, 응답){
    응답.send('뷰티용품 쇼핑할 수 있는 페이지입니다.');
})

app.get('/', function(요청, 응답){
    응답.sendFile(__dirname + '/index.html')
});

app.get('/write', function(요청, 응답) { 
    응답.sendFile(__dirname +'/write.html')
  });

app.post('/add', function(요청, 응답){
    응답.send('전송완료')
    console.log(요청.body.data);
    console.log(요청.body.title);
    db.collection('post').insertOne({제목:요청.body.title, 날짜:요청.body.date}, function(에러, 결과){
        console.log('저장완료');
    });
  });

app.get('/list', function (요청, 응답){
    
    db.collection('post').find().toArray(function(에러, 결과){
        console.log(결과);
        응답.render('list.ejs', { posts : 결과 });
    });
    

});