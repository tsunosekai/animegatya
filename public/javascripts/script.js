$(function(){
  var socket = io.connect();
  
  $('#draw').on('click tap', function(){
    $("#draw").prop("disabled", true);
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