// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require_tree .


var controlbot = function() {
  var options = {
    updateURL: "http://bronzebox:8071/motion-control/update",
    statusURL: "http://bronzebox:8071/motion-control"
  };

  var update = function(direction, throttle) {
    var data = {};
    data[direction] = throttle;
    $.ajax({
      url: options.updateURL,
      data: data,
      dataType: "jsonp"
    });
  }

  var forward = function() {
    update("forward", 1);
  };

  var reverse = function() {
    update("forward", -1);
  };

  var right = function() {
    update("strafe", 1);
  };

  var left = function() {
    update("strafe", -1);
  };

  

  return {
    forward: forward,
    reverse: reverse,
    left: left,
    right: right,
    stop: stop
  };

}();

$(function() {
  //control = new ControlBot();

  $_btnForward = $('.btn.forward');
  $_btnReverse = $('.btn.reverse');
  $_btnLeft = $('.btn.left');
  $_btnRight = $('.btn.right');

  $_btnForward.click(function() {
    controlbot.forward();
  });

  $_btnReverse.click(function() {
    controlbot.reverse();
  });

  $_btnLeft.click(function() {
    controlbot.left();
  });

  $_btnRight.click(function() {
    controlbot.right();
  });
});

var callback = function(data) {
  alert("callback:" + data);
}