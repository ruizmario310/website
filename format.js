window.onload = function() {

  var c = document.getElementById('c'),
    $ = c.getContext('2d'),
    w = c.width = window.innerWidth,
    h = c.height = window.innerHeight,
    shortestSide = w > h ? h : w;

  $.font = "30px Arial";
  $.lineWidth = 0.3;

  //this easing functions come from here (I slightly modified the code tho) --> https://github.com/danro/jquery-easing/blob/master/jquery.easing.js
  var easingFunctions = {

    easeInQuad: function(t, b, c, d) {
      return c * (t /= d) * t + b;
    },
    easeOutQuad: function(t, b, c, d) {
      return -c * (t /= d) * (t - 2) + b;
    },
    easeInOutQuad: function(t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t + b;
      return -c / 2 * ((--t) * (t - 2) - 1) + b;
    },
    easeInCubic: function(t, b, c, d) {
      return c * (t /= d) * t * t + b;
    },
    easeOutCubic: function(t, b, c, d) {
      return c * ((t = t / d - 1) * t * t + 1) + b;
    },
    easeInOutCubic: function(t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
      return c / 2 * ((t -= 2) * t * t + 2) + b;
    },
    easeInQuart: function(t, b, c, d) {
      return c * (t /= d) * t * t * t + b;
    },
    easeOutQuart: function(t, b, c, d) {
      return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },
    easeInOutQuart: function(t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
      return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    },
    easeInQuint: function(t, b, c, d) {
      return c * (t /= d) * t * t * t * t + b;
    },
    easeOutQuint: function(t, b, c, d) {
      return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    easeInOutQuint: function(t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
      return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    },
    easeInSine: function(t, b, c, d) {
      return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    },
    easeOutSine: function(t, b, c, d) {
      return c * Math.sin(t / d * (Math.PI / 2)) + b;
    },
    easeInOutSine: function(t, b, c, d) {
      return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    },
    easeInExpo: function(t, b, c, d) {
      return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    },
    easeOutExpo: function(t, b, c, d) {
      return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    },
    easeInOutExpo: function(t, b, c, d) {
      if (t == 0) return b;
      if (t == d) return b + c;
      if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
      return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    easeInCirc: function(t, b, c, d) {
      return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    },
    easeOutCirc: function(t, b, c, d) {
      return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    },
    easeInOutCirc: function(t, b, c, d) {
      if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
      return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    },
    easeInElastic: function(t, b, c, d) {
      var s = 1.70158;
      var p = 0;
      var a = c;
      if (t == 0) return b;
      if ((t /= d) == 1) return b + c;
      if (!p) p = d * .3;
      if (a < Math.abs(c)) {
        a = c;
        var s = p / 4;
      } else var s = p / (2 * Math.PI) * Math.asin(c / a);
      return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },
    easeOutElastic: function(t, b, c, d) {
      var s = 1.70158;
      var p = 0;
      var a = c;
      if (t == 0) return b;
      if ((t /= d) == 1) return b + c;
      if (!p) p = d * .3;
      if (a < Math.abs(c)) {
        a = c;
        var s = p / 4;
      } else var s = p / (2 * Math.PI) * Math.asin(c / a);
      return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    },
    easeInOutElastic: function(t, b, c, d) {
      var s = 1.70158;
      var p = 0;
      var a = c;
      if (t == 0) return b;
      if ((t /= d / 2) == 2) return b + c;
      if (!p) p = d * (.3 * 1.5);
      if (a < Math.abs(c)) {
        a = c;
        var s = p / 4;
      } else var s = p / (2 * Math.PI) * Math.asin(c / a);
      if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
      return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
    },
    easeInBack: function(t, b, c, d, s) {
      if (s == undefined) s = 1.70158;
      return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    easeOutBack: function(t, b, c, d, s) {
      if (s == undefined) s = 1.70158;
      return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    easeInOutBack: function(t, b, c, d, s) {
      if (s == undefined) s = 1.70158;
      if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
      return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    },
    easeOutBounce: function(t, b, c, d) {
      if ((t /= d) < (1 / 2.75)) {
        return c * (7.5625 * t * t) + b;
      } else if (t < (2 / 2.75)) {
        return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
      } else if (t < (2.5 / 2.75)) {
        return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
      } else {
        return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
      }
    }

  };

  //"tabellina" means "times table" in italian
  function Tabellina(x, y, radius, hue, number, numberOfPoints) {
    this.x = x;
    this.y = y;
    this.number = number;
    this.radius = radius;
    this.numberOfPoints = numberOfPoints;
    this.hue = hue;
    this.angleStep = (Math.PI * 2) / numberOfPoints;
    this.last = number;
    this.next = undefined;
    this.animationStartTime = -1;
    this.cooldownStartTime = -1;
    this.idle = true;
  }

  Tabellina.prototype.animateTo = function(target, easingFunction, animationTime) {

    if (this.number !== target) {

      if (this.animationStartTime < 0) {
        this.animationStartTime = +new Date;
      }

      var timeSinceAnimationStart = +new Date - this.animationStartTime > animationTime ? animationTime : +new Date - this.animationStartTime;

      this.number = easingFunction(timeSinceAnimationStart, this.last, target - this.last, animationTime);

      if (this.number === target) {
        this.idle = true;
        this.animationStartTime = -1;
      }

    }

  };

  Tabellina.prototype.animateToMulti = function(targets, easingFunction, animationTime, pauseTime) {

    if (this.next === undefined) {
      this.next = targets.filter(function(current) {
        if (current !== this.last) {
          return current;
        }
      }.bind(this))[~~(Math.random() * targets.length)];
    }

    if (this.idle && this.cooldownStartTime < 0) {
      this.idle = false;
    }

    if (this.idle && +new Date - this.cooldownStartTime > pauseTime) {
      console.log('resuming animation');
      this.cooldownStartTime = -1;
      this.idle = false;
      this.last = this.next;
      this.next = targets.filter(function(current) {
        if (current !== this.last) {
          return current;
        }
      }.bind(this))[~~(Math.random() * targets.length)];
    }

    if (!this.idle) {
      this.animateTo(this.next, easingFunction, animationTime);
    }

    if (this.idle && this.cooldownStartTime < 0) {
      this.cooldownStartTime = +new Date;
      console.log('reached target, starting cooldown period');
    }

  };

  Tabellina.prototype.showcase = function(targets, easingFunction, animationTime, pauseTime, ctx) {
    this.animateToMulti(targets, easingFunction, animationTime, pauseTime);
    this.hue += 0.5;
    this.draw(ctx);
  };

  Tabellina.prototype.singleAnimation = function(target, easingFunction, animationTime, ctx) {
    this.animateTo(target, easingFunction, animationTime);
    this.draw(ctx);
  };

  Tabellina.prototype.draw = function(ctx) {
    var pointX, pointY;
    ctx.beginPath();
    for (var i = 0; i < this.numberOfPoints; i++) {
      targetAngle = this.angleStep * i * this.number;
      pointX = this.x + (Math.cos(this.angleStep * i) * this.radius);
      pointY = this.y + (Math.sin(this.angleStep * i) * this.radius);
      targetX = this.x + (Math.cos(targetAngle) * this.radius);
      targetY = this.y + (Math.sin(targetAngle) * this.radius);
      ctx.strokeStyle = 'hsl(' + this.hue + ',100%, 50%)';
      ctx.moveTo(pointX, pointY);
      ctx.lineTo(targetX, targetY);
    }
    ctx.stroke();
  };

  var coolNumbers = [0, 2, 4, 26, 66, 68, 81, 86, 99, 100, 101],
    radius = (shortestSide / 2) - shortestSide / 10,
    hue = Math.random() * 360,
    randomIndex = ~~(Math.random() * coolNumbers.length),
    tabellina = new Tabellina(w / 2, h / 2, radius, hue, coolNumbers[randomIndex], 200);

  function loop() {

    $.clearRect(0, 0, w, h);

    $.fillStyle = 'black';
    $.fillRect(0, 0, w, h);

    tabellina.showcase(coolNumbers, easingFunctions.easeInOutCubic, 6000, 3000, $);

    $.fillStyle = 'white';
    $.fillText("n = " + tabellina.number.toFixed(2), 50, 70);

    requestAnimationFrame(loop);

  }

  loop();

  window.addEventListener('resize', function() {
    w = c.width = window.innerWidth,
      h = c.height = window.innerHeight;
    tabellina.y = h / 2;
    tabellina.x = w / 2;
    shortestSide = w > h ? h : w;
    tabellina.radius = (shortestSide / 2) - shortestSide / 10;
    $.font = "30px Arial";
    $.lineWidth = 0.3;
  });

};
