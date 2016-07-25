var cheerio = require('cheerio-httpcli');

module.exports = ()=>{
  return new Promise((resolve, reject)=>{

    var uriage = [];

    var scrapUrls = ()=>{
      return new Promise((resolve, reject)=>{
        cheerio.fetch('http://www38.atwiki.jp/uri-archive/pages/57.html', {}, (err, $, res) => {
          var urls = [];
          $("a[title*='期']").each((i, e) => {
            urls.push($(e).attr('href').split('\n')[0]);
          });
          resolve(urls);
        });
      });
    }

    var scraplines = (url)=>{
      return new Promise((resolve, reject)=>{

        cheerio.fetch(url, {}, (err, $, res) => {

          if(err){ reject(err); }

          var lines = $('blockquote').html().split('<br>');
          var lines = lines.slice(2, lines.length-2);

          lines.forEach((line, index)=>{

            lines[index] = line.split('　');
            // アニメタイトルに全角スペースを持つものをもう一度くっつける
            if(lines[index].length > 2){
              for(var i = lines[index].length; i>=3; i--){
                lines[index][1] += '　'+lines[index][i-1];
              }
            }

            lines[index][0] = lines[index][0].split(' ')[0];

            // 数値に直す
            lines[index][0] = parseInt(lines[index][0].replace(',', '').split('*').join(''));

            if(!lines[index][0]){
              delete lines[index];
            }

            if(lines[index] != undefined){
              uriage.push(lines[index]);
            }

          });

          uriage.sort((a, b)=>{
            if( a[0] > b[0] ) return -1;
            if( a[0] < b[0] ) return 1;
            return 0;
          });

          resolve();

        });

      });
    }

    scrapUrls().then((urls)=>{
      return Promise.all(urls.map( url => scraplines(url) ));
    }).then(_=>{
      resolve(uriage);
    });

  });
}
