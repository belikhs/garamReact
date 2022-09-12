// mysql연동하기, 데이터 불러오기
const path = require('path');
const express = require("express"); 
const app = express();
const port = 3001; // react의 기본값은 3000이니까 3000이 아닌 아무 수
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql"); // mysql 모듈 사용

var connection = mysql.createConnection({
    host : "127.0.0.1",
    user : "root", //mysql의 id
    password : "0000", //mysql의 password
    database : "garam_product", //사용할 데이터베이스
});

connection.connect();

// const나 app.use는 cors와 body-parser를 사용하기 위해 추가해주는 공식같은 거다.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// // app.통신방법("/통신할 주소", (req, res).... 
// // 이런식으로 쓴다. 통신 방법에는 post get 등이 있다.
// // req는 앞에서 보낸 객체를 받아 body가 앞에서 보낸 데이터다.
// // res는 express에서 데이터를 보낼때에 사용한다.
// app.get('/', (req, res) =>{
//  // res.send(보낼거 넣는 자리)
//     res.send('test!')
// })

// app.post("/idplz", (req,res)=>{
//     const serverid = req.body.plzid;
//     console.log(serverid);
//     const sendText = {
//         text : "이게 맞나",
//     };
//     // res.send(보낼거 넣는 자리)
//     res.send(sendText);
// });

app.post("/", (req,res)=>{
    connection.query("SELECT * FROM garam_product.garam_product_information ORDER BY garam_product_information.product_category ASC",
    function(err,rows,fields){
        if(err){
            console.log("물품목록 불러오기 실패");
        }else{
            console.log("물품목록 불러오기 성공");
            res.send(rows);
        }
    })
})


app.get("/", (req,res)=>{
    connection.query("SELECT * FROM garam_product.garam_favorites",
    function(err,rows,fields){
        if(err){
            console.log("즐겨찾기 불러오기 실패");
        }else{
            console.log("즐겨찾기 불러오기 성공");
            // res.send(req.body);
            res.send(rows);
        }
    })
})

app.put("/", (req,res)=>{
  console.log(req.body.body)
  console.log(req.body.email)
    connection.query('UPDATE * FROM garam_product.garam_favorites SET product_category='+req.body.body+' WHRER user_email='+req.body.email,
    function(err,rows,fields){
        if(err){
            console.log("즐겨찾기 업데이트 실패");
            console.log(err)
        }else{
            console.log("즐겨찾기 업데이트 성공");
            // res.send(req.body);
            res.send(rows);
        }
    })
})
// app.post("/", (req,res)=>{
//     connection.query("SELECT * FROM garam_product.garam_favorites",
//     function(err,rows,fields){
//         let favorites = rows;
//         if(err){
//             console.log("즐겨찾기 불러오기 실패");
//         }else{
//             console.log("즐겨찾기 불러오기 성공");
//             res.send(req.body);
//             // res.send(favorites);
//         }
//     })
// })

app.listen(port, ()=>{
    console.log(`Connect at http://localhost:${port}`);
})