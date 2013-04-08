# ControlBot

This is a JQuery interface to control the [mc_hammer_bot](https://github.com/bitmakerlabs/mc_hammer_bot) robot. It was an assignment at [@bitmakerlabs](https://twitter.com/bitmakerlabs) to learn AJAX in an fun and awesome way. 

## Completed features

* User interface
* Send AJAX commands to robot
* Allow multiple axes (e.g. strafe, turn, forward) to be sent at once
* Add turn buttons to the UI
* Add keybindings

## To do list in priority order

* Add a throttle to control the speed (never completed)

## Lessons learned

**Coding yourself into a corner.**

I tried to make a safe (read: "rigid") JavaScript API for sending commands to the robot. I made simple functions like `reverse()`, `turnLeft()`, etc. But as new requirements were introduced (e.g. control multiple axes at once, non 100% speed), my API fell apart. You eventually end up wishing you could drop one level lower and just write directly.

Lesson learned: don't over-engineer things in a proof of concept. Good APIs grow organically, they're not designed up front.
