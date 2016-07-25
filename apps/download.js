var fs = require('fs');
var request = require('request');
var mkdirp = require("mkdirp");

// ファイルをダウンロードする
module.exports = (fileUrl, savePath)=>{
  return new Promise(function (resolve, reject) {

    console.log('----- download.js -----');
    console.log('fileUrl: '+fileUrl);

    mkdirp(savePath, (err)=>{

      if(err){
        console.log(err);
      }

      var words = fileUrl.split('/');
      var fileName = words[words.length-1];

      var write = fs.createWriteStream(savePath+'/'+fileName);

      request
        .get(fileUrl)
        .on('response', (res)=>{
          console.log('statusCode: ', res.statusCode);
        })
        .pipe(write);

      write.on('close', ()=>{
        console.log('正常終了 保存先: '+savePath+'/'+fileName);
        console.log('---------------');
        resolve(fileName);
      });

    });

  });
}
