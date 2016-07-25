var cheerio = require('cheerio-httpcli');

module.exports = (word)=>{
  return new Promise((resolve, reject)=>{
    
    console.log(word);

    var query = {
      q: word,
      tbm: 'isch',
      num: 1
    };

    cheerio.fetch('http://www.google.com/search', query, (err, $, res)=>{

      var urls = [];
      $('.rg_meta').each((i, e)=>{
        urls.push(JSON.parse($(e).html()).ou);
      });

      resolve(urls);
    });

  });
}
