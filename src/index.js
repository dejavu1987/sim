const express = require('express');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
const session = require('express-session')({
  secret: "my-secret",
  resave: true,
  saveUninitialized: true,
  cookie: {}
});

// Games Class
const {Sim} = require('./sim');
const sim = new Sim();

const sharedsession = require("express-socket.io-session");

// Middlewares
app.use(session);
io.use(sharedsession(session));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use('/static', express.static(path.join(__dirname, 'public')));

// Homepage
app.get('/', function(req, res){
  console.log({pug: req.session});
  res.render('index', { user: req.session.userdata })
});

// Socket io connection and events
io.on('connection', function(socket){
  socket.emit('connected', {user: socket.handshake.session.userdata, sim: sim});

  socket.on("login", function(userdata) {
    socket.handshake.session.userdata = userdata;
    socket.handshake.session.save();
    io.emit('chat message', socket.handshake.session.userdata.player + " logged in!")
  });

  socket.on('chat message', function(msg){
    console.log(socket.id);
    console.log(socket.handshake.session);
    console.log('message: ' + msg);
    io.emit('chat message', socket.handshake.session.userdata.player+": "+msg);
  });

  socket.on('restart', function(){
    sim.restart();
    io.emit('restarted', socket.handshake.session.userdata.player);
  });

  socket.on('logout', function(){
    // sim.restart();
  });

  socket.on('moved', function(move){
    move = parseInt(move);
    if(sim.turn === socket.handshake.session.userdata.player){

      sim.move(move);
      console.log(socket.id);
      console.log(socket.handshake.session);
      console.log('move: ' + move);
      io.emit('moved', {player: socket.handshake.session.userdata.player, move: move});
      if(sim.turn === 'gameOver'){
       io.emit('gameOver', sim.winner);
      }

    }else{
      io.emit('chat message', socket.handshake.session.userdata.player+": Its not my turn!");
    }

  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

// Start the server and listen to the port
http.listen(3000, function(){
  console.log('listening on *:3000');
});
