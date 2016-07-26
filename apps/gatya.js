var mongoose = require('mongoose');
var cheerio = require('cheerio-httpcli');
var fs = require('fs');
var JSON5 = require('json5');

var conf = JSON5.parse(fs.readFileSync('./config/conf.json'));

require('../model/anime.js');
var Anime = mongoose.model('Anime');

var query = {};

module.exports = (query) => {

  return new Promise((resolve, reject)=>{

    if(Object.prototype.toString.call(query) !== "[object Object]"){
      reject('ERROR gatya.js : 引数はオブジェクトにしてください');
    }

    var anime = new Anime();

    Anime.find(query, (err, item)=>{
      if(err){
        console.log(err);
        reject(err);
        return;
      }

      resolve( item[Math.floor(Math.random()*item.length)] );

    });

  });

}
