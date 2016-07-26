$(function(){
  var socket = io.connect();

  $('#gatyaru')
    .on('mousedown', ()=>$('#gatyaru').attr('src', 'images/gatyaru1-2.png'))
    .on('mouseout', ()=>$('#gatyaru').attr('src', 'images/gatyaru1-1.png'))
    .on('mouseup', ()=>{
      $('#before').hide();
      $('#after').show();
      socket.emit('draw');
      $('#animeimg').attr('src', '/images/loading.gif');
    });

  $('#regatyaru')
    .on('mousedown', ()=>$('#regatyaru').attr('src', 'images/gatyaru2-2.png'))
    .on('mouseout', ()=>$('#regatyaru').attr('src', 'images/gatyaru2-1.png'))
    .on('mouseup', ()=>{
      socket.emit('draw');
      $('#animeimg').attr('src', '/images/loading.gif');
    });

  socket.on('anime', function(anime){
    $('#animetitle').text(anime.name);
    $('#startDay').text(anime.startDay);
    $('#animeimg').attr('alt', anime.name);
  });

  socket.on('animeImgUrl', function(url){
    $('#animeimg').attr('src', url);
  });

  socket.on('turnEnd', function(){
    $('#draw').prop("disabled", false);
  });

});
