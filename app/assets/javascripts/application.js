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
    updateURL: "http://bronzebox:8071/motion-control/update",
    statusURL: "http://bronzebox:8071/motion-control"
  };

  var currentState = {
    forward: 0,
    strafe: 0,
    turn: 0
  };

  var sendUpdate = function() {
    $.ajax({
      url: options.updateURL,
      data: currentState,
      dataType: "jsonp"
    });
  }

  var forward = function(throttle) {
    currentState.forward = throttle;
    sendUpdate();
  }

  var turn = function(throttle) {
    currentState.turn = throttle;
    sendUpdate();
  }

  var strafe = function(throttle) {
    currentState.strafe = throttle;
    sendUpdate();
  }

  var stop = function() {
    currentState.forward = 0;
    currentState.strafe = 0;
    currentState.turn = 0;
    sendUpdate();
  }

  var getStats = function(callback) {
    console.log("getStats called!");
    $.get(options.statusURL, null, callback, "jsonp");
  }

  return {
    // forward: forward,
    // reverse: reverse,
    // left: left,
    // right: right,
    // stop: stop,
    forward: forward,
    strafe: strafe,
    turn: turn,
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
  $_btnTurnLeft = $('.btn.turnleft');
  $_btnTurnRight = $('.btn.turnright');

  $_statsForward = $('.stats.forward');
  $_statsStrafe = $('.stats.strafe');
  $_statsTurn = $('.stats.turn');

  /* UI helper functions */
  var updateStatsDisplay = function(stats) {
    $_statsForward.text(stats.forward);
    $_statsTurn.text(stats.turn);
    $_statsStrafe.text(stats.strafe);
  }

  var toggleButtonPair = function($active, $inactive) {    
    $active.toggleClass('active');
    $inactive.removeClass('active');
    $_btnStop.removeClass('active');
  }

  /* Logical event handlers */
  var forward = function() {
    controlbot.forward(1);    
    toggleButtonPair($_btnForward, $_btnReverse);
  };

  var reverse = function() {
    controlbot.forward(-1);
    toggleButtonPair($_btnReverse, $_btnForward); 
  };

  var left = function() {
    controlbot.strafe(1);
    toggleButtonPair($_btnLeft, $_btnRight); 
  };

  var right = function() {
    controlbot.strafe(-1);
    toggleButtonPair($_btnRight, $_btnLeft); 
  };

  var turnLeft = function() {
    controlbot.turn(1);
    toggleButtonPair($_btnTurnLeft, $_btnTurnRight); 
  };

  var turnRight = function() {
    controlbot.turn(-1);
    toggleButtonPair($_btnTurnRight, $_btnTurnLeft);
  };

  var stop = function() {
    controlbot.stop();
    $('.btn').removeClass('active');
    $_btnStop.toggleClass('active');
  };

  /* bind to DOM events */
  $_btnForward.click(function() { forward(); });
  $_btnReverse.click(function() { reverse(); });
  $_btnLeft.click(function() { left(); });
  $_btnRight.click(function() { right(); });
  $_btnTurnLeft.click(function() { turnLeft(); });
  $_btnTurnRight.click(function() { turnRight(); });
  $_btnStop.click(function() { stop(); });

  $('body').keydown(function(e) {
    switch (e.keyCode) {
      case 87: /* w */
        forward();
        break;
      case 83: /* s */
        reverse();
        break;
      case 68: /* d */
        right();
        break;
      case 65: /* a */
        left();
        break;
      case 32: /* SPACE */
        stop();
        break;

      case 81: /* q */
        turnLeft();
        break;
      case 69: /* e */
        turnRight();
        break;
    }

    // alert(e.keyCode);
  });


  /* set up status update */
  /* This is hacky: how can I do this without polling? */
  setInterval(function() {
    controlbot.getStats(updateStatsDisplay);
  }, 500);

  /* stop the robot at the beginning! */
  stop();

});


 