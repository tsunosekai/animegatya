var express = require('express');
var url = require('url');
var router = express.Router();
var gatya = require('../apps/gatya.js');
var search = require('../apps/search.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/api', function (req, res, next) {

  var url_parts = url.parse(req.url,true);

  var result = {};

  if(url_parts.query.imgsearch=='false'){
    gatya({}).then(anime => {
      res.send(anime);
    });
  }else{
    gatya({}).then(anime => {
      result.anime = anime;
      return search(anime.name + ' アニメ');
    }).then(urls => {
      result.urls = urls;
      res.send(result);
    });
  }

});

module.exports = router;
