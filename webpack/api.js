const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
const dbConfig = require('./dbConfig');
const conn = mysql.createConnection(dbConfig);
conn.connect();


app.use(cors());
app.listen('8081', function(){
  console.log('API SERVER START');
})


app.get('/api/chart', function(req, res){
  // DB 에서 코로나 확진자 정보 가져오기
  const sql = `SELECT * FROM th_corona ORDER BY C_PK DESC limit 1`;
  conn.query(sql, function(err, rows){
    if (err)
      console.log(err);
    if (rows)
      res.json(rows[0]);
  })
})





module.exports = app;