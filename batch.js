const { JSDOM } = require("jsdom");
const { window } = new JSDOM("");
const $ = require( "jquery" )( window );
const cron = require('node-cron');


module.exports = cron.schedule('*/1 * * * * *', function(){
  console.log('HI')
});