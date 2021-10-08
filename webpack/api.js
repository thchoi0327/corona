const express = require('express');
const app = express();
const cors = require('cors');
// const mysql = require('mysql');
// const oracle = require('oracledb');
// oracle.getConnection({
//   user:'thchoi',
//   password:'1234',
//   host:'localhost',
//   database:'xe'
// }, function(err, conn){
//   if (err){
//     console.log('접속 실패 ', err);
//     return;
//   }
//   console.log('오라클 접속 성공 !!!');
//   console.log('오라클 접속 성공 !!!');
//   console.log('오라클 접속 성공 !!!');
// })
const mssql = require('mssql');
const dbConfig = {
  user:'thchoi',
  password:'1234',
  server:'localhost',
  database:'Tutorial',
  stream:true
}

mssql.connect(dbConfig, function(err){
  if (err){
    console.log('mssql 접속 실패'+err);
    return 
  }
  console.log('MSSQL 접속 성공 !!!!')
  console.log('MSSQL 접속 성공 !!!!')
  console.log('MSSQL 접속 성공 !!!!')
  console.log('MSSQL 접속 성공 !!!!')
});
// const dbConfig = require('./dbConfig');
// const conn = mysql.createConnection(dbConfig);
// conn.connect();



app.use(cors());
app.listen('8081', function(){
  console.log('API SERVER START');
})


app.get('/api/chart', function(req, res){

  // DB 에서 코로나 확진자 정보 가져오기
  const MYSQL_sql = `SELECT * FROM th_corona ORDER BY C_PK DESC limit 1`;
  const ORACLE_sql = `SELECT * FROM (SELECT * FROM th_corona ORDER BY C_PK DESC) WHERE ROWNUM <= 1`;
  const MSSQL_sql = `SELECT TOP 1 * FROM th_corona ORDER BY C_PK DESC`;

  conn.query(MYSQL_sql, function(err, rows){
    if (err)
      console.log(err);
    if (rows)
      res.json(rows[0]);
  })
})





module.exports = app;