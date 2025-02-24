require = (function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = typeof require == "function" && require;
        if (!u && a) return a(o, !0);
        if (i) return i(o, !0);
        var f = new Error("Cannot find module '" + o + "'");
        throw ((f.code = "MODULE_NOT_FOUND"), f);
      }
      var l = (n[o] = { exports: {} });
      t[o][0].call(
        l.exports,
        function (e) {
          var n = t[o][1][e];
          return s(n ? n : e);
        },
        l,
        l.exports,
        e,
        t,
        n,
        r
      );
    }
    return n[o].exports;
  }
  var i = typeof require == "function" && require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
})(
  {
    1: [
      function (require, module, exports) {
        function EventEmitter() {
          this._events = this._events || {};
          this._maxListeners = this._maxListeners || undefined;
        }
        module.exports = EventEmitter;
        EventEmitter.EventEmitter = EventEmitter;
        EventEmitter.prototype._events = undefined;
        EventEmitter.prototype._maxListeners = undefined;
        EventEmitter.defaultMaxListeners = 10;
        EventEmitter.prototype.setMaxListeners = function (n) {
          if (!isNumber(n) || n < 0 || isNaN(n))
            throw TypeError("n must be a positive number");
          this._maxListeners = n;
          return this;
        };
        EventEmitter.prototype.emit = function (type) {
          var er, handler, len, args, i, listeners;
          if (!this._events) this._events = {};
          if (type === "error") {
            if (
              !this._events.error ||
              (isObject(this._events.error) && !this._events.error.length)
            ) {
              er = arguments[1];
              if (er instanceof Error) {
                throw er;
              }
              throw TypeError('Uncaught, unspecified "error" event.');
            }
          }
          handler = this._events[type];
          if (isUndefined(handler)) return false;
          if (isFunction(handler)) {
            switch (arguments.length) {
              case 1:
                handler.call(this);
                break;
              case 2:
                handler.call(this, arguments[1]);
                break;
              case 3:
                handler.call(this, arguments[1], arguments[2]);
                break;
              default:
                len = arguments.length;
                args = new Array(len - 1);
                for (i = 1; i < len; i++) args[i - 1] = arguments[i];
                handler.apply(this, args);
            }
          } else if (isObject(handler)) {
            len = arguments.length;
            args = new Array(len - 1);
            for (i = 1; i < len; i++) args[i - 1] = arguments[i];
            listeners = handler.slice();
            len = listeners.length;
            for (i = 0; i < len; i++) listeners[i].apply(this, args);
          }
          return true;
        };
        EventEmitter.prototype.addListener = function (type, listener) {
          var m;
          if (!isFunction(listener))
            throw TypeError("listener must be a function");
          if (!this._events) this._events = {};
          if (this._events.newListener)
            this.emit(
              "newListener",
              type,
              isFunction(listener.listener) ? listener.listener : listener
            );
          if (!this._events[type]) this._events[type] = listener;
          else if (isObject(this._events[type]))
            this._events[type].push(listener);
          else this._events[type] = [this._events[type], listener];
          if (isObject(this._events[type]) && !this._events[type].warned) {
            var m;
            if (!isUndefined(this._maxListeners)) {
              m = this._maxListeners;
            } else {
              m = EventEmitter.defaultMaxListeners;
            }
            if (m && m > 0 && this._events[type].length > m) {
              this._events[type].warned = true;
              console.error(
                "(node) warning: possible EventEmitter memory " +
                  "leak detected. %d listeners added. " +
                  "Use emitter.setMaxListeners() to increase limit.",
                this._events[type].length
              );
              if (typeof console.trace === "function") {
                console.trace();
              }
            }
          }
          return this;
        };
        EventEmitter.prototype.on = EventEmitter.prototype.addListener;
        EventEmitter.prototype.once = function (type, listener) {
          if (!isFunction(listener))
            throw TypeError("listener must be a function");
          var fired = false;
          function g() {
            this.removeListener(type, g);
            if (!fired) {
              fired = true;
              listener.apply(this, arguments);
            }
          }
          g.listener = listener;
          this.on(type, g);
          return this;
        };
        EventEmitter.prototype.removeListener = function (type, listener) {
          var list, position, length, i;
          if (!isFunction(listener))
            throw TypeError("listener must be a function");
          if (!this._events || !this._events[type]) return this;
          list = this._events[type];
          length = list.length;
          position = -1;
          if (
            list === listener ||
            (isFunction(list.listener) && list.listener === listener)
          ) {
            delete this._events[type];
            if (this._events.removeListener)
              this.emit("removeListener", type, listener);
          } else if (isObject(list)) {
            for (i = length; i-- > 0; ) {
              if (
                list[i] === listener ||
                (list[i].listener && list[i].listener === listener)
              ) {
                position = i;
                break;
              }
            }
            if (position < 0) return this;
            if (list.length === 1) {
              list.length = 0;
              delete this._events[type];
            } else {
              list.splice(position, 1);
            }
            if (this._events.removeListener)
              this.emit("removeListener", type, listener);
          }
          return this;
        };
        EventEmitter.prototype.removeAllListeners = function (type) {
          var key, listeners;
          if (!this._events) return this;
          if (!this._events.removeListener) {
            if (arguments.length === 0) this._events = {};
            else if (this._events[type]) delete this._events[type];
            return this;
          }
          if (arguments.length === 0) {
            for (key in this._events) {
              if (key === "removeListener") continue;
              this.removeAllListeners(key);
            }
            this.removeAllListeners("removeListener");
            this._events = {};
            return this;
          }
          listeners = this._events[type];
          if (isFunction(listeners)) {
            this.removeListener(type, listeners);
          } else {
            while (listeners.length)
              this.removeListener(type, listeners[listeners.length - 1]);
          }
          delete this._events[type];
          return this;
        };
        EventEmitter.prototype.listeners = function (type) {
          var ret;
          if (!this._events || !this._events[type]) ret = [];
          else if (isFunction(this._events[type])) ret = [this._events[type]];
          else ret = this._events[type].slice();
          return ret;
        };
        EventEmitter.listenerCount = function (emitter, type) {
          var ret;
          if (!emitter._events || !emitter._events[type]) ret = 0;
          else if (isFunction(emitter._events[type])) ret = 1;
          else ret = emitter._events[type].length;
          return ret;
        };
        function isFunction(arg) {
          return typeof arg === "function";
        }
        function isNumber(arg) {
          return typeof arg === "number";
        }
        function isObject(arg) {
          return typeof arg === "object" && arg !== null;
        }
        function isUndefined(arg) {
          return arg === void 0;
        }
      },
      {},
    ],
    2: [
      function (require, module, exports) {
        var oz = require("oscillators");
        module.exports = function (c, r, t, f) {
          return c + r * oz.sine(t, f);
        };
      },
      { oscillators: 15 },
    ],
    3: [
      function (require, module, exports) {
        module.exports = function (m, btz) {
          return function (beat) {
            var x = beat % m;
            if (x == 0) x = m;
            var i = 0;
            var r = false;
            for (i; i < btz.length; i++) {
              if (btz[i] == x) {
                r = true;
                break;
              }
            }
            return r;
          };
        };
      },
      {},
    ],
    4: [
      function (require, module, exports) {
        var funstance = require("funstance");
        module.exports = function (delay, feedback, mix, bufferSize) {
          var delay = Math.floor(delay);
          var feedback = feedback;
          var mix = mix;
          var bufferSize = bufferSize || delay * 2;
          if (bufferSize < delay * 2) bufferSize = delay * 2;
          var d = new Delay(delay, feedback, mix, bufferSize);
          var fn = funstance(d, Sample);
          return fn;
          function Delay(delay, feedback, mix, bufferSize) {
            this.feedback = feedback;
            this.mix = mix;
            this.delay = delay;
            this.buffer = new Float32Array(bufferSize);
            this.writeOffset = 0;
            this.endPoint = this.delay * 2;
            this.readOffset = this.delay + 1;
            this.readZero = 0;
          }
          function Sample(sample, _delay, feedback, mix) {
            var s = sample;
            if (feedback) this.feedback = feedback;
            if (mix) this.mix = mix;
            if (_delay && _delay !== this.delay) {
              _delay = Math.max(0, Math.floor(_delay));
              if (_delay * 2 > this.buffer.length) {
                var nb = new Float32Array(_delay * 2);
                nb.set(this.buffer, 0);
                this.buffer = nb;
              }
              this.delay = _delay;
              this.endPoint = this.delay * 2;
            }
            if (this.readOffset >= this.endPoint) this.readOffset = 0;
            s = this.buffer[this.readOffset];
            var write = sample + s * this.feedback;
            this.buffer[this.writeOffset] = write;
            this.writeOffset++;
            this.readOffset++;
            if (this.writeOffset >= this.endPoint) this.writeOffset = 0;
            return (sample + s) * this.mix;
          }
        };
      },
      { funstance: 5 },
    ],
    5: [
      function (require, module, exports) {
        module.exports = function (obj, fn) {
          var f = function () {
            if (typeof fn !== "function") return;
            return fn.apply(obj, arguments);
          };
          function C() {}
          C.prototype = Object.getPrototypeOf(obj);
          f.__proto__ = new C();
          Object.getOwnPropertyNames(Function.prototype).forEach(function (
            key
          ) {
            if (f[key] === undefined) {
              f.__proto__[key] = Function.prototype[key];
            }
          });
          Object.getOwnPropertyNames(obj).forEach(function (key) {
            f[key] = obj[key];
          });
          return f;
        };
      },
      {},
    ],
    6: [
      function (require, module, exports) {
        var nvelope = require("nvelope");
        module.exports = chrono;
        function chrono(_time) {
          if (!(this instanceof chrono)) return new chrono(_time);
          var self = this;
          this.ret = {};
          this.gens = [];
          this.time = _time || 0;
          this.start = _time || 0;
          this.set = function (time, synth, mods) {
            var x;
            self.gens.push((x = new generate(time, synth, mods)));
            return x;
          };
          this.tick = function (t, s, i) {
            self.time = t;
            gc(t);
            return self.gens.reduce(function (a, e) {
              return a + e.signal(t, s, i);
            }, 0);
          };
          function gc(t) {
            self.gens = self.gens.filter(function (e) {
              if (e.start + e.dur < t) return false;
              else return true;
            });
          }
        }
        function generate(_time, synth, mod) {
          if (!(this instanceof generate))
            return new generate(_time, synth, mod);
          var self = this;
          this.start = _time;
          this.dur = mod.durations.reduce(function (acc, e) {
            return acc + e;
          }, 0);
          this.synth = synth;
          this.env = nvelope(mod.curves, mod.durations);
          this.signal = function (t, s, i) {
            return self.synth(t, s, i) * self.env(t - self.start);
          };
        }
      },
      { nvelope: 13 },
    ],
    7: [
      function (require, module, exports) {
        var sync = require("jsynth-sync");
        module.exports = function (bpm, sampleRate) {
          var Timer = sync(bpm, sampleRate);
          Timer.beat = beat;
          return Timer;
          function beat(interval, rayray, fn) {
            var swag = 0;
            var swinger = function (x) {
              swag = x;
            };
            var master = undefined;
            return eys(interval, rayray, fn);
            function eys(interval, rayray, fn) {
              var y = rayray.length;
              if (!master) master = { rayray: rayray, beat: 0 };
              var timer = Timer.on(interval, function (time, beat, xxx, swing) {
                if (rayray === master.rayray) {
                  master.beat = beat;
                } else {
                }
                swing(swag);
                var i = rayray[(beat - 1) % y];
                if (i) {
                  if (Array.isArray(i)) {
                    var yn = i.length;
                    var intervaln = interval / yn;
                    var bat = eys(intervaln, i, fn);
                    bat._l = i.length;
                    bat.on("beat", function (b) {
                      if (b == bat._l) bat.emit("stop");
                    });
                  } else {
                    fn(time, master.beat, xxx, swinger);
                  }
                } else {
                  return;
                }
              });
              return timer;
            }
          }
        };
      },
      { "jsynth-sync": 8 },
    ],
    8: [
      function (require, module, exports) {
        var emitter = require("events").EventEmitter;
        module.exports = sync;
        var $ = module.exports;
        function sync(bpm, sampleRate) {
          if (!(this instanceof sync)) return new sync(bpm, sampleRate);
          this.bpm = bpm;
          this.beatsPerSecond = bpm / 60;
          this.sampleRate = sampleRate;
          this.spb = Math.round(sampleRate / this.beatsPerSecond);
          this.s = 0;
          this.t = 0;
          this.index = [];
          this.beatIndex = new Array();
        }
        $.prototype.clearAll = function (bpm, samplerate) {
          this.index = this.index.map(function () {
            return undefined;
          });
        };
        $.prototype.tick = function (t, i) {
          ++this.s;
          for (var n = 0; n < this.index.length; n++) {
            if (this.index[n]) this.index[n](t, i, this.s);
          }
        };
        $.prototype.off = function (i) {
          this.index.splice(i, 1, undefined);
        };
        $.prototype.on = function (beats, fn) {
          var i = Math.ceil(this.spb * beats);
          var l = this.index.length;
          var self = this;
          var off = function () {
            self.off(l);
          };
          var delta = 0;
          var skipNext = false;
          var skip = false;
          function swing(beat) {
            delta = Math.abs(Math.floor(self.spb * beat));
            skipNext = beat === 0 ? false : true;
          }
          var emit = new emitter();
          emit.on("stop", off);
          this.index.push(
            (function (b, fn, beats, off) {
              return function (t, a, f) {
                if (f % (i + delta) == 0) {
                  if (skip) {
                    skip = false;
                    return;
                  }
                  if (skipNext) {
                    skipNext = false;
                    skip = true;
                    if (delta >= i) {
                      skip = false;
                    }
                  }
                  fn.apply(fn, [t, ++b, off, swing]);
                  emit.emit("beat", b);
                }
              };
            })(0, fn, beats, off)
          );
          return emit;
        };
        function amilli(t) {
          return [Math.floor(t), (t % 1) * 1e3];
        }
      },
      { events: 1 },
    ],
    9: [
      function (require, module, exports) {
        module.exports = function (context, fn, bufSize) {
          if (typeof context === "function") {
            fn = context;
            context = new webkitAudioContext();
          }
          if (!bufSize) bufSize = 4096;
          var self = context.createScriptProcessor(bufSize, 1, 1);
          self.fn = fn;
          var tt = 0;
          var ii = 0;
          const rate = context.sampleRate;
          self.i = self.t = 0;
          window._SAMPLERATE = self.sampleRate = self.rate = context.sampleRate;
          self.duration = Infinity;
          self.recording = false;
          self.onaudioprocess = function (e) {
            var output = e.outputBuffer.getChannelData(0),
              input = e.inputBuffer.getChannelData(0);
            self.tick(output, input);
          };
          self.tick = function (output, input) {
            for (var i = 0; i < output.length; i += 1) {
              tt = ii / rate;
              ii = ii + 1;
              output[i] = self.fn(tt, ii, input[i]);
            }
            return output;
          };
          self.stop = function () {
            self.disconnect();
            self.playing = false;
            if (self.recording) {
            }
          };
          self.play = function (opts) {
            if (self.playing) return;
            self.connect(self.context.destination);
            self.playing = true;
            return;
          };
          self.record = function () {};
          self.reset = function () {
            self.i = self.t = 0;
          };
          self.createSample = function (duration) {
            self.reset();
            var buffer = self.context.createBuffer(
              1,
              duration,
              self.context.sampleRate
            );
            var blob = buffer.getChannelData(0);
            self.tick(blob);
            return buffer;
          };
          return self;
        };
        function mergeArgs(opts, args) {
          Object.keys(opts || {}).forEach(function (key) {
            args[key] = opts[key];
          });
          return Object.keys(args).reduce(function (acc, key) {
            var dash = key.length === 1 ? "-" : "--";
            return acc.concat(dash + key, args[key]);
          }, []);
        }
        function signed(n) {
          if (isNaN(n)) return 0;
          var b = Math.pow(2, 15);
          return n > 0
            ? Math.min(b - 1, Math.floor(b * n - 1))
            : Math.max(-b, Math.ceil(b * n - 1));
        }
      },
      {},
    ],
    10: [
      function (require, module, exports) {
        var gus = require("jgauss");
        var oz = require("oscillators");
        var sqrtau = Math.sqrt(Math.PI * 2);
        var defs = {};
        defs.m = 1 / 12;
        defs.f = 440;
        defs.wave = "sine";
        module.exports = makeStrangles;
        function makeStrangles(opts) {
          if (!opts) opts = {};
          if (typeof opts == "number") {
            opts = { f: opts };
          }
          for (var i in defs) {
            if (!opts[i]) opts[i] = defs[i];
          }
          return new chimera(opts);
          function chimera(opts) {
            for (var i in opts) this[i] = opts[i];
            this.ring = function (t, u, s) {
              var x = 1,
                y = 0;
              u = u || 0;
              s = s || 1;
              while (x <= s * 4.67 - 1) {
                y += oz[this.wave](t, this.f * x) * gus.general(x - 1, u, s);
                x *= Math.pow(2, this.m);
              }
              return y;
            };
          }
        }
      },
      { jgauss: 11, oscillators: 15 },
    ],
    11: [
      function (require, module, exports) {
        var sqrtau = Math.sqrt(Math.PI * 2);
        module.exports.standard = standard;
        module.exports.general = general;
        function standard(x) {
          return Math.pow(Math.E, -(1 / 2) * Math.pow(x, 2)) / sqrtau;
        }
        function general(x, u, s) {
          return (1 / s) * standard((x - u) / s);
        }
      },
      {},
    ],
    12: [
      function (require, module, exports) {
        module.exports = function (pts) {
          return function (t) {
            for (var a = pts; a.length > 1; a = b) {
              for (var i = 0, b = [], j; i < a.length - 1; i++) {
                for (b[i] = [], j = 1; j < a[i].length; j++) {
                  b[i][j] = a[i][j] * (1 - t) + a[i + 1][j] * t;
                }
              }
            }
            return a[0][1];
          };
        };
      },
      {},
    ],
    13: [
      function (require, module, exports) {
        var amod = require("./amod.js");
        var tnorm = require("normalize-time");
        module.exports = function (pts, durs) {
          pts = pts.map(amod);
          var t = 0;
          var totalDuration = durs.reduce(function (e, i) {
            return e + i;
          }, 0);
          var tdNormFN = tnorm(t, totalDuration);
          var s = 0;
          var end = t + totalDuration;
          var durFNS = durs.map(function (e, i) {
            var x = tnorm(t + s, e);
            s += e;
            return x;
          });
          var dp = 0;
          var durpercent = durs.map(function (e, i) {
            var x = e / totalDuration + dp;
            dp += e / totalDuration;
            return x;
          });
          var tn,
            n,
            i,
            v = 0,
            fn = 0;
          var envelope = function (t) {
            tn = tdNormFN(t);
            if (0 > tn || tn > 1) return 0;
            fn = durpercent.reduce(function (p, e, i, d) {
              return (d[i - 1] || 0) <= tn && tn <= e ? i : p;
            }, 0);
            v = pts[fn](durFNS[fn](t));
            return v;
          };
          return envelope;
          function xenvelope(t, sustain) {
            tn = tdNormFN(t);
            if (0 >= tn || tn >= 1) return 0;
            if (tn > durpercent[fn]) fn = fn + 1 > pts.length - 1 ? 0 : fn + 1;
            v = pts[fn](durFNS[fn](t));
            return v;
          }
        };
      },
      { "./amod.js": 12, "normalize-time": 14 },
    ],
    14: [
      function (require, module, exports) {
        module.exports = function (start, dur, min, max) {
          if (!min) min = 0;
          if (!max) max = 1;
          var end = start + dur;
          var d = end - start;
          var r = max - min;
          return function (time) {
            x = min + ((time - start) * r) / d;
            if (x > 1) {
              if (time < end)
                x = Number("." + x.toString().split(".").join(""));
            }
            return x;
          };
        };
      },
      {},
    ],
    15: [
      function (require, module, exports) {
        var OZ = module.exports;
        var tau = Math.PI * 2;
        OZ.sine = sine;
        OZ.saw = saw;
        OZ.saw_i = saw_i;
        OZ.triangle = triangle;
        OZ.triangle_s = triangle_s;
        OZ.square = square;
        function sine(t, f) {
          return Math.sin(t * tau * f);
        }
        function saw(t, f) {
          var n = ((t % (1 / f)) * f) % 1;
          return -1 + 2 * n;
        }
        function saw_i(t, f) {
          var n = ((t % (1 / f)) * f) % 1;
          return 1 - 2 * n;
        }
        function triangle(t, f) {
          var n = ((t % (1 / f)) * f) % 1;
          return n < 0.5 ? -1 + 2 * (2 * n) : 1 - 2 * (2 * n);
        }
        function triangle_s(t, f) {
          var n = ((t % (1 / f)) * f) % 1;
          var s = Math.abs(Math.sin(t));
          return n < s ? -1 + 2 * (2 * (n / s)) : 1 - 2 * (2 * (n / s));
        }
        function square(t, f) {
          return ((t % (1 / f)) * f) % 1 > 0.5 ? 1 : -1;
        }
      },
      {},
    ],
    16: [
      function (require, module, exports) {
        (function teoriaScope() {
          "use strict";
          var teoria = {};
          function add(note, interval) {
            return [note[0] + interval[0], note[1] + interval[1]];
          }
          function sub(note, interval) {
            return [note[0] - interval[0], note[1] - interval[1]];
          }
          function mul(note, interval) {
            if (typeof interval === "number")
              return [note[0] * interval, note[1] * interval];
            else return [note[0] * interval[0], note[1] * interval[1]];
          }
          function sum(coord) {
            return coord[0] + coord[1];
          }
          var notes = {
            c: [0, 0],
            d: [-1, 2],
            e: [-2, 4],
            f: [1, -1],
            g: [0, 1],
            a: [-1, 3],
            b: [-2, 5],
            h: [-2, 5],
          };
          var intervals = {
            unison: [0, 0],
            second: [3, -5],
            third: [2, -3],
            fourth: [1, -1],
            fifth: [0, 1],
            sixth: [3, -4],
            seventh: [2, -2],
            octave: [1, 0],
          };
          var intervalFromFifth = [
            "second",
            "sixth",
            "third",
            "seventh",
            "fourth",
            "unison",
            "fifth",
          ];
          var intervalsIndex = [
            "unison",
            "second",
            "third",
            "fourth",
            "fifth",
            "sixth",
            "seventh",
            "octave",
            "ninth",
            "tenth",
            "eleventh",
            "twelfth",
            "thirteenth",
            "fourteenth",
            "fifteenth",
          ];
          var fifths = ["f", "c", "g", "d", "a", "e", "b"];
          var accidentals = ["bb", "b", "", "#", "x"];
          var sharp = [-4, 7];
          var A4 = add(notes.a, [4, 0]);
          var kDurations = {
            0.25: "longa",
            0.5: "breve",
            1: "whole",
            2: "half",
            4: "quarter",
            8: "eighth",
            16: "sixteenth",
            32: "thirty-second",
            64: "sixty-fourth",
            128: "hundred-twenty-eighth",
          };
          var kQualityLong = {
            P: "perfect",
            M: "major",
            m: "minor",
            A: "augmented",
            AA: "doubly augmented",
            d: "diminished",
            dd: "doubly diminished",
          };
          var kAlterations = {
            perfect: ["dd", "d", "P", "A", "AA"],
            minor: ["dd", "d", "m", "M", "A", "AA"],
          };
          var kSymbols = {
            min: ["m3", "P5"],
            m: ["m3", "P5"],
            "-": ["m3", "P5"],
            M: ["M3", "P5"],
            "": ["M3", "P5"],
            "+": ["M3", "A5"],
            aug: ["M3", "A5"],
            dim: ["m3", "d5"],
            o: ["m3", "d5"],
            maj: ["M3", "P5", "M7"],
            dom: ["M3", "P5", "m7"],
            ø: ["m3", "d5", "m7"],
            5: ["P5"],
          };
          var kChordShort = {
            major: "M",
            minor: "m",
            augmented: "aug",
            diminished: "dim",
            "half-diminished": "7b5",
            power: "5",
            dominant: "7",
          };
          var kStepNumber = {
            unison: 1,
            first: 1,
            second: 2,
            third: 3,
            fourth: 4,
            fifth: 5,
            sixth: 6,
            seventh: 7,
            octave: 8,
            ninth: 9,
            eleventh: 11,
            thirteenth: 13,
          };
          var kIntervalSolfege = {
            dd1: "daw",
            d1: "de",
            P1: "do",
            A1: "di",
            AA1: "dai",
            d2: "raw",
            m2: "ra",
            M2: "re",
            A2: "ri",
            AA2: "rai",
            d3: "maw",
            m3: "me",
            M3: "mi",
            A3: "mai",
            dd4: "faw",
            d4: "fe",
            P4: "fa",
            A4: "fi",
            AA4: "fai",
            dd5: "saw",
            d5: "se",
            P5: "so",
            A5: "si",
            AA5: "sai",
            d6: "law",
            m6: "le",
            M6: "la",
            A6: "li",
            AA6: "lai",
            d7: "taw",
            m7: "te",
            M7: "ti",
            A7: "tai",
            dd8: "daw",
            d8: "de",
            P8: "do",
            A8: "di",
            AA8: "dai",
          };
          function pad(str, ch, len) {
            for (; len > 0; len--) {
              str += ch;
            }
            return str;
          }
          teoria.note = function (name, duration) {
            if (typeof name === "string")
              return teoria.note.fromString(name, duration);
            else return new TeoriaNote(name, duration);
          };
          teoria.note.fromKey = function (key) {
            var octave = Math.floor((key - 4) / 12);
            var distance = key - octave * 12 - 4;
            var name = fifths[(2 * Math.round(distance / 2) + 1) % 7];
            var note = add(sub(notes[name], A4), [octave + 1, 0]);
            var diff = key - 49 - sum(mul(note, [12, 7]));
            return teoria.note(diff ? add(note, mul(sharp, diff)) : note);
          };
          teoria.note.fromFrequency = function (fq, concertPitch) {
            var key, cents, originalFq;
            concertPitch = concertPitch || 440;
            key =
              49 + 12 * ((Math.log(fq) - Math.log(concertPitch)) / Math.log(2));
            key = Math.round(key);
            originalFq = concertPitch * Math.pow(2, (key - 49) / 12);
            cents = 1200 * (Math.log(fq / originalFq) / Math.log(2));
            return { note: teoria.note.fromKey(key), cents: cents };
          };
          teoria.note.fromMIDI = function (note) {
            return teoria.note.fromKey(note - 20);
          };
          teoria.note.fromString = function (name, dur) {
            var scientific = /^([a-h])(x|#|bb|b?)(-?\d*)/i,
              helmholtz = /^([a-h])(x|#|bb|b?)([,\']*)$/i,
              parser,
              noteName,
              octave,
              accidental,
              note,
              lower;
            parser = name.match(scientific);
            if (parser && name === parser[0] && parser[3].length) {
              noteName = parser[1];
              octave = +parser[3];
            } else {
              name = name.replace(/\u2032/g, "'").replace(/\u0375/g, ",");
              parser = name.match(helmholtz);
              if (!parser || name !== parser[0])
                throw new Error("Invalid note format");
              noteName = parser[1];
              octave = parser[3];
              lower = noteName === noteName.toLowerCase();
              if (!octave.length) octave = lower ? 3 : 2;
              else if (octave.match(/^'+$/) && lower)
                octave = 3 + octave.length;
              else if (octave.match(/^,+$/) && !lower)
                octave = 2 - octave.length;
              else throw new Error("Format must respect the Helmholtz format");
            }
            accidental = parser[2].length ? parser[2].toLowerCase() : "";
            noteName = noteName.toLowerCase();
            note = [notes[noteName][0], notes[noteName][1]];
            note = add(note, [octave, 0]);
            note = add(note, mul(sharp, accidentals.indexOf(accidental) - 2));
            return new TeoriaNote(sub(note, A4), dur);
          };
          teoria.chord = function (name, symbol) {
            if (typeof name === "string") {
              var root, octave;
              root = name.match(/^([a-h])(x|#|bb|b?)/i);
              if (root && root[0]) {
                octave = typeof symbol === "number" ? symbol.toString(10) : "4";
                return new TeoriaChord(
                  teoria.note(root[0].toLowerCase() + octave),
                  name.substr(root[0].length)
                );
              }
            } else if (name instanceof TeoriaNote)
              return new TeoriaChord(name, symbol);
            throw new Error("Invalid Chord. Couldn't find note name");
          };
          teoria.interval = function (from, to) {
            if (typeof from === "string") return teoria.interval.toCoord(from);
            if (typeof to === "string" && from instanceof TeoriaNote)
              return teoria.interval.from(from, teoria.interval.toCoord(to));
            if (to instanceof TeoriaInterval && from instanceof TeoriaNote)
              return teoria.interval.from(from, to);
            if (to instanceof TeoriaNote && from instanceof TeoriaNote)
              return teoria.interval.between(from, to);
            throw new Error("Invalid parameters");
          };
          teoria.interval.toCoord = function (simple) {
            var pattern = /^(AA|A|P|M|m|d|dd)(-?\d+)$/,
              parser,
              number,
              coord,
              quality,
              lower,
              octaves,
              base,
              type,
              alt,
              down;
            parser = simple.match(pattern);
            if (!parser) throw new Error("Invalid simple format interval");
            quality = parser[1];
            number = +parser[2];
            down = number < 0;
            number = down ? -number : number;
            lower = number > 8 ? (number % 7 ? number % 7 : 7) : number;
            octaves = (number - lower) / 7;
            base = intervals[intervalsIndex[lower - 1]];
            coord = add(base, [octaves, 0]);
            type = base[0] <= 1 ? "perfect" : "minor";
            if (
              (type === "perfect" && (quality === "M" || quality === "m")) ||
              (type === "minor" && quality === "P")
            ) {
              throw new Error("Invalid interval quality");
            }
            alt = kAlterations[type].indexOf(quality) - 2;
            coord = add(coord, mul(sharp, alt));
            coord = down ? mul(coord, -1) : coord;
            return new TeoriaInterval(coord);
          };
          teoria.interval.from = function (from, to) {
            return new TeoriaNote(add(from.coord, to.coord));
          };
          teoria.interval.between = function (from, to) {
            return new TeoriaInterval(sub(to.coord, from.coord));
          };
          teoria.interval.invert = function (sInterval) {
            return teoria.interval(sInterval).invert().toString();
          };
          teoria.scale = function (tonic, scale) {
            if (!(tonic instanceof TeoriaNote)) tonic = teoria.note(tonic);
            return new TeoriaScale(tonic, scale);
          };
          teoria.scale.scales = {};
          function TeoriaNote(coord, duration) {
            duration = duration || {};
            this.duration = {
              value: duration.value || 4,
              dots: duration.dots || 0,
            };
            this.coord = coord;
          }
          TeoriaNote.prototype = {
            octave: function () {
              return (
                this.coord[0] +
                A4[0] -
                notes[this.name()][0] +
                this.accidentalValue() * 4
              );
            },
            name: function () {
              return fifths[
                this.coord[1] + A4[1] - this.accidentalValue() * 7 + 1
              ];
            },
            accidentalValue: function () {
              return Math.round((this.coord[1] + A4[1] - 2) / 7);
            },
            accidental: function () {
              return accidentals[this.accidentalValue() + 2];
            },
            key: function (white) {
              if (white) return this.coord[0] * 7 + this.coord[1] * 4 + 29;
              else return this.coord[0] * 12 + this.coord[1] * 7 + 49;
            },
            midi: function () {
              return this.key() + 20;
            },
            fq: function (concertPitch) {
              concertPitch = concertPitch || 440;
              return (
                concertPitch *
                Math.pow(2, (this.coord[0] * 12 + this.coord[1] * 7) / 12)
              );
            },
            chroma: function () {
              var value = (sum(mul(this.coord, [12, 7])) - 3) % 12;
              return value < 0 ? value + 12 : value;
            },
            scale: function (scale) {
              return teoria.scale(this, scale);
            },
            interval: function (interval) {
              return teoria.interval(this, interval);
            },
            transpose: function (interval) {
              var note = teoria.interval(this, interval);
              this.coord = note.coord;
              return this;
            },
            chord: function (chord) {
              chord = chord in kChordShort ? kChordShort[chord] : chord;
              return new TeoriaChord(this, chord);
            },
            helmholtz: function () {
              var octave = this.octave();
              var name = this.name();
              name = octave < 3 ? name.toUpperCase() : name.toLowerCase();
              var padchar = octave < 3 ? "," : "'";
              var padcount = octave < 2 ? 2 - octave : octave - 3;
              return pad(name + this.accidental(), padchar, padcount);
            },
            scientific: function () {
              return (
                this.name().toUpperCase() + this.accidental() + this.octave()
              );
            },
            enharmonics: function (oneaccidental) {
              var key = this.key(),
                limit = oneaccidental ? 2 : 3;
              return ["m3", "m2", "m-2", "m-3"]
                .map(this.interval.bind(this))
                .filter(function (note) {
                  var acc = note.accidentalValue();
                  var diff = key - (note.key() - acc);
                  if (diff < limit && diff > -limit) {
                    note.coord = add(note.coord, mul(sharp, diff - acc));
                    return true;
                  }
                });
            },
            solfege: function (scale, showOctaves) {
              if (!(scale instanceof TeoriaScale)) {
                throw new Error("Invalid Scale");
              }
              var interval = scale.tonic.interval(this),
                solfege,
                stroke,
                count;
              if (interval.direction() === "down") interval = interval.invert();
              if (showOctaves) {
                count = (this.key(true) - scale.tonic.key(true)) / 7;
                count = count >= 0 ? Math.floor(count) : -Math.ceil(-count);
                stroke = count >= 0 ? "'" : ",";
              }
              solfege = kIntervalSolfege[interval.simple(true).toString()];
              return showOctaves
                ? pad(solfege, stroke, Math.abs(count))
                : solfege;
            },
            durationName: function () {
              return kDurations[this.duration.value];
            },
            durationInSeconds: function (bpm, beatUnit) {
              var secs = 60 / bpm / (this.duration.value / 4) / (beatUnit / 4);
              return secs * 2 - secs / Math.pow(2, this.duration.dots);
            },
            scaleDegree: function (scale) {
              var inter = scale.tonic.interval(this);
              if (
                inter.direction() === "down" ||
                (inter.coord[1] === 0 && inter.coord[0] !== 0)
              ) {
                inter = inter.invert();
              }
              inter = inter.simple(true).coord;
              return scale.scale.reduce(function (index, current, i) {
                var coord = teoria.interval(current).coord;
                return coord[0] === inter[0] && coord[1] === inter[1]
                  ? i + 1
                  : index;
              }, 0);
            },
            toString: function (dont) {
              return (
                this.name() + this.accidental() + (dont ? "" : this.octave())
              );
            },
          };
          function TeoriaInterval(coord) {
            this.coord = coord;
          }
          TeoriaInterval.prototype = {
            name: function () {
              return intervalsIndex[this.number() - 1];
            },
            semitones: function () {
              return sum(mul(this.coord, [12, 7]));
            },
            number: function () {
              return Math.abs(this.value());
            },
            value: function () {
              var without = sub(
                  this.coord,
                  mul(sharp, Math.floor((this.coord[1] - 2) / 7) + 1)
                ),
                i,
                val;
              i = intervalFromFifth[without[1] + 5];
              val = kStepNumber[i] + (without[0] - intervals[i][0]) * 7;
              return val > 0 ? val : val - 2;
            },
            type: function () {
              return intervals[this.base()][0] <= 1 ? "perfect" : "minor";
            },
            base: function () {
              var fifth = sub(this.coord, mul(sharp, this.qualityValue()))[1],
                name;
              fifth = this.value() > 0 ? fifth + 5 : -(fifth - 5) % 7;
              fifth = fifth < 0 ? intervalFromFifth.length + fifth : fifth;
              name = intervalFromFifth[fifth];
              if (name === "unison" && this.number() >= 8) name = "octave";
              return name;
            },
            direction: function (dir) {
              if (dir) {
                var is = this.value() >= 1 ? "up" : "down";
                if (is !== dir) this.coord = mul(this.coord, -1);
                return this;
              } else return this.value() >= 1 ? "up" : "down";
            },
            simple: function (ignore) {
              var simple = intervals[this.base()];
              simple = add(simple, mul(sharp, this.qualityValue()));
              if (!ignore)
                simple = this.direction() === "down" ? mul(simple, -1) : simple;
              return new TeoriaInterval(simple);
            },
            isCompound: function () {
              return this.number() > 8;
            },
            octaves: function () {
              var without, octaves;
              if (this.direction() === "up") {
                without = sub(this.coord, mul(sharp, this.qualityValue()));
                octaves = without[0] - intervals[this.base()][0];
              } else {
                without = sub(this.coord, mul(sharp, -this.qualityValue()));
                octaves = -(without[0] + intervals[this.base()][0]);
              }
              return octaves;
            },
            invert: function () {
              var i = this.base();
              var qual = this.qualityValue();
              var acc = this.type() === "minor" ? -(qual - 1) : -qual;
              var coord = intervals[intervalsIndex[9 - kStepNumber[i] - 1]];
              coord = add(coord, mul(sharp, acc));
              return new TeoriaInterval(coord);
            },
            quality: function (lng) {
              var quality = kAlterations[this.type()][this.qualityValue() + 2];
              return lng ? kQualityLong[quality] : quality;
            },
            qualityValue: function () {
              if (this.direction() === "down")
                return Math.floor((-this.coord[1] - 2) / 7) + 1;
              else return Math.floor((this.coord[1] - 2) / 7) + 1;
            },
            equal: function (interval) {
              return (
                this.coord[0] === interval.coord[0] &&
                this.coord[1] === interval.coord[1]
              );
            },
            greater: function (interval) {
              var semi = this.semitones();
              var isemi = interval.semitones();
              return semi === isemi
                ? this.number() > interval.number()
                : semi > isemi;
            },
            smaller: function (interval) {
              return !this.equal(interval) && !this.greater(interval);
            },
            add: function (interval) {
              return new TeoriaInterval(add(this.coord, interval.coord));
            },
            toString: function (ignore) {
              var number = ignore ? this.number() : this.value();
              return this.quality() + number;
            },
          };
          function TeoriaChord(root, name) {
            name = name || "";
            this.name = root.name().toUpperCase() + root.accidental() + name;
            this.symbol = name;
            this.root = root;
            this.intervals = [];
            this._voicing = [];
            var i,
              length,
              c,
              shortQ,
              parsing = "quality",
              additionals = [],
              notes = ["P1", "M3", "P5", "m7", "M9", "P11", "M13"],
              chordLength = 2,
              bass,
              symbol;
            function setChord(intervals) {
              for (var n = 0, chordl = intervals.length; n < chordl; n++) {
                notes[n + 1] = intervals[n];
              }
              chordLength = intervals.length;
            }
            name = name.replace(/[,\s\(\)]/g, "");
            bass = name.split("/");
            if (bass.length === 2) {
              name = bass[0];
              bass = bass[1];
            } else {
              bass = null;
            }
            for (i = 0, length = name.length; i < length; i++) {
              if (!(c = name[i])) {
                break;
              }
              switch (parsing) {
                case "quality":
                  shortQ =
                    i + 3 <= length ? name.substr(i, 3).toLowerCase() : null;
                  symbol = shortQ in kSymbols ? shortQ : c in kSymbols ? c : "";
                  setChord(kSymbols[symbol]);
                  i += symbol.length - 1;
                  parsing = "extension";
                  break;
                case "extension":
                  c =
                    c === "1" && name[i + 1]
                      ? parseFloat(name.substr(i, 2))
                      : parseFloat(c);
                  if (!isNaN(c) && c !== 6) {
                    chordLength = (c - 1) / 2;
                    if (chordLength !== Math.round(chordLength)) {
                      throw new Error(
                        "Invalid interval extension: " + c.toString(10)
                      );
                    }
                    if (symbol === "o" || symbol === "dim") {
                      notes[3] = "d7";
                    }
                    i += String(c).length - 1;
                  } else if (c === 6) {
                    notes[3] = "M6";
                    chordLength = chordLength < 3 ? 3 : chordLength;
                  } else {
                    i -= 1;
                  }
                  parsing = "alterations";
                  break;
                case "alterations":
                  var alterations = name
                      .substr(i)
                      .split(/(#|b|add|maj|sus|M)/i),
                    next,
                    flat = false,
                    sharp = false;
                  if (alterations.length === 1) {
                    throw new Error("Invalid alterations");
                  } else if (alterations[0].length !== 0) {
                    throw new Error("Invalid token: '" + alterations[0] + "'");
                  }
                  for (
                    var a = 1, aLength = alterations.length;
                    a < aLength;
                    a++
                  ) {
                    next = alterations[a + 1];
                    switch (alterations[a]) {
                      case "M":
                      case "Maj":
                      case "maj":
                        chordLength = chordLength < 3 ? 3 : chordLength;
                        if (next === "7") {
                          a++;
                        }
                        notes[3] = "M7";
                        break;
                      case "Sus":
                      case "sus":
                        var type = "P4";
                        if (next === "2" || next === "4") {
                          a++;
                          if (next === "2") {
                            type = "M2";
                          }
                        }
                        notes[1] = type;
                        break;
                      case "Add":
                      case "add":
                        if (next && !isNaN(+next)) {
                          if (next === "9") {
                            additionals.push("M9");
                          } else if (next === "11") {
                            additionals.push("P11");
                          } else if (next === "13") {
                            additionals.push("M13");
                          }
                          a += next.length;
                        }
                        break;
                      case "b":
                        flat = true;
                        break;
                      case "#":
                        sharp = true;
                        break;
                      default:
                        if (alterations[a].length === 0) {
                          break;
                        }
                        var token = +alterations[a],
                          quality,
                          intPos;
                        if (
                          isNaN(token) ||
                          String(token).length !== alterations[a].length
                        ) {
                          throw new Error(
                            "Invalid token: '" + alterations[a] + "'"
                          );
                        }
                        if (token === 6) {
                          if (sharp) {
                            notes[3] = "A6";
                          } else if (flat) {
                            notes[3] = "m6";
                          } else {
                            notes[3] = "M6";
                          }
                          chordLength = chordLength < 3 ? 3 : chordLength;
                          continue;
                        }
                        intPos = (token - 1) / 2;
                        if (chordLength < intPos) {
                          chordLength = intPos;
                        }
                        if (
                          token < 5 ||
                          token === 7 ||
                          intPos !== Math.round(intPos)
                        ) {
                          throw new Error(
                            "Invalid interval alteration: " + token
                          );
                        }
                        quality = notes[intPos][0];
                        if (sharp) {
                          if (quality === "d") {
                            quality = "m";
                          } else if (quality === "m") {
                            quality = "M";
                          } else if (quality === "M" || quality === "P") {
                            quality = "A";
                          }
                        } else if (flat) {
                          if (quality === "A") {
                            quality = "M";
                          } else if (quality === "M") {
                            quality = "m";
                          } else if (quality === "m" || quality === "P") {
                            quality = "d";
                          }
                        }
                        sharp = flat = false;
                        notes[intPos] = quality + token;
                        break;
                    }
                  }
                  parsing = "ended";
                  break;
              }
              if (parsing === "ended") {
                break;
              }
            }
            if (bass && bass === "9") {
              additionals.push("M9");
              bass = null;
            }
            this.intervals = notes
              .slice(0, chordLength + 1)
              .concat(additionals)
              .map(function (i) {
                return teoria.interval(i);
              });
            for (i = 0, length = this.intervals.length; i < length; i++) {
              this._voicing[i] = this.intervals[i];
            }
            if (bass) {
              var intervals = this.intervals,
                bassInterval,
                note;
              note = teoria.note(bass + (root.octave() + 1));
              bassInterval = teoria.interval.between(root, note);
              bass = bassInterval.simple();
              bassInterval = bassInterval.invert();
              bassInterval.direction("down");
              this._voicing = [bassInterval];
              for (i = 0; i < length; i++) {
                if (intervals[i].simple().equal(bass)) continue;
                this._voicing.push(intervals[i]);
              }
            }
          }
          TeoriaChord.prototype = {
            notes: function () {
              var voicing = this.voicing(),
                notes = [];
              for (var i = 0, length = voicing.length; i < length; i++) {
                notes.push(teoria.interval.from(this.root, voicing[i]));
              }
              return notes;
            },
            voicing: function (voicing) {
              if (!voicing) {
                return this._voicing;
              }
              this._voicing = [];
              for (var i = 0, length = voicing.length; i < length; i++) {
                this._voicing[i] = teoria.interval(voicing[i]);
              }
              return this;
            },
            resetVoicing: function () {
              this._voicing = this.intervals;
            },
            dominant: function (additional) {
              additional = additional || "";
              return new TeoriaChord(this.root.interval("P5"), additional);
            },
            subdominant: function (additional) {
              additional = additional || "";
              return new TeoriaChord(this.root.interval("P4"), additional);
            },
            parallel: function (additional) {
              additional = additional || "";
              var quality = this.quality();
              if (
                this.chordType() !== "triad" ||
                quality === "diminished" ||
                quality === "augmented"
              ) {
                throw new Error("Only major/minor triads have parallel chords");
              }
              if (quality === "major") {
                return new TeoriaChord(this.root.interval("m3", "down"), "m");
              } else {
                return new TeoriaChord(this.root.interval("m3", "up"));
              }
            },
            quality: function () {
              var third,
                fifth,
                seventh,
                intervals = this.intervals;
              for (var i = 0, length = intervals.length; i < length; i++) {
                if (intervals[i].number() === 3) {
                  third = intervals[i];
                } else if (intervals[i].number() === 5) {
                  fifth = intervals[i];
                } else if (intervals[i].number() === 7) {
                  seventh = intervals[i];
                }
              }
              if (!third) {
                return;
              }
              third = third.direction() === "down" ? third.invert() : third;
              third = third.simple().toString();
              if (fifth) {
                fifth = fifth.direction === "down" ? fifth.invert() : fifth;
                fifth = fifth.simple().toString();
              }
              if (seventh) {
                seventh =
                  seventh.direction === "down" ? seventh.invert() : seventh;
                seventh = seventh.simple().toString();
              }
              if (third === "M3") {
                if (fifth === "A5") {
                  return "augmented";
                } else if (fifth === "P5") {
                  return seventh === "m7" ? "dominant" : "major";
                }
                return "major";
              } else if (third === "m3") {
                if (fifth === "P5") {
                  return "minor";
                } else if (fifth === "d5") {
                  return seventh === "m7" ? "half-diminished" : "diminished";
                }
                return "minor";
              }
            },
            chordType: function () {
              var length = this.intervals.length,
                interval,
                has,
                invert,
                i,
                name;
              if (length === 2) {
                return "dyad";
              } else if (length === 3) {
                has = { first: false, third: false, fifth: false };
                for (i = 0; i < length; i++) {
                  interval = this.intervals[i];
                  invert = interval.invert();
                  if (interval.base() in has) {
                    has[interval.base()] = true;
                  } else if (invert.base() in has) {
                    has[invert.base()] = true;
                  }
                }
                name =
                  has.first && has.third && has.fifth ? "triad" : "trichord";
              } else if (length === 4) {
                has = {
                  first: false,
                  third: false,
                  fifth: false,
                  seventh: false,
                };
                for (i = 0; i < length; i++) {
                  interval = this.intervals[i];
                  invert = interval.invert();
                  if (interval.base() in has) {
                    has[interval.base()] = true;
                  } else if (invert.base() in has) {
                    has[invert.base()] = true;
                  }
                }
                if (has.first && has.third && has.fifth && has.seventh) {
                  name = "tetrad";
                }
              }
              return name || "unknown";
            },
            get: function (interval) {
              if (typeof interval === "string" && interval in kStepNumber) {
                var intervals = this.intervals,
                  i,
                  length;
                interval = kStepNumber[interval];
                for (i = 0, length = intervals.length; i < length; i++) {
                  if (intervals[i].number() === interval) {
                    return teoria.interval.from(this.root, intervals[i]);
                  }
                }
                return null;
              } else {
                throw new Error("Invalid interval name");
              }
            },
            interval: function (interval) {
              return new TeoriaChord(this.root.interval(interval), this.symbol);
            },
            transpose: function (interval) {
              this.root.transpose(interval);
              this.name =
                this.root.name().toUpperCase() +
                this.root.accidental() +
                this.symbol;
              return this;
            },
            toString: function () {
              return this.name;
            },
          };
          function TeoriaScale(tonic, scale) {
            var scaleName, i;
            if (!(tonic instanceof TeoriaNote)) {
              throw new Error("Invalid Tonic");
            }
            if (typeof scale === "string") {
              scaleName = scale;
              scale = teoria.scale.scales[scale];
              if (!scale) throw new Error("Invalid Scale");
            } else {
              for (i in teoria.scale.scales) {
                if (teoria.scale.scales.hasOwnProperty(i)) {
                  if (teoria.scale.scales[i].toString() === scale.toString()) {
                    scaleName = i;
                    break;
                  }
                }
              }
            }
            this.name = scaleName;
            this.tonic = tonic;
            this.scale = scale;
          }
          TeoriaScale.prototype = {
            notes: function () {
              var notes = [];
              for (var i = 0, length = this.scale.length; i < length; i++) {
                notes.push(teoria.interval(this.tonic, this.scale[i]));
              }
              return notes;
            },
            simple: function () {
              return this.notes().map(function (n) {
                return n.toString(true);
              });
            },
            type: function () {
              var length = this.scale.length - 2;
              if (length < 8) {
                return (
                  ["di", "tri", "tetra", "penta", "hexa", "hepta", "octa"][
                    length
                  ] + "tonic"
                );
              }
            },
            get: function (i) {
              i =
                typeof i === "string" && i in kStepNumber ? kStepNumber[i] : i;
              return this.tonic.interval(this.scale[i - 1]);
            },
            solfege: function (index, showOctaves) {
              if (index) return this.get(index).solfege(this, showOctaves);
              return this.notes().map(function (n) {
                return n.solfege(this, showOctaves);
              });
            },
            interval: function (interval) {
              return new TeoriaScale(this.tonic.interval(interval), this.scale);
            },
            transpose: function (interval) {
              var scale = this.interval(interval);
              this.scale = scale.scale;
              this.tonic = scale.tonic;
              return this;
            },
          };
          teoria.scale.scales.ionian = teoria.scale.scales.major = [
            "P1",
            "M2",
            "M3",
            "P4",
            "P5",
            "M6",
            "M7",
          ];
          teoria.scale.scales.dorian = [
            "P1",
            "M2",
            "m3",
            "P4",
            "P5",
            "M6",
            "m7",
          ];
          teoria.scale.scales.phrygian = [
            "P1",
            "m2",
            "m3",
            "P4",
            "P5",
            "m6",
            "m7",
          ];
          teoria.scale.scales.lydian = [
            "P1",
            "M2",
            "M3",
            "A4",
            "P5",
            "M6",
            "M7",
          ];
          teoria.scale.scales.mixolydian = [
            "P1",
            "M2",
            "M3",
            "P4",
            "P5",
            "M6",
            "m7",
          ];
          teoria.scale.scales.aeolian = teoria.scale.scales.minor = [
            "P1",
            "M2",
            "m3",
            "P4",
            "P5",
            "m6",
            "m7",
          ];
          teoria.scale.scales.locrian = [
            "P1",
            "m2",
            "m3",
            "P4",
            "d5",
            "m6",
            "m7",
          ];
          teoria.scale.scales.majorpentatonic = ["P1", "M2", "M3", "P5", "M6"];
          teoria.scale.scales.minorpentatonic = ["P1", "m3", "P4", "P5", "m7"];
          teoria.scale.scales.chromatic =
            teoria.scale.scales.harmonicchromatic = [
              "P1",
              "m2",
              "M2",
              "m3",
              "M3",
              "P4",
              "A4",
              "P5",
              "m6",
              "M6",
              "m7",
              "M7",
            ];
          teoria.TeoriaNote = TeoriaNote;
          teoria.TeoriaChord = TeoriaChord;
          teoria.TeoriaScale = TeoriaScale;
          teoria.TeoriaInterval = TeoriaInterval;
          if (typeof exports !== "undefined") {
            if (typeof module !== "undefined" && module.exports)
              exports = module.exports = teoria;
            exports.teoria = teoria;
          } else if (typeof this !== "undefined") this.teoria = teoria;
          else if (typeof window !== "undefined") window.teoria = teoria;
        })();
      },
      {},
    ],
    cheatcode: [
      function (require, module, exports) {
        window.time = 0;
        context = AudioContext;
        master = new context();
        SAMPLERATE = samplerate = master.sampleRate;
        jsynth = require("jsynth");
        nvelope = require("nvelope");
        sync = require("jsynth-zerone");
        oz = require("oscillators");
        jdelay = require("jdelay");
        amod = require("amod");
        chronotrigger = require("jigger");
        clang = require("meffisto");
        beatmath = require("beatmath");
        teoria = require("teoria");
        specialX = function (t, s, i) {
          return 0;
        };
        generator = new chronotrigger();
        music = function (time, sample, input) {
          window.time = time;
          timer.tick.call(timer, time);
          return (
            generator.tick(time, sample, input) + specialX(time, sample, input)
          );
        };
        timer = sync(60, master.sampleRate);
        dsp = function (t, s, i) {
          time = t;
          return music(t, s, i);
        };
        synth = jsynth(master, dsp);
        synth.connect(master.destination);
      },
      {
        amod: 2,
        beatmath: 3,
        jdelay: 4,
        jigger: 6,
        jsynth: 9,
        "jsynth-zerone": 7,
        meffisto: 10,
        nvelope: 13,
        oscillators: 15,
        teoria: 16,
      },
    ],
  },
  {},
  []
);
require("cheatcode");
var x = 2;
specialX = function (t) {
  if (t > 6 * x) x += 2;
  t *= 72 / 60 / x;
  t = ((t * (8 + x)) % 12) + (x % t);
  var a = amod(0.25, 0.125, t, 1 / 6);
  return (
    0 +
    oz.sine(
      t,
      120 + oz.triangle(t, amod(0, 0.1, t, 1 / 2) * oz.triangle(t, 1 / 2))
    ) *
      a +
    oz.sine(t, 360 + amod(0, 0.1, t, 1 / 3) * oz.triangle(t, 1 / 3)) * a
  );
};
