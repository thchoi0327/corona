const { JSDOM } = require("jsdom");
const { window } = new JSDOM("");
const $ = require( "jquery" )( window );
const cron = require('node-cron');
const mysql = require('mysql');
const dbConfig = require('./dbConfig');
let conn = mysql.createConnection(dbConfig);
conn.connect();


module.exports = cron.schedule('0 5 11 * * *', function(){
  $.ajax({
    url:"http://openapi.seoul.go.kr:8088/5a56637a496d6f6739306341726f56/json/TbCorona19CountStatus/1/1/",
    type:"get",
    dataType :'json',
    success : function(result) { 
      let todayData = result.TbCorona19CountStatus.row[0];
      let S_HJ = Number(todayData.S_HJ); // 서울 총 확진자 수
      let SN_HJ = Number(todayData.SN_HJ); // 서울 추가 확진자 수
      let S_CARE = Number(todayData.S_CARE) // 서울시 치료 중
      let S_DEATH = Number(todayData.S_DEATH); // 서울 사망자 수
      
      let T_HJ = Number(todayData.T_HJ); // 전국 총 확진자 수
      let TN_HJ = Number(todayData.N_HJ); // 전국 추가 확진자 수 
      let T_CARE = Number(todayData.TY_CARE)
      let T_DEATE = Number(todayData.DEATH); // 전국 사망자 수
      let Today = todayData.S_DT;
      let sql = `CALL th_coronaInsert(${S_HJ},${SN_HJ},${S_CARE},${S_DEATH},${T_HJ},${TN_HJ},${T_CARE},${T_DEATE},\'${Today}\');`;

      conn.query(sql, function(err, results){
        if (err)
          console.log(err);
        if (results)
          console.log(results);
      });

    },
    error : function() { // 결과 에러 콜백함수
      console.log('error')
    }
  });
});