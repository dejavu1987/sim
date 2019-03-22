$(function () {
  const socket = io();

  const moves = new Array(13);
  console.log(moves);

  $('.moves path').click(function (e) {
    e.preventDefault(); // prevents page reloading
    socket.emit('moved', $(this).attr('rel'));
  });

  $('form').submit(function (e) {
    e.preventDefault(); // prevents page reloading
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });

  socket.on('connected', function (data) {
    console.log(data);
    const player = data.user? data.user.player : '';
    if(player){
      $('body').addClass(player);
      $('#player-select').html(`<h2>${player}</h2>`);
      $('#main').show();
    }
    if(data.sim.turn === 'gameOver'){
      handleGameOver(data.sim.winner);
    }
  });

  socket.on('chat message', function (msg) {
    $('#messages').prepend($('<li>').text(msg));
  });

  socket.on('gameOver', handleGameOver);

  socket.on('restarted', function (who) {
    $('#messages').prepend($('<li>').text(who + " restarted"));
    $('path').attr('class', "");
    $('#hexagon').attr('class', '');
    $('#popup').remove();
  });

  socket.on('moved', function (move) {
    console.log(move);
    $('path[rel=' + move.move + ']').attr('class', move.player + " used");
    $('#messages').prepend($('<li>').text(move.player + ": [debug] moved " + move.move));
  });

  window.login = function (player) {
    $('body').addClass(player);
    $('#player-select').html(`<h2>${player} <button onclick="logout()"><i class="fas fa-sign-out-alt"></i> Logout</button> </h2>`);
    $('#main').show();
    socket.emit('login', {player: player});
  };

  window.restart = function () {
    socket.emit('restart');
  }
  window.logout = function () {
    socket.emit('logout');
  }

  function handleGameOver(winner) {
    $('#messages').prepend($('<li>').text("Game Over: The winner is " + winner));
    $('#hexagon').attr('class', 'game-over ' + winner);
    const popup = jQuery('<div id="popup"> Game Over: The winner is ' + winner + '<button id="restart-btn" onclick="restart()"><i class="fas fa-redo"></i> Restart</button></div>');
    $('#main').append(popup);
  }
});
