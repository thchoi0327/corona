const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
const dbConfig = require('./dbConfig');
const conn = mysql.createConnection(dbConfig.MYSQL);
conn.connect();


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