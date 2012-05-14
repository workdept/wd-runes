// runeserver

var http = require('http'),
    io   = require('socket.io').listen(31337);

// make an initial large list of images to display
var imgs = ['smaller-bolt_hot.png', 'smaller-burst_hot.png', 'smaller-circles_hot.png', 'smaller-xchange_hot.png', 'smaller-bolt.png', 'smaller-burst.png', 'smaller-circles.png', 'smaller-xchange.png'];

var imgs_state = [];

for (var c = 48, l = imgs.length; c--;) {
  imgs_state[c] = imgs[Math.floor(Math.random() * l)];
}

io.sockets.on('connection', function(socket) {
  socket.emit('initial runestate', {runes: imgs_state});
  socket.on('runeflicker', function(index) {
    console.log('rune flickered');
    console.log('index: ' + index);
    socket.broadcast.volatile.emit('runeflicker', index);
  });
  socket.on('runechange', function(index, fn) {
    imgs_state[index] = imgs[Math.floor(Math.random() * imgs.length)];
    socket.broadcast.volatile.emit('runechange', {
      index: index,
      newrune: imgs_state[index]
    });
    fn(imgs_state[index]);
  });

});

// run a one-trick-pony to change a random rune
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  var index = Math.floor(Math.random() * 8);
  imgs_state[index] = imgs[Math.floor(Math.random() * imgs.length)];
  io.sockets.emit('runechange', {
    index: index,
    newrune: imgs_state[index]
  });

  res.end('Rune ' + index + ' changed');
}).listen(31336);

