var fs = require('fs');
var NodeZip = require('node-zip');
var mkdirp = require("mkdirp");

// zipファイルから指定ファイルのみを展開
module.exports = (zipfilename, targetfilename, savepath)=>{
  return new Promise((resolve, reject)=>{

    console.log('----- tenkai.js -----');
    console.log(zipfilename + 'を展開し，'
                + targetfilename + 'を抜き出して'
                + savepath + 'に保存します．')

    // ZIPファイルを読む
    fs.readFile(savepath +'/'+ zipfilename, 'binary', (err,data)=>{

      if (err) throw err;
      // ZIPファイルの読込む
      var zip_opt = { base64:false, checkCRC32: true };
      var zip = new NodeZip(data, zip_opt);

      mkdirp(savepath, (err)=>{

        if(err){
          reject(err);
        }

        // ZIPファイルの各エントリを処理する
        for (var i in zip.files) {
          var f = zip.files[i];
          // 解凍
          if (f._data == null || f.name != targetfilename) continue;
          if (f._data.length > 0) {
            var savename = savepath +'/'+targetfilename;
            fs.writeFileSync(savename, f.asBinary(), 'binary');
            console.log('正常終了');
            console.log('--------------');
            resolve();
          }
        }

      });
    });

  });
}
