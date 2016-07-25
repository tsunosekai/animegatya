var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');
var JSON5 = require('json5');

var conf = JSON5.parse(fs.readFileSync('./config/conf.json'));

require('../model/anime.js');
var Anime = mongoose.model('Anime');

module.exports = ()=>{
  return new Promise((resolve, reject)=>{

    // ファイルの行数を取得
    console.log(conf.dataFilePath + '/' + conf.fileName);
    var lines = fs.readFileSync(conf.dataFilePath + '/' + conf.fileName, 'utf8').split(/\r\n/);
    var lineNum = lines.length;
    console.log('file行数 : '+lineNum);

    var showResult = (()=>{
      var inc = 0;
      return (str)=>{
        console.log(++inc+' '+str);
      }
    })();

    var save = (obj)=>{
      return new Promise((resolve, reject)=>{
        obj.save((err)=>{
          if (err) {
            showResult(err);
            reject(err);
          }
          showResult('〇');
          resolve();
        });
      })
    }

    var saves = [];

    for(var i=0; i<lines.length; i++){

      lines[i] = lines[i].slice(0, -1).replace(/(",("){0,1})|(("){0,1},")/g, conf.spliter);
      var items = lines[i].split(conf.spliter);

      if(items[1]=='テレビアニメーション'&&items[8]==''){

        var anime = new Anime({
          id: parseInt(items[0]),
          genre: items[1],
          name: items[3],
          nameKana: items[4],
          namePlus: items[5],
          namePlusKana: items[6],
          length: parseInt(items[7])||-1,
          restricted: items[8],
          startDay: items[9],
        });

        saves.push(save(anime));

      }else{
        showResult('×');
      }

    }

    Promise.all(saves).then(_=>{
      resolve();
    }, _=>{
      reject();
    });

  });
}


