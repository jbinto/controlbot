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
    dryRun: true,
    updateURL: "http://192.168.1.54:8071/motion-control/update",
    statusURL: "http://192.168.1.54:8071/motion-control"
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

  var stop = function() {
    /* hack: this sends 3 AJAX requests */
    update("forward", 0);
    update("strafe", 0);
    update("turn", 0);
  };

  var getStats = function(callback) {
    console.log("getStats called!");
    $.get(options.statusURL, null, callback, "jsonp");
  }

  return {
    forward: forward,
    reverse: reverse,
    left: left,
    right: right,
    stop: stop,
    getStats: getStats
  };

}();

$(function() {

  /* initialize DOM selectors */
  $_btnForward = $('.btn.forward');
  $_btnReverse = $('.btn.reverse');
  $_btnLeft = $('.btn.left');
  $_btnRight = $('.btn.right');
  $_btnStop = $('.btn.stop');

  $_statsForward = $('.stats.forward');
  $_statsStrafe = $('.stats.strafe');
  $_statsTurn = $('.stats.turn');

  /* bind to DOM events */

  /* XXX: How can I trigger these by click and keyboard in a clean way? */
  $_btnForward.click(function() {
    controlbot.forward();    
    toggleButton($(this));
  });

  $_btnReverse.click(function() {
    controlbot.reverse();
    toggleButton($(this));
  });

  $_btnLeft.click(function() {
    controlbot.left();
    toggleButton($(this));
  });

  $_btnRight.click(function() {
    controlbot.right();
    toggleButton($(this));
  });

  $_btnStop.click(function() {
    controlbot.stop();
    toggleButton($(this));
  });

  var updateStatsDisplay = function(stats) {
    console.log("updateStatsDisplay called!" + stats.forward + stats.turn + stats.strafe);
    $_statsForward.text(stats.forward);
    $_statsTurn.text(stats.turn);
    $_statsStrafe.text(stats.strafe);
  }

  var toggleButton = function($button) {
    $('.btn').css('border', '0');
    $($button).css('border', '5px solid #aa0000');
  }

  /* set up status update */

  /* This is hacky: how can I do this without polling? */
  setInterval(function() {
    console.log("setInterval called!");
    controlbot.getStats(updateStatsDisplay);
  }, 500);

});


 