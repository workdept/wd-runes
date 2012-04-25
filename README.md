# wd-runes

#### Author: [Benjamin Chodoroff](http://theworkdept.com)
#### License: MIT

## Description

A fun little thing for blog.theworkdept.com - serve up a randomized array of
images via socket.io and listen for flicker or change events targeted at
certain array indicies.

## Example frontend code

``` js
socket.on('initial runestate', function(data) {
  drawstuffwith(data);
});

socket.on('runechange', function(data) {
  $(/* find something using data.index */).attr('src', data.newrune);
});

$(/* a rune */).click(function() {
  var index = $(/* get the clicked rune's index */);
  socket.emit('runechange', index, function(newrune) {
    // newrune is returned by socket.io emit callback!
  });
});
```
