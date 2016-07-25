var gatya = require('../apps/gatya.js');
var search = require('../apps/search.js');


module.exports = (io) => {
  io.sockets.on('connection', function (socket) {
    
    var processing = false;
    
    socket.on('draw', () => {
      
      var result = {};
      
      console.log('processing : '+processing);
      
      if(!processing){
        processing = true;
        gatya({}).then(anime => {
          socket.emit('anime', anime);
          return search(anime.name+' アニメ');
        }).then(urls => {
          processing = false;
          socket.emit('animeImgUrl', urls[0]);
          socket.emit('turnEnd');
        });
      }

    });
  });
}