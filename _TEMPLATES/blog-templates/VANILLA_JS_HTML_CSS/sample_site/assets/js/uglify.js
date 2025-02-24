/** @license uglifyweb Copyright (c) 2011, The Dojo Foundation All Rights Reserved.
 * The parts that are unique to this repo (not much, just some wrapper code) are
 * released under the new BSD and MIT licenses.
 *
 * This file includes UglifyJS and some parts of es5-shim, both which have
 * their own licenses:
 *
 * https://github.com/mishoo/UglifyJS (BSD)
 * https://github.com/kriskowal/es5-shim (MIT)
 *
 * More info on the project: https://github.com/jrburke/uglifyweb
 */

(function () {
  var a = Object.prototype.toString,
    b = "a"[0] != "a",
    c = function (a) {
      if (a == null) throw new TypeError();
      return b && typeof a == "string" && a ? a.split("") : Object(a);
    };
  Array.prototype.forEach ||
    (Array.prototype.forEach = function (a) {
      var b = c(this),
        d = arguments[1],
        e = 0,
        f = b.length >>> 0;
      while (e < f) e in b && a.call(d, b[e], e, b), e++;
    }),
    Array.prototype.reduce ||
      (Array.prototype.reduce = function (a) {
        var b = c(this),
          d = b.length >>> 0;
        if (!d && arguments.length == 1) throw new TypeError();
        var e = 0,
          f;
        if (arguments.length < 2) {
          do {
            if (e in b) {
              f = b[e++];
              break;
            }
            if (++e >= d) throw new TypeError();
          } while (!0);
        } else f = arguments[1];
        for (; e < d; e++) e in b && (f = a.call(void 0, f, b[e], e, b));
        return f;
      });
  var d, e, f;
  (function () {
    function g(a, b) {
      if (a && a.charAt(0) === "." && b) {
        (b = b.split("/")),
          (b = b.slice(0, b.length - 1)),
          (a = b.concat(a.split("/")));
        var c, d;
        for (c = 0; (d = a[c]); c++)
          if (d === ".") a.splice(c, 1), (c -= 1);
          else if (d === "..")
            if (c !== 1 || (a[2] !== ".." && a[0] !== ".."))
              c > 0 && (a.splice(c - 1, 2), (c -= 2));
            else break;
        a = a.join("/");
      }
      return a;
    }
    function h(a, d) {
      return function () {
        return c.apply(null, b.call(arguments, 0).concat([a, d]));
      };
    }
    function i(a) {
      return function (b) {
        return g(b, a);
      };
    }
    function j(b) {
      return function (c) {
        a[b] = c;
      };
    }
    function k(b, c) {
      var d,
        e,
        f = b.indexOf("!");
      return (
        f !== -1
          ? ((d = g(b.slice(0, f), c)),
            (b = b.slice(f + 1)),
            (e = a[d]),
            e && e.normalize ? (b = e.normalize(b, i(c))) : (b = g(b, c)))
          : (b = g(b, c)),
        { f: d ? d + "!" + b : b, n: b, p: e }
      );
    }
    function l(b, c, d, e) {
      var f = [],
        g,
        i,
        l,
        m,
        n,
        o;
      e || (e = b);
      if (typeof d == "function") {
        if (c)
          for (m = 0; m < c.length; m++)
            (o = k(c[m], e)),
              (l = o.f),
              l === "require"
                ? (f[m] = h(b))
                : l === "exports"
                ? ((f[m] = a[b] = {}), (g = !0))
                : l === "module"
                ? (i = f[m] = { id: b, uri: "", exports: a[b] })
                : l in a
                ? (f[m] = a[l])
                : o.p && (o.p.load(o.n, h(e, !0), j(l), {}), (f[m] = a[l]));
        (n = d.apply(a[b], f)),
          b &&
            (i && i.exports !== undefined
              ? (a[b] = i.exports)
              : g || (a[b] = n));
      } else b && (a[b] = d);
    }
    var a = {},
      b = [].slice,
      c;
    if (typeof f == "function") return;
    (d = c =
      function (b, d, e, f) {
        return typeof b == "string"
          ? a[k(b, d).f]
          : (b.splice || (d.splice ? ((b = d), (d = arguments[2])) : (b = [])),
            f
              ? l(null, b, d, e)
              : setTimeout(function () {
                  l(null, b, d, e);
                }, 15),
            c);
      }),
      (c.config = function () {
        return c;
      }),
      e || (e = c),
      (f = function (a, b, c) {
        b.splice || ((c = b), (b = [])), l(a, b, c);
      }),
      (f.amd = {});
  })(),
    f("almond", function () {}),
    f("lib/parse-js", ["require", "exports", "module"], function (a, b, c) {
      function r(a) {
        return q.letter.test(a);
      }
      function s(a) {
        return (a = a.charCodeAt(0)), a >= 48 && a <= 57;
      }
      function t(a) {
        return s(a) || r(a);
      }
      function u(a) {
        return q.non_spacing_mark.test(a) || q.space_combining_mark.test(a);
      }
      function v(a) {
        return q.connector_punctuation.test(a);
      }
      function w(a) {
        return a == "$" || a == "_" || r(a);
      }
      function x(a) {
        return w(a) || u(a) || s(a) || v(a) || a == "‌" || a == "‍";
      }
      function y(a) {
        if (i.test(a)) return parseInt(a.substr(2), 16);
        if (j.test(a)) return parseInt(a.substr(1), 8);
        if (k.test(a)) return parseFloat(a);
      }
      function z(a, b, c, d) {
        (this.message = a),
          (this.line = b),
          (this.col = c),
          (this.pos = d),
          (this.stack = new Error().stack);
      }
      function A(a, b, c, d) {
        throw new z(a, b, c, d);
      }
      function B(a, b, c) {
        return a.type == b && (c == null || a.value == c);
      }
      function D(a) {
        function c() {
          return b.text.charAt(b.pos);
        }
        function e(a, c) {
          var d = b.text.charAt(b.pos++);
          if (a && !d) throw C;
          return (
            d == "\n"
              ? ((b.newline_before = b.newline_before || !c),
                ++b.line,
                (b.col = 0))
              : ++b.col,
            d
          );
        }
        function i() {
          return !b.peek();
        }
        function j(a, c) {
          var d = b.text.indexOf(a, b.pos);
          if (c && d == -1) throw C;
          return d;
        }
        function k() {
          (b.tokline = b.line), (b.tokcol = b.col), (b.tokpos = b.pos);
        }
        function p(a, c, d) {
          b.regex_allowed =
            (a == "operator" && !S(F, c)) ||
            (a == "keyword" && S(f, c)) ||
            (a == "punc" && S(n, c));
          var e = {
            type: a,
            value: c,
            line: b.tokline,
            col: b.tokcol,
            pos: b.tokpos,
            nlb: b.newline_before,
          };
          return (
            d ||
              ((e.comments_before = b.comments_before),
              (b.comments_before = [])),
            (b.newline_before = !1),
            e
          );
        }
        function q() {
          while (S(m, c())) e();
        }
        function r(a) {
          var b = "",
            d = c(),
            f = 0;
          while (d && a(d, f++)) (b += e()), (d = c());
          return b;
        }
        function u(a) {
          A(a, b.tokline, b.tokcol, b.tokpos);
        }
        function v(a) {
          var b = !1,
            c = !1,
            d = !1,
            e = a == ".",
            f = r(function (f, g) {
              return f == "x" || f == "X"
                ? d
                  ? !1
                  : (d = !0)
                : !!d || (f != "E" && f != "e")
                ? f == "-"
                  ? c || (g == 0 && !a)
                    ? !0
                    : !1
                  : f == "+"
                  ? c
                  : ((c = !1), f == "." ? (!e && !d ? (e = !0) : !1) : t(f))
                : b
                ? !1
                : (b = c = !0);
            });
          a && (f = a + f);
          var g = y(f);
          if (!isNaN(g)) return p("num", g);
          u("Invalid syntax: " + f);
        }
        function z(a) {
          var b = e(!0, a);
          switch (b) {
            case "n":
              return "\n";
            case "r":
              return "\r";
            case "t":
              return "\t";
            case "b":
              return "\b";
            case "v":
              return "";
            case "f":
              return "\f";
            case "0":
              return "\0";
            case "x":
              return String.fromCharCode(B(2));
            case "u":
              return String.fromCharCode(B(4));
            case "\n":
              return "";
            default:
              return b;
          }
        }
        function B(a) {
          var b = 0;
          for (; a > 0; --a) {
            var c = parseInt(e(!0), 16);
            isNaN(c) && u("Invalid hex-character pattern in string"),
              (b = (b << 4) | c);
          }
          return b;
        }
        function D() {
          return N("Unterminated string constant", function () {
            var a = e(),
              b = "";
            for (;;) {
              var c = e(!0);
              if (c == "\\") {
                var d = 0,
                  f = null;
                (c = r(function (a) {
                  if (a >= "0" && a <= "7") {
                    if (!f) return (f = a), ++d;
                    if (f <= "3" && d <= 2) return ++d;
                    if (f >= "4" && d <= 1) return ++d;
                  }
                  return !1;
                })),
                  d > 0
                    ? (c = String.fromCharCode(parseInt(c, 8)))
                    : (c = z(!0));
              } else if (c == a) break;
              b += c;
            }
            return p("string", b);
          });
        }
        function E() {
          e();
          var a = j("\n"),
            c;
          return (
            a == -1
              ? ((c = b.text.substr(b.pos)), (b.pos = b.text.length))
              : ((c = b.text.substring(b.pos, a)), (b.pos = a)),
            p("comment1", c, !0)
          );
        }
        function G() {
          return (
            e(),
            N("Unterminated multiline comment", function () {
              var a = j("*/", !0),
                c = b.text.substring(b.pos, a),
                d = p("comment2", c, !0);
              return (
                (b.pos = a + 2),
                (b.line += c.split("\n").length - 1),
                (b.newline_before = c.indexOf("\n") >= 0),
                /^@cc_on/i.test(c) &&
                  (T("WARNING: at line " + b.line),
                  T('*** Found "conditional comment": ' + c),
                  T(
                    "*** UglifyJS DISCARDS ALL COMMENTS.  This means your code might no longer work properly in Internet Explorer."
                  )),
                d
              );
            })
          );
        }
        function H() {
          var a = !1,
            b = "",
            d;
          while ((d = c()) != null)
            if (!a)
              if (d == "\\") (a = !0), e();
              else if (x(d)) b += e();
              else break;
            else
              d != "u" && u("Expecting UnicodeEscapeSequence -- uXXXX"),
                (d = z()),
                x(d) ||
                  u(
                    "Unicode char: " +
                      d.charCodeAt(0) +
                      " is not valid in identifier"
                  ),
                (b += d),
                (a = !1);
          return b;
        }
        function I(a) {
          return N("Unterminated regular expression", function () {
            var b = !1,
              c,
              d = !1;
            while ((c = e(!0)))
              if (b) (a += "\\" + c), (b = !1);
              else if (c == "[") (d = !0), (a += c);
              else if (c == "]" && d) (d = !1), (a += c);
              else {
                if (c == "/" && !d) break;
                c == "\\" ? (b = !0) : (a += c);
              }
            var f = H();
            return p("regexp", [a, f]);
          });
        }
        function J(a) {
          function b(a) {
            if (!c()) return a;
            var d = a + c();
            return S(l, d) ? (e(), b(d)) : a;
          }
          return p("operator", b(a || e()));
        }
        function K() {
          e();
          var a = b.regex_allowed;
          switch (c()) {
            case "/":
              return b.comments_before.push(E()), (b.regex_allowed = a), O();
            case "*":
              return b.comments_before.push(G()), (b.regex_allowed = a), O();
          }
          return b.regex_allowed ? I("") : J("/");
        }
        function L() {
          return e(), s(c()) ? v(".") : p("punc", ".");
        }
        function M() {
          var a = H();
          return S(d, a)
            ? S(l, a)
              ? p("operator", a)
              : S(g, a)
              ? p("atom", a)
              : p("keyword", a)
            : p("name", a);
        }
        function N(a, b) {
          try {
            return b();
          } catch (c) {
            if (c === C) u(a);
            else throw c;
          }
        }
        function O(a) {
          if (a != null) return I(a);
          q(), k();
          var b = c();
          if (!b) return p("eof");
          if (s(b)) return v();
          if (b == '"' || b == "'") return D();
          if (S(o, b)) return p("punc", e());
          if (b == ".") return L();
          if (b == "/") return K();
          if (S(h, b)) return J();
          if (b == "\\" || w(b)) return M();
          u("Unexpected character '" + b + "'");
        }
        var b = {
          text: a
            .replace(/\r\n?|[\n\u2028\u2029]/g, "\n")
            .replace(/^\uFEFF/, ""),
          pos: 0,
          tokpos: 0,
          line: 0,
          tokline: 0,
          col: 0,
          tokcol: 0,
          newline_before: !1,
          regex_allowed: !1,
          comments_before: [],
        };
        return (
          (O.context = function (a) {
            return a && (b = a), b;
          }),
          O
        );
      }
      function K(a, b, c) {
        (this.name = a), (this.start = b), (this.end = c);
      }
      function L(a, b, c) {
        function e(a, b) {
          return B(d.token, a, b);
        }
        function f() {
          return d.peeked || (d.peeked = d.input());
        }
        function g() {
          return (
            (d.prev = d.token),
            d.peeked
              ? ((d.token = d.peeked), (d.peeked = null))
              : (d.token = d.input()),
            d.token
          );
        }
        function h() {
          return d.prev;
        }
        function i(a, b, c, e) {
          var f = d.input.context();
          A(
            a,
            b != null ? b : f.tokline,
            c != null ? c : f.tokcol,
            e != null ? e : f.tokpos
          );
        }
        function j(a, b) {
          i(b, a.line, a.col);
        }
        function k(a) {
          a == null && (a = d.token),
            j(a, "Unexpected token: " + a.type + " (" + a.value + ")");
        }
        function l(a, b) {
          if (e(a, b)) return g();
          j(d.token, "Unexpected token " + d.token.type + ", expected " + a);
        }
        function m(a) {
          return l("punc", a);
        }
        function n() {
          return !b && (d.token.nlb || e("eof") || e("punc", "}"));
        }
        function o() {
          e("punc", ";") ? g() : n() || k();
        }
        function p() {
          return P(arguments);
        }
        function q() {
          m("(");
          var a = bk();
          return m(")"), a;
        }
        function r(a, b, c) {
          return a instanceof K ? a : new K(a, b, c);
        }
        function s(a) {
          return c
            ? function () {
                var b = d.token,
                  c = a.apply(this, arguments);
                return (c[0] = r(c[0], b, h())), c;
              }
            : a;
        }
        function u(a) {
          d.labels.push(a);
          var c = d.token,
            e = t();
          return b && !S(I, e[0]) && k(c), d.labels.pop(), p("label", a, e);
        }
        function v() {
          return p("stat", N(bk, o));
        }
        function w(a) {
          var b;
          return (
            n() || (b = e("name") ? d.token.value : null),
            b != null
              ? (g(),
                R(b, d.labels) ||
                  i("Label " + b + " without matching loop or statement"))
              : d.in_loop == 0 && i(a + " not inside a loop or switch"),
            o(),
            p(a, b)
          );
        }
        function x() {
          m("(");
          var a = null;
          if (!e("punc", ";")) {
            a = e("keyword", "var") ? (g(), V(!0)) : bk(!0, !0);
            if (e("operator", "in")) return z(a);
          }
          return y(a);
        }
        function y(a) {
          m(";");
          var b = e("punc", ";") ? null : bk();
          m(";");
          var c = e("punc", ")") ? null : bk();
          return m(")"), p("for", a, b, c, bl(t));
        }
        function z(a) {
          var b = a[0] == "var" ? p("name", a[1][0]) : a;
          g();
          var c = bk();
          return m(")"), p("for-in", a, b, c, bl(t));
        }
        function L() {
          var a = q(),
            b = t(),
            c;
          return e("keyword", "else") && (g(), (c = t())), p("if", a, b, c);
        }
        function O() {
          m("{");
          var a = [];
          while (!e("punc", "}")) e("eof") && k(), a.push(t());
          return g(), a;
        }
        function T() {
          var a = O(),
            b,
            c;
          if (e("keyword", "catch")) {
            g(), m("("), e("name") || i("Name expected");
            var f = d.token.value;
            g(), m(")"), (b = [f, O()]);
          }
          return (
            e("keyword", "finally") && (g(), (c = O())),
            !b && !c && i("Missing catch/finally blocks"),
            p("try", a, b, c)
          );
        }
        function U(a) {
          var b = [];
          for (;;) {
            e("name") || k();
            var c = d.token.value;
            g(),
              e("operator", "=") ? (g(), b.push([c, bk(!1, a)])) : b.push([c]);
            if (!e("punc", ",")) break;
            g();
          }
          return b;
        }
        function V(a) {
          return p("var", U(a));
        }
        function W() {
          return p("const", U());
        }
        function X() {
          var a = Y(!1),
            b;
          return (
            e("punc", "(") ? (g(), (b = Z(")"))) : (b = []),
            bc(p("new", a, b), !0)
          );
        }
        function Z(a, b, c) {
          var d = !0,
            f = [];
          while (!e("punc", a)) {
            d ? (d = !1) : m(",");
            if (b && e("punc", a)) break;
            e("punc", ",") && c
              ? f.push(["atom", "undefined"])
              : f.push(bk(!1));
          }
          return g(), f;
        }
        function $() {
          return p("array", Z("]", !b, !0));
        }
        function _() {
          var a = !0,
            c = [];
          while (!e("punc", "}")) {
            a ? (a = !1) : m(",");
            if (!b && e("punc", "}")) break;
            var f = d.token.type,
              h = ba();
            f != "name" || (h != "get" && h != "set") || !!e("punc", ":")
              ? (m(":"), c.push([h, bk(!1)]))
              : c.push([bb(), C(!1), h]);
          }
          return g(), p("object", c);
        }
        function ba() {
          switch (d.token.type) {
            case "num":
            case "string":
              return N(d.token.value, g);
          }
          return bb();
        }
        function bb() {
          switch (d.token.type) {
            case "name":
            case "operator":
            case "keyword":
            case "atom":
              return N(d.token.value, g);
            default:
              k();
          }
        }
        function bc(a, b) {
          return e("punc", ".")
            ? (g(), bc(p("dot", a, bb()), b))
            : e("punc", "[")
            ? (g(), bc(p("sub", a, N(bk, M(m, "]"))), b))
            : b && e("punc", "(")
            ? (g(), bc(p("call", a, Z(")")), !0))
            : a;
        }
        function bd(a) {
          if (e("operator") && S(E, d.token.value))
            return be("unary-prefix", N(d.token.value, g), bd(a));
          var b = Y(a);
          while (e("operator") && S(F, d.token.value) && !d.token.nlb)
            (b = be("unary-postfix", d.token.value, b)), g();
          return b;
        }
        function be(a, b, c) {
          return (
            (b == "++" || b == "--") &&
              !bi(c) &&
              i("Invalid use of " + b + " operator"),
            p(a, b, c)
          );
        }
        function bf(a, b, c) {
          var f = e("operator") ? d.token.value : null;
          f && f == "in" && c && (f = null);
          var h = f != null ? H[f] : null;
          if (h != null && h > b) {
            g();
            var i = bf(bd(!0), h, c);
            return bf(p("binary", f, a, i), b, c);
          }
          return a;
        }
        function bg(a) {
          return bf(bd(!0), 0, a);
        }
        function bh(a) {
          var b = bg(a);
          if (e("operator", "?")) {
            g();
            var c = bk(!1);
            return m(":"), p("conditional", b, c, bk(!1, a));
          }
          return b;
        }
        function bi(a) {
          if (!b) return !0;
          switch (a[0] + "") {
            case "dot":
            case "sub":
            case "new":
            case "call":
              return !0;
            case "name":
              return a[1] != "this";
          }
        }
        function bj(a) {
          var b = bh(a),
            c = d.token.value;
          if (e("operator") && S(G, c)) {
            if (bi(b)) return g(), p("assign", G[c], b, bj(a));
            i("Invalid assignment");
          }
          return b;
        }
        function bl(a) {
          try {
            return ++d.in_loop, a();
          } finally {
            --d.in_loop;
          }
        }
        var d = {
          input: typeof a == "string" ? D(a, !0) : a,
          token: null,
          prev: null,
          peeked: null,
          in_function: 0,
          in_loop: 0,
          labels: [],
        };
        d.token = g();
        var t = s(function () {
            if (e("operator", "/") || e("operator", "/="))
              (d.peeked = null), (d.token = d.input(d.token.value.substr(1)));
            switch (d.token.type) {
              case "num":
              case "string":
              case "regexp":
              case "operator":
              case "atom":
                return v();
              case "name":
                return B(f(), "punc", ":") ? u(N(d.token.value, g, g)) : v();
              case "punc":
                switch (d.token.value) {
                  case "{":
                    return p("block", O());
                  case "[":
                  case "(":
                    return v();
                  case ";":
                    return g(), p("block");
                  default:
                    k();
                }
              case "keyword":
                switch (N(d.token.value, g)) {
                  case "break":
                    return w("break");
                  case "continue":
                    return w("continue");
                  case "debugger":
                    return o(), p("debugger");
                  case "do":
                    return (function (a) {
                      return l("keyword", "while"), p("do", N(q, o), a);
                    })(bl(t));
                  case "for":
                    return x();
                  case "function":
                    return C(!0);
                  case "if":
                    return L();
                  case "return":
                    return (
                      d.in_function == 0 && i("'return' outside of function"),
                      p(
                        "return",
                        e("punc", ";") ? (g(), null) : n() ? null : N(bk, o)
                      )
                    );
                  case "switch":
                    return p("switch", q(), Q());
                  case "throw":
                    return (
                      d.token.nlb && i("Illegal newline after 'throw'"),
                      p("throw", N(bk, o))
                    );
                  case "try":
                    return T();
                  case "var":
                    return N(V, o);
                  case "const":
                    return N(W, o);
                  case "while":
                    return p("while", q(), bl(t));
                  case "with":
                    return p("with", q(), t());
                  default:
                    k();
                }
            }
          }),
          C = s(function (a) {
            var b = e("name") ? N(d.token.value, g) : null;
            return (
              a && !b && k(),
              m("("),
              p(
                a ? "defun" : "function",
                b,
                (function (a, b) {
                  while (!e("punc", ")"))
                    a ? (a = !1) : m(","),
                      e("name") || k(),
                      b.push(d.token.value),
                      g();
                  return g(), b;
                })(!0, []),
                (function () {
                  ++d.in_function;
                  var a = d.in_loop;
                  d.in_loop = 0;
                  var b = O();
                  return --d.in_function, (d.in_loop = a), b;
                })()
              )
            );
          }),
          Q = M(bl, function () {
            m("{");
            var a = [],
              b = null;
            while (!e("punc", "}"))
              e("eof") && k(),
                e("keyword", "case")
                  ? (g(), (b = []), a.push([bk(), b]), m(":"))
                  : e("keyword", "default")
                  ? (g(), m(":"), (b = []), a.push([null, b]))
                  : (b || k(), b.push(t()));
            return g(), a;
          }),
          Y = s(function (a) {
            if (e("operator", "new")) return g(), X();
            if (e("punc")) {
              switch (d.token.value) {
                case "(":
                  return g(), bc(N(bk, M(m, ")")), a);
                case "[":
                  return g(), bc($(), a);
                case "{":
                  return g(), bc(_(), a);
              }
              k();
            }
            if (e("keyword", "function")) return g(), bc(C(!1), a);
            if (S(J, d.token.type)) {
              var b =
                d.token.type == "regexp"
                  ? p("regexp", d.token.value[0], d.token.value[1])
                  : p(d.token.type, d.token.value);
              return bc(N(b, g), a);
            }
            k();
          }),
          bk = s(function (a, b) {
            arguments.length == 0 && (a = !0);
            var c = bj(b);
            return a && e("punc", ",") ? (g(), p("seq", c, bk(!0, b))) : c;
          });
        return p(
          "toplevel",
          (function (a) {
            while (!e("eof")) a.push(t());
            return a;
          })([])
        );
      }
      function M(a) {
        var b = P(arguments, 1);
        return function () {
          return a.apply(this, b.concat(P(arguments)));
        };
      }
      function N(a) {
        a instanceof Function && (a = a());
        for (var b = 1, c = arguments.length; --c > 0; ++b) arguments[b]();
        return a;
      }
      function O(a) {
        var b = {};
        for (var c = 0; c < a.length; ++c) b[a[c]] = !0;
        return b;
      }
      function P(a, b) {
        return Array.prototype.slice.call(a, b || 0);
      }
      function Q(a) {
        return a.split("");
      }
      function R(a, b) {
        for (var c = b.length; --c >= 0; ) if (b[c] === a) return !0;
        return !1;
      }
      function S(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
      }
      var d = O([
          "break",
          "case",
          "catch",
          "const",
          "continue",
          "default",
          "delete",
          "do",
          "else",
          "finally",
          "for",
          "function",
          "if",
          "in",
          "instanceof",
          "new",
          "return",
          "switch",
          "throw",
          "try",
          "typeof",
          "var",
          "void",
          "while",
          "with",
        ]),
        e = O([
          "abstract",
          "boolean",
          "byte",
          "char",
          "class",
          "debugger",
          "double",
          "enum",
          "export",
          "extends",
          "final",
          "float",
          "goto",
          "implements",
          "import",
          "int",
          "interface",
          "long",
          "native",
          "package",
          "private",
          "protected",
          "public",
          "short",
          "static",
          "super",
          "synchronized",
          "throws",
          "transient",
          "volatile",
        ]),
        f = O(["return", "new", "delete", "throw", "else", "case"]),
        g = O(["false", "null", "true", "undefined"]),
        h = O(Q("+-*&%=<>!?|~^")),
        i = /^0x[0-9a-f]+$/i,
        j = /^0[0-7]+$/,
        k = /^\d*\.?\d*(?:e[+-]?\d*(?:\d\.?|\.?\d)\d*)?$/i,
        l = O([
          "in",
          "instanceof",
          "typeof",
          "new",
          "void",
          "delete",
          "++",
          "--",
          "+",
          "-",
          "!",
          "~",
          "&",
          "|",
          "^",
          "*",
          "/",
          "%",
          ">>",
          "<<",
          ">>>",
          "<",
          ">",
          "<=",
          ">=",
          "==",
          "===",
          "!=",
          "!==",
          "?",
          "=",
          "+=",
          "-=",
          "/=",
          "*=",
          "%=",
          ">>=",
          "<<=",
          ">>>=",
          "|=",
          "^=",
          "&=",
          "&&",
          "||",
        ]),
        m = O(Q("  \n\r\t\f​᠎             　")),
        n = O(Q("[{}(,.;:")),
        o = O(Q("[]{}(),;:")),
        p = O(Q("gmsiy")),
        q = {
          letter: new RegExp(
            "[\\u0041-\\u005A\\u0061-\\u007A\\u00AA\\u00B5\\u00BA\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02C1\\u02C6-\\u02D1\\u02E0-\\u02E4\\u02EC\\u02EE\\u0370-\\u0374\\u0376\\u0377\\u037A-\\u037D\\u0386\\u0388-\\u038A\\u038C\\u038E-\\u03A1\\u03A3-\\u03F5\\u03F7-\\u0481\\u048A-\\u0523\\u0531-\\u0556\\u0559\\u0561-\\u0587\\u05D0-\\u05EA\\u05F0-\\u05F2\\u0621-\\u064A\\u066E\\u066F\\u0671-\\u06D3\\u06D5\\u06E5\\u06E6\\u06EE\\u06EF\\u06FA-\\u06FC\\u06FF\\u0710\\u0712-\\u072F\\u074D-\\u07A5\\u07B1\\u07CA-\\u07EA\\u07F4\\u07F5\\u07FA\\u0904-\\u0939\\u093D\\u0950\\u0958-\\u0961\\u0971\\u0972\\u097B-\\u097F\\u0985-\\u098C\\u098F\\u0990\\u0993-\\u09A8\\u09AA-\\u09B0\\u09B2\\u09B6-\\u09B9\\u09BD\\u09CE\\u09DC\\u09DD\\u09DF-\\u09E1\\u09F0\\u09F1\\u0A05-\\u0A0A\\u0A0F\\u0A10\\u0A13-\\u0A28\\u0A2A-\\u0A30\\u0A32\\u0A33\\u0A35\\u0A36\\u0A38\\u0A39\\u0A59-\\u0A5C\\u0A5E\\u0A72-\\u0A74\\u0A85-\\u0A8D\\u0A8F-\\u0A91\\u0A93-\\u0AA8\\u0AAA-\\u0AB0\\u0AB2\\u0AB3\\u0AB5-\\u0AB9\\u0ABD\\u0AD0\\u0AE0\\u0AE1\\u0B05-\\u0B0C\\u0B0F\\u0B10\\u0B13-\\u0B28\\u0B2A-\\u0B30\\u0B32\\u0B33\\u0B35-\\u0B39\\u0B3D\\u0B5C\\u0B5D\\u0B5F-\\u0B61\\u0B71\\u0B83\\u0B85-\\u0B8A\\u0B8E-\\u0B90\\u0B92-\\u0B95\\u0B99\\u0B9A\\u0B9C\\u0B9E\\u0B9F\\u0BA3\\u0BA4\\u0BA8-\\u0BAA\\u0BAE-\\u0BB9\\u0BD0\\u0C05-\\u0C0C\\u0C0E-\\u0C10\\u0C12-\\u0C28\\u0C2A-\\u0C33\\u0C35-\\u0C39\\u0C3D\\u0C58\\u0C59\\u0C60\\u0C61\\u0C85-\\u0C8C\\u0C8E-\\u0C90\\u0C92-\\u0CA8\\u0CAA-\\u0CB3\\u0CB5-\\u0CB9\\u0CBD\\u0CDE\\u0CE0\\u0CE1\\u0D05-\\u0D0C\\u0D0E-\\u0D10\\u0D12-\\u0D28\\u0D2A-\\u0D39\\u0D3D\\u0D60\\u0D61\\u0D7A-\\u0D7F\\u0D85-\\u0D96\\u0D9A-\\u0DB1\\u0DB3-\\u0DBB\\u0DBD\\u0DC0-\\u0DC6\\u0E01-\\u0E30\\u0E32\\u0E33\\u0E40-\\u0E46\\u0E81\\u0E82\\u0E84\\u0E87\\u0E88\\u0E8A\\u0E8D\\u0E94-\\u0E97\\u0E99-\\u0E9F\\u0EA1-\\u0EA3\\u0EA5\\u0EA7\\u0EAA\\u0EAB\\u0EAD-\\u0EB0\\u0EB2\\u0EB3\\u0EBD\\u0EC0-\\u0EC4\\u0EC6\\u0EDC\\u0EDD\\u0F00\\u0F40-\\u0F47\\u0F49-\\u0F6C\\u0F88-\\u0F8B\\u1000-\\u102A\\u103F\\u1050-\\u1055\\u105A-\\u105D\\u1061\\u1065\\u1066\\u106E-\\u1070\\u1075-\\u1081\\u108E\\u10A0-\\u10C5\\u10D0-\\u10FA\\u10FC\\u1100-\\u1159\\u115F-\\u11A2\\u11A8-\\u11F9\\u1200-\\u1248\\u124A-\\u124D\\u1250-\\u1256\\u1258\\u125A-\\u125D\\u1260-\\u1288\\u128A-\\u128D\\u1290-\\u12B0\\u12B2-\\u12B5\\u12B8-\\u12BE\\u12C0\\u12C2-\\u12C5\\u12C8-\\u12D6\\u12D8-\\u1310\\u1312-\\u1315\\u1318-\\u135A\\u1380-\\u138F\\u13A0-\\u13F4\\u1401-\\u166C\\u166F-\\u1676\\u1681-\\u169A\\u16A0-\\u16EA\\u1700-\\u170C\\u170E-\\u1711\\u1720-\\u1731\\u1740-\\u1751\\u1760-\\u176C\\u176E-\\u1770\\u1780-\\u17B3\\u17D7\\u17DC\\u1820-\\u1877\\u1880-\\u18A8\\u18AA\\u1900-\\u191C\\u1950-\\u196D\\u1970-\\u1974\\u1980-\\u19A9\\u19C1-\\u19C7\\u1A00-\\u1A16\\u1B05-\\u1B33\\u1B45-\\u1B4B\\u1B83-\\u1BA0\\u1BAE\\u1BAF\\u1C00-\\u1C23\\u1C4D-\\u1C4F\\u1C5A-\\u1C7D\\u1D00-\\u1DBF\\u1E00-\\u1F15\\u1F18-\\u1F1D\\u1F20-\\u1F45\\u1F48-\\u1F4D\\u1F50-\\u1F57\\u1F59\\u1F5B\\u1F5D\\u1F5F-\\u1F7D\\u1F80-\\u1FB4\\u1FB6-\\u1FBC\\u1FBE\\u1FC2-\\u1FC4\\u1FC6-\\u1FCC\\u1FD0-\\u1FD3\\u1FD6-\\u1FDB\\u1FE0-\\u1FEC\\u1FF2-\\u1FF4\\u1FF6-\\u1FFC\\u2071\\u207F\\u2090-\\u2094\\u2102\\u2107\\u210A-\\u2113\\u2115\\u2119-\\u211D\\u2124\\u2126\\u2128\\u212A-\\u212D\\u212F-\\u2139\\u213C-\\u213F\\u2145-\\u2149\\u214E\\u2183\\u2184\\u2C00-\\u2C2E\\u2C30-\\u2C5E\\u2C60-\\u2C6F\\u2C71-\\u2C7D\\u2C80-\\u2CE4\\u2D00-\\u2D25\\u2D30-\\u2D65\\u2D6F\\u2D80-\\u2D96\\u2DA0-\\u2DA6\\u2DA8-\\u2DAE\\u2DB0-\\u2DB6\\u2DB8-\\u2DBE\\u2DC0-\\u2DC6\\u2DC8-\\u2DCE\\u2DD0-\\u2DD6\\u2DD8-\\u2DDE\\u2E2F\\u3005\\u3006\\u3031-\\u3035\\u303B\\u303C\\u3041-\\u3096\\u309D-\\u309F\\u30A1-\\u30FA\\u30FC-\\u30FF\\u3105-\\u312D\\u3131-\\u318E\\u31A0-\\u31B7\\u31F0-\\u31FF\\u3400\\u4DB5\\u4E00\\u9FC3\\uA000-\\uA48C\\uA500-\\uA60C\\uA610-\\uA61F\\uA62A\\uA62B\\uA640-\\uA65F\\uA662-\\uA66E\\uA67F-\\uA697\\uA717-\\uA71F\\uA722-\\uA788\\uA78B\\uA78C\\uA7FB-\\uA801\\uA803-\\uA805\\uA807-\\uA80A\\uA80C-\\uA822\\uA840-\\uA873\\uA882-\\uA8B3\\uA90A-\\uA925\\uA930-\\uA946\\uAA00-\\uAA28\\uAA40-\\uAA42\\uAA44-\\uAA4B\\uAC00\\uD7A3\\uF900-\\uFA2D\\uFA30-\\uFA6A\\uFA70-\\uFAD9\\uFB00-\\uFB06\\uFB13-\\uFB17\\uFB1D\\uFB1F-\\uFB28\\uFB2A-\\uFB36\\uFB38-\\uFB3C\\uFB3E\\uFB40\\uFB41\\uFB43\\uFB44\\uFB46-\\uFBB1\\uFBD3-\\uFD3D\\uFD50-\\uFD8F\\uFD92-\\uFDC7\\uFDF0-\\uFDFB\\uFE70-\\uFE74\\uFE76-\\uFEFC\\uFF21-\\uFF3A\\uFF41-\\uFF5A\\uFF66-\\uFFBE\\uFFC2-\\uFFC7\\uFFCA-\\uFFCF\\uFFD2-\\uFFD7\\uFFDA-\\uFFDC]"
          ),
          non_spacing_mark: new RegExp(
            "[\\u0300-\\u036F\\u0483-\\u0487\\u0591-\\u05BD\\u05BF\\u05C1\\u05C2\\u05C4\\u05C5\\u05C7\\u0610-\\u061A\\u064B-\\u065E\\u0670\\u06D6-\\u06DC\\u06DF-\\u06E4\\u06E7\\u06E8\\u06EA-\\u06ED\\u0711\\u0730-\\u074A\\u07A6-\\u07B0\\u07EB-\\u07F3\\u0816-\\u0819\\u081B-\\u0823\\u0825-\\u0827\\u0829-\\u082D\\u0900-\\u0902\\u093C\\u0941-\\u0948\\u094D\\u0951-\\u0955\\u0962\\u0963\\u0981\\u09BC\\u09C1-\\u09C4\\u09CD\\u09E2\\u09E3\\u0A01\\u0A02\\u0A3C\\u0A41\\u0A42\\u0A47\\u0A48\\u0A4B-\\u0A4D\\u0A51\\u0A70\\u0A71\\u0A75\\u0A81\\u0A82\\u0ABC\\u0AC1-\\u0AC5\\u0AC7\\u0AC8\\u0ACD\\u0AE2\\u0AE3\\u0B01\\u0B3C\\u0B3F\\u0B41-\\u0B44\\u0B4D\\u0B56\\u0B62\\u0B63\\u0B82\\u0BC0\\u0BCD\\u0C3E-\\u0C40\\u0C46-\\u0C48\\u0C4A-\\u0C4D\\u0C55\\u0C56\\u0C62\\u0C63\\u0CBC\\u0CBF\\u0CC6\\u0CCC\\u0CCD\\u0CE2\\u0CE3\\u0D41-\\u0D44\\u0D4D\\u0D62\\u0D63\\u0DCA\\u0DD2-\\u0DD4\\u0DD6\\u0E31\\u0E34-\\u0E3A\\u0E47-\\u0E4E\\u0EB1\\u0EB4-\\u0EB9\\u0EBB\\u0EBC\\u0EC8-\\u0ECD\\u0F18\\u0F19\\u0F35\\u0F37\\u0F39\\u0F71-\\u0F7E\\u0F80-\\u0F84\\u0F86\\u0F87\\u0F90-\\u0F97\\u0F99-\\u0FBC\\u0FC6\\u102D-\\u1030\\u1032-\\u1037\\u1039\\u103A\\u103D\\u103E\\u1058\\u1059\\u105E-\\u1060\\u1071-\\u1074\\u1082\\u1085\\u1086\\u108D\\u109D\\u135F\\u1712-\\u1714\\u1732-\\u1734\\u1752\\u1753\\u1772\\u1773\\u17B7-\\u17BD\\u17C6\\u17C9-\\u17D3\\u17DD\\u180B-\\u180D\\u18A9\\u1920-\\u1922\\u1927\\u1928\\u1932\\u1939-\\u193B\\u1A17\\u1A18\\u1A56\\u1A58-\\u1A5E\\u1A60\\u1A62\\u1A65-\\u1A6C\\u1A73-\\u1A7C\\u1A7F\\u1B00-\\u1B03\\u1B34\\u1B36-\\u1B3A\\u1B3C\\u1B42\\u1B6B-\\u1B73\\u1B80\\u1B81\\u1BA2-\\u1BA5\\u1BA8\\u1BA9\\u1C2C-\\u1C33\\u1C36\\u1C37\\u1CD0-\\u1CD2\\u1CD4-\\u1CE0\\u1CE2-\\u1CE8\\u1CED\\u1DC0-\\u1DE6\\u1DFD-\\u1DFF\\u20D0-\\u20DC\\u20E1\\u20E5-\\u20F0\\u2CEF-\\u2CF1\\u2DE0-\\u2DFF\\u302A-\\u302F\\u3099\\u309A\\uA66F\\uA67C\\uA67D\\uA6F0\\uA6F1\\uA802\\uA806\\uA80B\\uA825\\uA826\\uA8C4\\uA8E0-\\uA8F1\\uA926-\\uA92D\\uA947-\\uA951\\uA980-\\uA982\\uA9B3\\uA9B6-\\uA9B9\\uA9BC\\uAA29-\\uAA2E\\uAA31\\uAA32\\uAA35\\uAA36\\uAA43\\uAA4C\\uAAB0\\uAAB2-\\uAAB4\\uAAB7\\uAAB8\\uAABE\\uAABF\\uAAC1\\uABE5\\uABE8\\uABED\\uFB1E\\uFE00-\\uFE0F\\uFE20-\\uFE26]"
          ),
          space_combining_mark: new RegExp(
            "[\\u0903\\u093E-\\u0940\\u0949-\\u094C\\u094E\\u0982\\u0983\\u09BE-\\u09C0\\u09C7\\u09C8\\u09CB\\u09CC\\u09D7\\u0A03\\u0A3E-\\u0A40\\u0A83\\u0ABE-\\u0AC0\\u0AC9\\u0ACB\\u0ACC\\u0B02\\u0B03\\u0B3E\\u0B40\\u0B47\\u0B48\\u0B4B\\u0B4C\\u0B57\\u0BBE\\u0BBF\\u0BC1\\u0BC2\\u0BC6-\\u0BC8\\u0BCA-\\u0BCC\\u0BD7\\u0C01-\\u0C03\\u0C41-\\u0C44\\u0C82\\u0C83\\u0CBE\\u0CC0-\\u0CC4\\u0CC7\\u0CC8\\u0CCA\\u0CCB\\u0CD5\\u0CD6\\u0D02\\u0D03\\u0D3E-\\u0D40\\u0D46-\\u0D48\\u0D4A-\\u0D4C\\u0D57\\u0D82\\u0D83\\u0DCF-\\u0DD1\\u0DD8-\\u0DDF\\u0DF2\\u0DF3\\u0F3E\\u0F3F\\u0F7F\\u102B\\u102C\\u1031\\u1038\\u103B\\u103C\\u1056\\u1057\\u1062-\\u1064\\u1067-\\u106D\\u1083\\u1084\\u1087-\\u108C\\u108F\\u109A-\\u109C\\u17B6\\u17BE-\\u17C5\\u17C7\\u17C8\\u1923-\\u1926\\u1929-\\u192B\\u1930\\u1931\\u1933-\\u1938\\u19B0-\\u19C0\\u19C8\\u19C9\\u1A19-\\u1A1B\\u1A55\\u1A57\\u1A61\\u1A63\\u1A64\\u1A6D-\\u1A72\\u1B04\\u1B35\\u1B3B\\u1B3D-\\u1B41\\u1B43\\u1B44\\u1B82\\u1BA1\\u1BA6\\u1BA7\\u1BAA\\u1C24-\\u1C2B\\u1C34\\u1C35\\u1CE1\\u1CF2\\uA823\\uA824\\uA827\\uA880\\uA881\\uA8B4-\\uA8C3\\uA952\\uA953\\uA983\\uA9B4\\uA9B5\\uA9BA\\uA9BB\\uA9BD-\\uA9C0\\uAA2F\\uAA30\\uAA33\\uAA34\\uAA4D\\uAA7B\\uABE3\\uABE4\\uABE6\\uABE7\\uABE9\\uABEA\\uABEC]"
          ),
          connector_punctuation: new RegExp(
            "[\\u005F\\u203F\\u2040\\u2054\\uFE33\\uFE34\\uFE4D-\\uFE4F\\uFF3F]"
          ),
        };
      z.prototype.toString = function () {
        return (
          this.message +
          " (line: " +
          this.line +
          ", col: " +
          this.col +
          ", pos: " +
          this.pos +
          ")" +
          "\n\n" +
          this.stack
        );
      };
      var C = {},
        E = O(["typeof", "void", "delete", "--", "++", "!", "~", "-", "+"]),
        F = O(["--", "++"]),
        G = (function (a, b, c) {
          while (c < a.length) (b[a[c]] = a[c].substr(0, a[c].length - 1)), c++;
          return b;
        })(
          [
            "+=",
            "-=",
            "/=",
            "*=",
            "%=",
            ">>=",
            "<<=",
            ">>>=",
            "|=",
            "^=",
            "&=",
          ],
          { "=": !0 },
          0
        ),
        H = (function (a, b) {
          for (var c = 0, d = 1; c < a.length; ++c, ++d) {
            var e = a[c];
            for (var f = 0; f < e.length; ++f) b[e[f]] = d;
          }
          return b;
        })(
          [
            ["||"],
            ["&&"],
            ["|"],
            ["^"],
            ["&"],
            ["==", "===", "!=", "!=="],
            ["<", ">", "<=", ">=", "in", "instanceof"],
            [">>", "<<", ">>>"],
            ["+", "-"],
            ["*", "/", "%"],
          ],
          {}
        ),
        I = O(["for", "do", "while", "switch"]),
        J = O(["atom", "num", "string", "regexp", "name"]);
      K.prototype.toString = function () {
        return this.name;
      };
      var T = function () {};
      (b.tokenizer = D),
        (b.parse = L),
        (b.slice = P),
        (b.curry = M),
        (b.member = R),
        (b.array_to_hash = O),
        (b.PRECEDENCE = H),
        (b.KEYWORDS_ATOM = g),
        (b.RESERVED_WORDS = e),
        (b.KEYWORDS = d),
        (b.ATOMIC_START_TOKEN = J),
        (b.OPERATORS = l),
        (b.is_alphanumeric_char = t),
        (b.set_logger = function (a) {
          T = a;
        });
    }),
    f(
      "lib/process",
      ["require", "exports", "module", "./parse-js"],
      function (a, b, c) {
        function i() {
          function a(a) {
            return [
              this[0],
              K(a, function (a) {
                var b = [a[0]];
                return a.length > 1 && (b[1] = g(a[1])), b;
              }),
            ];
          }
          function b(a) {
            var b = [this[0]];
            return a != null && b.push(K(a, g)), b;
          }
          function g(a) {
            if (a == null) return null;
            try {
              f.push(a);
              var b = a[0],
                e = d[b];
              if (e) {
                var g = e.apply(a, a.slice(1));
                if (g != null) return g;
              }
              return (e = c[b]), e.apply(a, a.slice(1));
            } finally {
              f.pop();
            }
          }
          function h(a) {
            if (a == null) return null;
            try {
              return f.push(a), c[a[0]].apply(a, a.slice(1));
            } finally {
              f.pop();
            }
          }
          function i(a, b) {
            var c = {},
              e;
            for (e in a) J(a, e) && ((c[e] = d[e]), (d[e] = a[e]));
            var f = b();
            for (e in c) J(c, e) && (c[e] ? (d[e] = c[e]) : delete d[e]);
            return f;
          }
          var c = {
              string: function (a) {
                return [this[0], a];
              },
              num: function (a) {
                return [this[0], a];
              },
              name: function (a) {
                return [this[0], a];
              },
              toplevel: function (a) {
                return [this[0], K(a, g)];
              },
              block: b,
              splice: b,
              var: a,
              const: a,
              try: function (a, b, c) {
                return [
                  this[0],
                  K(a, g),
                  b != null ? [b[0], K(b[1], g)] : null,
                  c != null ? K(c, g) : null,
                ];
              },
              throw: function (a) {
                return [this[0], g(a)];
              },
              new: function (a, b) {
                return [this[0], g(a), K(b, g)];
              },
              switch: function (a, b) {
                return [
                  this[0],
                  g(a),
                  K(b, function (a) {
                    return [a[0] ? g(a[0]) : null, K(a[1], g)];
                  }),
                ];
              },
              break: function (a) {
                return [this[0], a];
              },
              continue: function (a) {
                return [this[0], a];
              },
              conditional: function (a, b, c) {
                return [this[0], g(a), g(b), g(c)];
              },
              assign: function (a, b, c) {
                return [this[0], a, g(b), g(c)];
              },
              dot: function (a) {
                return [this[0], g(a)].concat(e(arguments, 1));
              },
              call: function (a, b) {
                return [this[0], g(a), K(b, g)];
              },
              function: function (a, b, c) {
                return [this[0], a, b.slice(), K(c, g)];
              },
              defun: function (a, b, c) {
                return [this[0], a, b.slice(), K(c, g)];
              },
              if: function (a, b, c) {
                return [this[0], g(a), g(b), g(c)];
              },
              for: function (a, b, c, d) {
                return [this[0], g(a), g(b), g(c), g(d)];
              },
              "for-in": function (a, b, c, d) {
                return [this[0], g(a), g(b), g(c), g(d)];
              },
              while: function (a, b) {
                return [this[0], g(a), g(b)];
              },
              do: function (a, b) {
                return [this[0], g(a), g(b)];
              },
              return: function (a) {
                return [this[0], g(a)];
              },
              binary: function (a, b, c) {
                return [this[0], a, g(b), g(c)];
              },
              "unary-prefix": function (a, b) {
                return [this[0], a, g(b)];
              },
              "unary-postfix": function (a, b) {
                return [this[0], a, g(b)];
              },
              sub: function (a, b) {
                return [this[0], g(a), g(b)];
              },
              object: function (a) {
                return [
                  this[0],
                  K(a, function (a) {
                    return a.length == 2
                      ? [a[0], g(a[1])]
                      : [a[0], g(a[1]), a[2]];
                  }),
                ];
              },
              regexp: function (a, b) {
                return [this[0], a, b];
              },
              array: function (a) {
                return [this[0], K(a, g)];
              },
              stat: function (a) {
                return [this[0], g(a)];
              },
              seq: function () {
                return [this[0]].concat(K(e(arguments), g));
              },
              label: function (a, b) {
                return [this[0], a, g(b)];
              },
              with: function (a, b) {
                return [this[0], g(a), g(b)];
              },
              atom: function (a) {
                return [this[0], a];
              },
            },
            d = {},
            f = [];
          return {
            walk: g,
            dive: h,
            with_walkers: i,
            parent: function () {
              return f[f.length - 2];
            },
            stack: function () {
              return f;
            },
          };
        }
        function j(a) {
          (this.names = {}),
            (this.mangled = {}),
            (this.rev_mangled = {}),
            (this.cname = -1),
            (this.refs = {}),
            (this.uses_with = !1),
            (this.uses_eval = !1),
            (this.parent = a),
            (this.children = []),
            a
              ? ((this.level = a.level + 1), a.children.push(this))
              : (this.level = 0);
        }
        function l(a) {
          function f(a) {
            b = new j(b);
            var c = (b.body = a());
            return (c.scope = b), (b = b.parent), c;
          }
          function g(a, c) {
            return b.define(a, c);
          }
          function h(a) {
            b.refs[a] = !0;
          }
          function k(a, b, c) {
            var e = this[0] == "defun";
            return [
              this[0],
              e ? g(a, "defun") : a,
              b,
              f(function () {
                return (
                  e || g(a, "lambda"),
                  K(b, function (a) {
                    g(a, "arg");
                  }),
                  K(c, d)
                );
              }),
            ];
          }
          function l(a) {
            return function (b) {
              K(b, function (b) {
                g(b[0], a), b[1] && h(b[0]);
              });
            };
          }
          var b = null,
            c = i(),
            d = c.walk,
            e = [];
          return f(function () {
            function i(a, b) {
              for (b = a.children.length; --b >= 0; ) i(a.children[b]);
              for (b in a.refs)
                if (J(a.refs, b))
                  for (var c = a.has(b), d = a; d; d = d.parent) {
                    d.refs[b] = c;
                    if (d === c) break;
                  }
            }
            var f = c.with_walkers(
              {
                function: k,
                defun: k,
                label: function (a, b) {
                  g(a, "label");
                },
                break: function (a) {
                  a && h(a);
                },
                continue: function (a) {
                  a && h(a);
                },
                with: function (a, c) {
                  for (var d = b; d; d = d.parent) d.uses_with = !0;
                },
                var: l("var"),
                const: l("const"),
                try: function (a, b, c) {
                  if (b != null)
                    return [
                      this[0],
                      K(a, d),
                      [g(b[0], "catch"), K(b[1], d)],
                      c != null ? K(c, d) : null,
                    ];
                },
                name: function (a) {
                  a == "eval" && e.push(b), h(a);
                },
              },
              function () {
                return d(a);
              }
            );
            return (
              K(e, function (a) {
                if (!a.has("eval"))
                  while (a) (a.uses_eval = !0), (a = a.parent);
              }),
              i(b),
              f
            );
          });
        }
        function m(a, b) {
          function g(a, c) {
            return !b.toplevel && !e.parent
              ? a
              : b.except && f(a, b.except)
              ? a
              : e.get_mangled(a, c);
          }
          function h(a) {
            if (b.defines)
              return !e.has(a) && J(b.defines, a) ? b.defines[a] : null;
          }
          function j(a, b, c) {
            var f = this[0] == "defun",
              h;
            return (
              a &&
                (f
                  ? (a = g(a))
                  : ((h = {}),
                    !e.uses_eval && !e.uses_with
                      ? (a = h[a] = e.next_mangled())
                      : (h[a] = a))),
              (c = k(
                c.scope,
                function () {
                  return (
                    (b = K(b, function (a) {
                      return g(a);
                    })),
                    K(c, d)
                  );
                },
                h
              )),
              [this[0], a, b, c]
            );
          }
          function k(a, b, c) {
            var d = e;
            e = a;
            if (c) for (var f in c) J(c, f) && a.set_mangle(f, c[f]);
            for (var f in a.names) J(a.names, f) && g(f, !0);
            var h = b();
            return (h.scope = a), (e = d), h;
          }
          function m(a) {
            return [
              this[0],
              K(a, function (a) {
                return [g(a[0]), d(a[1])];
              }),
            ];
          }
          var c = i(),
            d = c.walk,
            e;
          return (
            (b = b || {}),
            c.with_walkers(
              {
                function: j,
                defun: function () {
                  var a = j.apply(this, arguments);
                  switch (c.parent()[0]) {
                    case "toplevel":
                    case "function":
                    case "defun":
                      return K.at_top(a);
                  }
                  return a;
                },
                label: function (a, b) {
                  return [this[0], g(a), d(b)];
                },
                break: function (a) {
                  if (a) return [this[0], g(a)];
                },
                continue: function (a) {
                  if (a) return [this[0], g(a)];
                },
                var: m,
                const: m,
                name: function (a) {
                  return h(a) || [this[0], g(a)];
                },
                try: function (a, b, c) {
                  return [
                    this[0],
                    K(a, d),
                    b != null ? [g(b[0]), K(b[1], d)] : null,
                    c != null ? K(c, d) : null,
                  ];
                },
                toplevel: function (a) {
                  var b = this;
                  return k(b.scope, function () {
                    return [b[0], K(a, d)];
                  });
                },
              },
              function () {
                return d(l(a));
              }
            )
          );
        }
        function o(a, b) {
          return E(a).length > E(b[0] == "stat" ? b[1] : b).length ? b : a;
        }
        function p(a) {
          return a[0] == "block" && a[1] && a[1].length > 0
            ? a[1][a[1].length - 1]
            : a;
        }
        function q(a) {
          if (a)
            switch (p(a)[0]) {
              case "return":
              case "break":
              case "continue":
              case "throw":
                return !0;
            }
        }
        function r(a) {
          return (
            (a[0] == "unary-prefix" && f(a[1], ["!", "delete"])) ||
            (a[0] == "binary" &&
              f(a[1], [
                "in",
                "instanceof",
                "==",
                "!=",
                "===",
                "!==",
                "<",
                "<=",
                ">=",
                ">",
              ])) ||
            (a[0] == "binary" && f(a[1], ["&&", "||"]) && r(a[2]) && r(a[3])) ||
            (a[0] == "conditional" && r(a[2]) && r(a[3])) ||
            (a[0] == "assign" && a[1] === !0 && r(a[3])) ||
            (a[0] == "seq" && r(a[a.length - 1]))
          );
        }
        function s(a) {
          return !a || (a[0] == "block" && (!a[1] || a[1].length == 0));
        }
        function t(a) {
          return (
            a[0] == "string" ||
            (a[0] == "unary-prefix" && a[1] == "typeof") ||
            (a[0] == "binary" && a[1] == "+" && (t(a[2]) || t(a[3])))
          );
        }
        function v(a) {
          s(a) || n("Dropping unreachable code: " + E(a, !0));
        }
        function w(a) {
          function d(a) {
            a = K(a, c);
            for (var b = 0; b < a.length; ++b) {
              var e = a[b];
              if (e[0] != "if") continue;
              if (e[3] && c(e[3])) continue;
              var f = c(e[2]);
              if (!q(f)) continue;
              var g = c(e[1]),
                h = a.slice(b + 1),
                i = h.length == 1 ? h[0] : ["block", h],
                j = a.slice(0, b).concat([[e[0], g, f, i]]);
              return d(j);
            }
            return a;
          }
          function e(a, b, c) {
            return (c = d(c)), [this[0], a, b, c];
          }
          function f(a) {
            return [this[0], a != null ? d(a) : null];
          }
          var b = i(),
            c = b.walk;
          return b.with_walkers(
            {
              defun: e,
              function: e,
              block: f,
              splice: f,
              toplevel: function (a) {
                return [this[0], d(a)];
              },
              try: function (a, b, c) {
                return [
                  this[0],
                  d(a),
                  b != null ? [b[0], d(b[1])] : null,
                  c != null ? d(c) : null,
                ];
              },
            },
            function () {
              return c(a);
            }
          );
        }
        function x(a, b) {
          function g() {
            throw e;
          }
          function h() {
            throw f;
          }
          function j() {
            return b.call(this, this, c, g, h);
          }
          function k(a) {
            if (a == "++" || a == "--") return j.apply(this, arguments);
          }
          var c = i(),
            d = c.walk,
            e = {},
            f = {};
          return c.with_walkers(
            {
              try: j,
              throw: j,
              return: j,
              new: j,
              switch: j,
              break: j,
              continue: j,
              assign: j,
              call: j,
              if: j,
              for: j,
              "for-in": j,
              while: j,
              do: j,
              return: j,
              "unary-prefix": k,
              "unary-postfix": k,
              defun: j,
            },
            function () {
              for (;;)
                try {
                  d(a);
                  break;
                } catch (b) {
                  if (b === e) break;
                  if (b === f) continue;
                  throw b;
                }
            }
          );
        }
        function y(a) {
          function e(a, b) {
            var e = d;
            (d = b), (a = K(a, c));
            var f = {},
              g = K(b.names, function (a, c) {
                return a != "var"
                  ? K.skip
                  : b.references(c)
                  ? ((f[c] = !0), [c])
                  : K.skip;
              });
            return (
              g.length > 0 &&
                (x(["block", a], function (a, b, c, d) {
                  if (
                    a[0] == "assign" &&
                    a[1] === !0 &&
                    a[2][0] == "name" &&
                    J(f, a[2][1])
                  ) {
                    for (var e = g.length; --e >= 0; )
                      if (g[e][0] == a[2][1]) {
                        g[e][1] && c(),
                          (g[e][1] = a[3]),
                          g.push(g.splice(e, 1)[0]);
                        break;
                      }
                    var h = b.parent();
                    if (h[0] == "seq") {
                      var i = h[2];
                      i.unshift(0, h.length), h.splice.apply(h, i);
                    } else
                      h[0] == "stat" ? h.splice(0, h.length, "block") : c();
                    d();
                  }
                  c();
                }),
                a.unshift(["var", g])),
              (d = e),
              a
            );
          }
          function f(a) {
            var c = null;
            for (var d = a.length; --d >= 0; ) {
              var e = a[d];
              if (!e[1]) continue;
              (e = ["assign", !0, ["name", e[0]], e[1]]),
                c == null ? (c = e) : (c = ["seq", e, c]);
            }
            return c == null
              ? b.parent()[0] == "for-in"
                ? ["name", a[0][0]]
                : K.skip
              : ["stat", c];
          }
          function g(a) {
            return [this[0], e(a, this.scope)];
          }
          var b = i(),
            c = b.walk,
            d;
          return b.with_walkers(
            {
              function: function (a, b, c) {
                for (var d = b.length; --d >= 0 && !c.scope.references(b[d]); )
                  b.pop();
                return (
                  c.scope.references(a) || (a = null),
                  [this[0], a, b, e(c, c.scope)]
                );
              },
              defun: function (a, b, c) {
                if (!d.references(a)) return K.skip;
                for (var f = b.length; --f >= 0 && !c.scope.references(b[f]); )
                  b.pop();
                return [this[0], a, b, e(c, c.scope)];
              },
              var: f,
              toplevel: g,
            },
            function () {
              return c(l(a));
            }
          );
        }
        function z(a, b) {
          function h(a) {
            var c = ["unary-prefix", "!", a];
            switch (a[0]) {
              case "unary-prefix":
                return a[1] == "!" && r(a[2]) ? a[2] : c;
              case "seq":
                return (a = e(a)), (a[a.length - 1] = h(a[a.length - 1])), a;
              case "conditional":
                return o(c, ["conditional", a[1], h(a[2]), h(a[3])]);
              case "binary":
                var d = a[1],
                  f = a[2],
                  g = a[3];
                if (!b.keep_comps)
                  switch (d) {
                    case "<=":
                      return ["binary", ">", f, g];
                    case "<":
                      return ["binary", ">=", f, g];
                    case ">=":
                      return ["binary", "<", f, g];
                    case ">":
                      return ["binary", "<=", f, g];
                  }
                switch (d) {
                  case "==":
                    return ["binary", "!=", f, g];
                  case "!=":
                    return ["binary", "==", f, g];
                  case "===":
                    return ["binary", "!==", f, g];
                  case "!==":
                    return ["binary", "===", f, g];
                  case "&&":
                    return o(c, ["binary", "||", h(f), h(g)]);
                  case "||":
                    return o(c, ["binary", "&&", h(f), h(g)]);
                }
            }
            return c;
          }
          function j(a, b, c) {
            var d = function () {
              return a[0] == "unary-prefix" && a[1] == "!"
                ? c
                  ? ["conditional", a[2], c, b]
                  : ["binary", "||", a[2], b]
                : c
                ? o(["conditional", a, b, c], ["conditional", h(a), c, b])
                : ["binary", "&&", a, b];
            };
            return u(
              a,
              function (a, d) {
                return v(d ? c : b), d ? b : c;
              },
              d
            );
          }
          function k(a, b) {
            var c = g;
            g = a;
            var d = b();
            return (d.scope = a), (g = c), d;
          }
          function m(a) {
            return (
              a != null &&
                a[0] == "block" &&
                a[1] &&
                (a[1].length == 1
                  ? (a = a[1][0])
                  : a[1].length == 0 && (a = ["block"])),
              a
            );
          }
          function p(a, b, c) {
            var d = this[0] == "defun";
            return (
              (c = k(c.scope, function () {
                var b = t(c, "lambda");
                return !d && a && !g.references(a) && (a = null), b;
              })),
              [this[0], a, b, c]
            );
          }
          function t(a, c) {
            return (
              (a = K(a, d)),
              (a = a.reduce(function (a, b) {
                return (
                  b[0] == "block" ? b[1] && a.push.apply(a, b[1]) : a.push(b), a
                );
              }, [])),
              (a = (function (b, c) {
                return (
                  a.forEach(function (a) {
                    c &&
                    ((a[0] == "var" && c[0] == "var") ||
                      (a[0] == "const" && c[0] == "const"))
                      ? (c[1] = c[1].concat(a[1]))
                      : (b.push(a), (c = a));
                  }),
                  b
                );
              })([])),
              b.dead_code &&
                (a = (function (c, d) {
                  return (
                    a.forEach(function (a) {
                      d
                        ? a[0] == "function" || a[0] == "defun"
                          ? c.push(a)
                          : a[0] == "var" || a[0] == "const"
                          ? (b.no_warnings ||
                              n("Variables declared in unreachable code"),
                            (a[1] = K(a[1], function (a) {
                              return (
                                a[1] &&
                                  !b.no_warnings &&
                                  v(["assign", !0, ["name", a[0]], a[1]]),
                                [a[0]]
                              );
                            })),
                            c.push(a))
                          : b.no_warnings || v(a)
                        : (c.push(a),
                          f(a[0], ["return", "throw", "break", "continue"]) &&
                            (d = !0));
                    }),
                    c
                  );
                })([])),
              b.make_seqs &&
                (a = (function (b, c) {
                  return (
                    a.forEach(function (a) {
                      c && c[0] == "stat" && a[0] == "stat"
                        ? (c[1] = ["seq", c[1], a[1]])
                        : (b.push(a), (c = a));
                    }),
                    b.length >= 2 &&
                      b[b.length - 2][0] == "stat" &&
                      (b[b.length - 1][0] == "return" ||
                        b[b.length - 1][0] == "throw") &&
                      b[b.length - 1][1] &&
                      b.splice(b.length - 2, 2, [
                        b[b.length - 1][0],
                        ["seq", b[b.length - 2][1], b[b.length - 1][1]],
                      ]),
                    b
                  );
                })([])),
              a
            );
          }
          function x(a, b, c) {
            return u(
              a,
              function (a, e) {
                return e
                  ? ((b = d(b)), v(c), b || ["block"])
                  : ((c = d(c)), v(b), c || ["block"]);
              },
              function () {
                return y(a, b, c);
              }
            );
          }
          function y(a, b, c) {
            (a = d(a)),
              (b = d(b)),
              (c = d(c)),
              s(b)
                ? ((a = h(a)), (b = c), (c = null))
                : s(c)
                ? (c = null)
                : (function () {
                    var d = E(a),
                      e = h(a),
                      f = E(e);
                    if (f.length < d.length) {
                      var g = b;
                      (b = c), (c = g), (a = e);
                    }
                  })();
            if (s(c) && s(b)) return ["stat", a];
            var e = ["if", a, b, c];
            return (
              b[0] == "if" && s(b[3]) && s(c)
                ? (e = o(e, d(["if", ["binary", "&&", a, b[1]], b[2]])))
                : b[0] == "stat"
                ? c
                  ? c[0] == "stat" && (e = o(e, ["stat", j(a, b[1], c[1])]))
                  : (e = o(e, ["stat", j(a, b[1])]))
                : c &&
                  b[0] == c[0] &&
                  (b[0] == "return" || b[0] == "throw") &&
                  b[1] &&
                  c[1]
                ? (e = o(e, [b[0], j(a, b[1], c[1])]))
                : c && q(b)
                ? ((e = [["if", a, b]]),
                  c[0] == "block" ? c[1] && (e = e.concat(c[1])) : e.push(c),
                  (e = d(["block", e])))
                : b &&
                  q(c) &&
                  ((e = [["if", h(a), c]]),
                  b[0] == "block" ? b[1] && (e = e.concat(b[1])) : e.push(b),
                  (e = d(["block", e]))),
              e
            );
          }
          function z(a, b) {
            return u(a, function (a, c) {
              return c ? ["for", null, null, null, d(b)] : (v(b), ["block"]);
            });
          }
          b = H(b, {
            make_seqs: !0,
            dead_code: !0,
            no_warnings: !1,
            keep_comps: !0,
          });
          var c = i(),
            d = c.walk,
            g;
          return c.with_walkers(
            {
              sub: function (a, b) {
                if (b[0] == "string") {
                  var c = b[1];
                  if (I(c)) return ["dot", d(a), c];
                  if (/^[1-9][0-9]*$/.test(c) || c === "0")
                    return ["sub", d(a), ["num", parseInt(c, 10)]];
                }
              },
              if: x,
              toplevel: function (a) {
                return [
                  "toplevel",
                  k(this.scope, function () {
                    return t(a);
                  }),
                ];
              },
              switch: function (a, b) {
                var c = b.length - 1;
                return [
                  "switch",
                  d(a),
                  K(b, function (a, b) {
                    var e = t(a[1]);
                    if (b == c && e.length > 0) {
                      var f = e[e.length - 1];
                      f[0] == "break" && !f[1] && e.pop();
                    }
                    return [a[0] ? d(a[0]) : null, e];
                  }),
                ];
              },
              function: p,
              defun: p,
              block: function (a) {
                if (a) return m(["block", t(a)]);
              },
              binary: function (a, b, c) {
                return u(
                  ["binary", a, d(b), d(c)],
                  function (a) {
                    return o(d(a), this);
                  },
                  function () {
                    return (
                      (function () {
                        if (a != "==" && a != "!=") return;
                        var e = d(b),
                          f = d(c);
                        return (
                          e &&
                          e[0] == "unary-prefix" &&
                          e[1] == "!" &&
                          e[2][0] == "num"
                            ? (b = ["num", +!e[2][1]])
                            : f &&
                              f[0] == "unary-prefix" &&
                              f[1] == "!" &&
                              f[2][0] == "num" &&
                              (c = ["num", +!f[2][1]]),
                          ["binary", a, b, c]
                        );
                      })() || this
                    );
                  }
                );
              },
              conditional: function (a, b, c) {
                return j(d(a), d(b), d(c));
              },
              try: function (a, b, c) {
                return [
                  "try",
                  t(a),
                  b != null ? [b[0], t(b[1])] : null,
                  c != null ? t(c) : null,
                ];
              },
              "unary-prefix": function (a, b) {
                b = d(b);
                var c = ["unary-prefix", a, b];
                return (
                  a == "!" && (c = o(c, h(b))),
                  u(
                    c,
                    function (a, b) {
                      return d(a);
                    },
                    function () {
                      return c;
                    }
                  )
                );
              },
              name: function (a) {
                switch (a) {
                  case "true":
                    return ["unary-prefix", "!", ["num", 0]];
                  case "false":
                    return ["unary-prefix", "!", ["num", 1]];
                }
              },
              while: z,
              assign: function (a, b, c) {
                (b = d(b)), (c = d(c));
                var e = [
                  "+",
                  "-",
                  "/",
                  "*",
                  "%",
                  ">>",
                  "<<",
                  ">>>",
                  "|",
                  "^",
                  "&",
                ];
                return a === !0 &&
                  b[0] === "name" &&
                  c[0] === "binary" &&
                  ~e.indexOf(c[1]) &&
                  c[2][0] === "name" &&
                  c[2][1] === b[1]
                  ? [this[0], c[1], b, c[3]]
                  : [this[0], a, b, c];
              },
            },
            function () {
              for (var b = 0; b < 2; ++b) (a = w(a)), (a = l(a)), (a = d(a));
              return a;
            }
          );
        }
        function B(a, b) {
          var c = 0,
            d = 0;
          return (
            (a = a.replace(
              /[\\\b\f\n\r\t\x22\x27\u2028\u2029\0]/g,
              function (a) {
                switch (a) {
                  case "\\":
                    return "\\\\";
                  case "\b":
                    return "\\b";
                  case "\f":
                    return "\\f";
                  case "\n":
                    return "\\n";
                  case "\r":
                    return "\\r";
                  case "\t":
                    return "\\t";
                  case "\u2028":
                    return "\\u2028";
                  case "\u2029":
                    return "\\u2029";
                  case '"':
                    return ++c, '"';
                  case "'":
                    return ++d, "'";
                  case "\0":
                    return "\\0";
                }
                return a;
              }
            )),
            b && (a = C(a)),
            c > d
              ? "'" + a.replace(/\x27/g, "\\'") + "'"
              : '"' + a.replace(/\x22/g, '\\"') + '"'
          );
        }
        function C(a) {
          return a.replace(/[\u0080-\uffff]/g, function (a) {
            var b = a.charCodeAt(0).toString(16);
            while (b.length < 4) b = "0" + b;
            return "\\u" + b;
          });
        }
        function E(a, b) {
          function m(a) {
            var c = B(a, b.ascii_only);
            return (
              b.inline_script &&
                (c = c.replace(/<\x2fscript([>/\t\n\f\r ])/gi, "<\\/script$1")),
              c
            );
          }
          function n(a) {
            return (a = a.toString()), b.ascii_only && (a = C(a)), a;
          }
          function o(a) {
            return (
              a == null && (a = ""),
              c && (a = G(" ", b.indent_start + j * b.indent_level) + a),
              a
            );
          }
          function p(a, b) {
            b == null && (b = 1), (j += b);
            try {
              return a.apply(null, e(arguments, 1));
            } finally {
              j -= b;
            }
          }
          function q(a) {
            if (c) return a.join(" ");
            var b = [];
            for (var d = 0; d < a.length; ++d) {
              var e = a[d + 1];
              b.push(a[d]),
                e &&
                  ((/[a-z0-9_\x24]$/i.test(a[d].toString()) &&
                    /^[a-z0-9_\x24]/i.test(e.toString())) ||
                    (/[\+\-]$/.test(a[d].toString()) &&
                      /^[\+\-]/.test(e.toString()))) &&
                  b.push(" ");
            }
            return b.join("");
          }
          function r(a) {
            return a.join("," + l);
          }
          function t(a) {
            var b = y(a);
            for (var c = 1; c < arguments.length; ++c) {
              var d = arguments[c];
              if ((d instanceof Function && d(a)) || a[0] == d)
                return "(" + b + ")";
            }
            return b;
          }
          function u(a) {
            if (a.length == 1) return a[0];
            if (a.length == 2) {
              var b = a[1];
              return (a = a[0]), a.length > b.length ? b : a;
            }
            return u([a[0], u(a.slice(1))]);
          }
          function v(a) {
            if (a[0] == "function" || a[0] == "object") {
              var b = e(x.stack()),
                c = b.pop(),
                d = b.pop();
              while (d) {
                if (d[0] == "stat") return !0;
                if (
                  ((d[0] == "seq" ||
                    d[0] == "call" ||
                    d[0] == "dot" ||
                    d[0] == "sub" ||
                    d[0] == "conditional") &&
                    d[1] === c) ||
                  ((d[0] == "binary" ||
                    d[0] == "assign" ||
                    d[0] == "unary-postfix") &&
                    d[2] === c)
                )
                  (c = d), (d = b.pop());
                else return !1;
              }
            }
            return !J(A, a[0]);
          }
          function w(a) {
            var b = a.toString(10),
              c = [b.replace(/^0\./, ".")],
              d;
            return (
              Math.floor(a) === a
                ? (a < 0
                    ? c.push(
                        "-0x" + (-a).toString(16).toLowerCase(),
                        "-0" + (-a).toString(8)
                      )
                    : c.push(
                        "0x" + a.toString(16).toLowerCase(),
                        "0" + a.toString(8)
                      ),
                  (d = /^(.*?)(0+)$/.exec(a)) &&
                    c.push(d[1] + "e" + d[2].length))
                : (d = /^0?\.(0+)(.*)$/.exec(a)) &&
                  c.push(
                    d[2] + "e-" + (d[1].length + d[2].length),
                    b.substr(b.indexOf("."))
                  ),
              u(c)
            );
          }
          function z(a) {
            if (a == null) return ";";
            if (a[0] == "do") return N([a]);
            var b = a;
            for (;;) {
              var c = b[0];
              if (c == "if") {
                if (!b[3]) return y(["block", [a]]);
                b = b[3];
              } else if (c == "while" || c == "do") b = b[2];
              else if (c == "for" || c == "for-in") b = b[4];
              else break;
            }
            return y(a);
          }
          function E(a, b, c, d) {
            var e = d || "function";
            return (
              a && (e += " " + n(a)),
              (e += "(" + r(K(b, n)) + ")"),
              (e = q([e, N(c)])),
              v(this) ? "(" + e + ")" : e
            );
          }
          function F(a) {
            switch (a[0]) {
              case "with":
              case "while":
                return s(a[2]);
              case "for":
              case "for-in":
                return s(a[4]);
              case "if":
                if (s(a[2]) && !a[3]) return !0;
                if (a[3]) return s(a[3]) ? !0 : F(a[3]);
                return F(a[2]);
            }
          }
          function L(a, b) {
            for (var d = [], e = a.length - 1, f = 0; f <= e; ++f) {
              var g = a[f],
                h = y(g);
              h != ";" &&
                (!c && f == e && !F(g) && (h = h.replace(/;+\s*$/, "")),
                d.push(h));
            }
            return b ? d : K(d, o);
          }
          function M(a) {
            var b = a.length;
            return b == 0
              ? "{}"
              : "{" +
                  k +
                  K(a, function (a, d) {
                    var e = a[1].length > 0,
                      f =
                        p(function () {
                          return o(
                            a[0] ? q(["case", y(a[0]) + ":"]) : "default:"
                          );
                        }, 0.5) +
                        (e
                          ? k +
                            p(function () {
                              return L(a[1]).join(k);
                            })
                          : "");
                    return !c && e && d < b - 1 && (f += ";"), f;
                  }).join(k) +
                  k +
                  o("}");
          }
          function N(a) {
            return a
              ? a.length == 0
                ? "{}"
                : "{" +
                  k +
                  p(function () {
                    return L(a).join(k);
                  }) +
                  k +
                  o("}")
              : ";";
          }
          function O(a) {
            var b = a[0],
              c = a[1];
            return c != null && (b = q([n(b), "=", t(c, "seq")])), b;
          }
          b = H(b, {
            indent_start: 0,
            indent_level: 4,
            quote_keys: !1,
            space_colon: !1,
            beautify: !1,
            ascii_only: !1,
            inline_script: !1,
          });
          var c = !!b.beautify,
            j = 0,
            k = c ? "\n" : "",
            l = c ? " " : "",
            x = i(),
            y = x.walk;
          return x.with_walkers(
            {
              string: m,
              num: w,
              name: n,
              toplevel: function (a) {
                return L(a).join(k + k);
              },
              splice: function (a) {
                var b = x.parent();
                return J(D, b)
                  ? N.apply(this, arguments)
                  : K(L(a, !0), function (a, b) {
                      return b > 0 ? o(a) : a;
                    }).join(k);
              },
              block: N,
              var: function (a) {
                return "var " + r(K(a, O)) + ";";
              },
              const: function (a) {
                return "const " + r(K(a, O)) + ";";
              },
              try: function (a, b, c) {
                var d = ["try", N(a)];
                return (
                  b && d.push("catch", "(" + b[0] + ")", N(b[1])),
                  c && d.push("finally", N(c)),
                  q(d)
                );
              },
              throw: function (a) {
                return q(["throw", y(a)]) + ";";
              },
              new: function (a, b) {
                return (
                  (b =
                    b.length > 0
                      ? "(" +
                        r(
                          K(b, function (a) {
                            return t(a, "seq");
                          })
                        ) +
                        ")"
                      : ""),
                  q([
                    "new",
                    t(
                      a,
                      "seq",
                      "binary",
                      "conditional",
                      "assign",
                      function (a) {
                        var b = i(),
                          c = {};
                        try {
                          b.with_walkers(
                            {
                              call: function () {
                                throw c;
                              },
                              function: function () {
                                return this;
                              },
                            },
                            function () {
                              b.walk(a);
                            }
                          );
                        } catch (d) {
                          if (d === c) return !0;
                          throw d;
                        }
                      }
                    ) + b,
                  ])
                );
              },
              switch: function (a, b) {
                return q(["switch", "(" + y(a) + ")", M(b)]);
              },
              break: function (a) {
                var b = "break";
                return a != null && (b += " " + n(a)), b + ";";
              },
              continue: function (a) {
                var b = "continue";
                return a != null && (b += " " + n(a)), b + ";";
              },
              conditional: function (a, b, c) {
                return q([
                  t(a, "assign", "seq", "conditional"),
                  "?",
                  t(b, "seq"),
                  ":",
                  t(c, "seq"),
                ]);
              },
              assign: function (a, b, c) {
                return (
                  a && a !== !0 ? (a += "=") : (a = "="),
                  q([y(b), a, t(c, "seq")])
                );
              },
              dot: function (a) {
                var b = y(a),
                  c = 1;
                a[0] == "num"
                  ? /\./.test(a[1]) || (b += ".")
                  : v(a) && (b = "(" + b + ")");
                while (c < arguments.length) b += "." + n(arguments[c++]);
                return b;
              },
              call: function (a, b) {
                var c = y(a);
                return (
                  c.charAt(0) != "(" && v(a) && (c = "(" + c + ")"),
                  c +
                    "(" +
                    r(
                      K(b, function (a) {
                        return t(a, "seq");
                      })
                    ) +
                    ")"
                );
              },
              function: E,
              defun: E,
              if: function (a, b, c) {
                var d = ["if", "(" + y(a) + ")", c ? z(b) : y(b)];
                return c && d.push("else", y(c)), q(d);
              },
              for: function (a, b, c, d) {
                var e = ["for"];
                (a = (a != null ? y(a) : "").replace(/;*\s*$/, ";" + l)),
                  (b = (b != null ? y(b) : "").replace(/;*\s*$/, ";" + l)),
                  (c = (c != null ? y(c) : "").replace(/;*\s*$/, ""));
                var f = a + b + c;
                return (
                  f == "; ; " && (f = ";;"), e.push("(" + f + ")", y(d)), q(e)
                );
              },
              "for-in": function (a, b, c, d) {
                return q([
                  "for",
                  "(" + (a ? y(a).replace(/;+$/, "") : y(b)),
                  "in",
                  y(c) + ")",
                  y(d),
                ]);
              },
              while: function (a, b) {
                return q(["while", "(" + y(a) + ")", y(b)]);
              },
              do: function (a, b) {
                return q(["do", y(b), "while", "(" + y(a) + ")"]) + ";";
              },
              return: function (a) {
                var b = ["return"];
                return a != null && b.push(y(a)), q(b) + ";";
              },
              binary: function (a, d, e) {
                var h = y(d),
                  i = y(e);
                if (
                  f(d[0], ["assign", "conditional", "seq"]) ||
                  (d[0] == "binary" && g[a] > g[d[1]]) ||
                  (d[0] == "function" && v(this))
                )
                  h = "(" + h + ")";
                return (
                  f(e[0], ["assign", "conditional", "seq"]) ||
                  (e[0] == "binary" &&
                    g[a] >= g[e[1]] &&
                    (e[1] != a || !f(a, ["&&", "||", "*"])))
                    ? (i = "(" + i + ")")
                    : !c &&
                      b.inline_script &&
                      (a == "<" || a == "<<") &&
                      e[0] == "regexp" &&
                      /^script/i.test(e[1]) &&
                      (i = " " + i),
                  q([h, a, i])
                );
              },
              "unary-prefix": function (a, b) {
                var c = y(b);
                return (
                  b[0] == "num" ||
                    (b[0] == "unary-prefix" && !J(h, a + b[1])) ||
                    !v(b) ||
                    (c = "(" + c + ")"),
                  a + (d.is_alphanumeric_char(a.charAt(0)) ? " " : "") + c
                );
              },
              "unary-postfix": function (a, b) {
                var c = y(b);
                return (
                  b[0] == "num" ||
                    (b[0] == "unary-postfix" && !J(h, a + b[1])) ||
                    !v(b) ||
                    (c = "(" + c + ")"),
                  c + a
                );
              },
              sub: function (a, b) {
                var c = y(a);
                return v(a) && (c = "(" + c + ")"), c + "[" + y(b) + "]";
              },
              object: function (a) {
                var d = v(this);
                if (a.length == 0) return d ? "({})" : "{}";
                var e =
                  "{" +
                  k +
                  p(function () {
                    return K(a, function (a) {
                      if (a.length == 3)
                        return o(E(a[0], a[1][2], a[1][3], a[2]));
                      var d = a[0],
                        e = t(a[1], "seq");
                      return (
                        b.quote_keys
                          ? (d = m(d))
                          : (typeof d == "number" || (!c && +d + "" == d)) &&
                            parseFloat(d) >= 0
                          ? (d = w(+d))
                          : I(d) || (d = m(d)),
                        o(q(c && b.space_colon ? [d, ":", e] : [d + ":", e]))
                      );
                    }).join("," + k);
                  }) +
                  k +
                  o("}");
                return d ? "(" + e + ")" : e;
              },
              regexp: function (a, b) {
                return "/" + a + "/" + b;
              },
              array: function (a) {
                return a.length == 0
                  ? "[]"
                  : q([
                      "[",
                      r(
                        K(a, function (b, d) {
                          return !c && b[0] == "atom" && b[1] == "undefined"
                            ? d === a.length - 1
                              ? ","
                              : ""
                            : t(b, "seq");
                        })
                      ),
                      "]",
                    ]);
              },
              stat: function (a) {
                return y(a).replace(/;*\s*$/, ";");
              },
              seq: function () {
                return r(K(e(arguments), y));
              },
              label: function (a, b) {
                return q([n(a), ":", y(b)]);
              },
              with: function (a, b) {
                return q(["with", "(" + y(a) + ")", y(b)]);
              },
              atom: function (a) {
                return n(a);
              },
            },
            function () {
              return y(a);
            }
          );
        }
        function F(a, b) {
          var c = [0];
          return (
            d.parse(
              (function () {
                function h(a) {
                  return a.pos - f;
                }
                function i(a) {
                  (f = a.pos), c.push(f);
                }
                function j() {
                  var a = e.apply(this, arguments);
                  c: {
                    if (g && g.type == "keyword") break c;
                    if (h(a) > b)
                      switch (a.type) {
                        case "keyword":
                        case "atom":
                        case "name":
                        case "punc":
                          i(a);
                          break c;
                      }
                  }
                  return (g = a), a;
                }
                var e = d.tokenizer(a),
                  f = 0,
                  g;
                return (
                  (j.context = function () {
                    return e.context.apply(this, arguments);
                  }),
                  j
                );
              })()
            ),
            c
              .map(function (b, d) {
                return a.substring(b, c[d + 1] || a.length);
              })
              .join("\n")
          );
        }
        function G(a, b) {
          if (b > 0) {
            if (b == 1) return a;
            var c = G(a, b >> 1);
            return (c += c), b & 1 && (c += a), c;
          }
          return "";
        }
        function H(a, b) {
          var c = {};
          a === !0 && (a = {});
          for (var d in b) J(b, d) && (c[d] = a && J(a, d) ? a[d] : b[d]);
          return c;
        }
        function I(a) {
          return (
            /^[a-z_$][a-z0-9_$]*$/i.test(a) &&
            a != "this" &&
            !J(d.KEYWORDS_ATOM, a) &&
            !J(d.RESERVED_WORDS, a) &&
            !J(d.KEYWORDS, a)
          );
        }
        function J(a, b) {
          return Object.prototype.hasOwnProperty.call(a, b);
        }
        var d = a("./parse-js"),
          e = d.slice,
          f = d.member,
          g = d.PRECEDENCE,
          h = d.OPERATORS,
          k = (function () {
            var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_";
            return function (b) {
              var c = "";
              do (c = a.charAt(b % 54) + c), (b = Math.floor(b / 54));
              while (b > 0);
              return c;
            };
          })();
        j.prototype = {
          has: function (a) {
            for (var b = this; b; b = b.parent) if (J(b.names, a)) return b;
          },
          has_mangled: function (a) {
            for (var b = this; b; b = b.parent)
              if (J(b.rev_mangled, a)) return b;
          },
          toJSON: function () {
            return {
              names: this.names,
              uses_eval: this.uses_eval,
              uses_with: this.uses_with,
            };
          },
          next_mangled: function () {
            for (;;) {
              var a = k(++this.cname),
                b;
              b = this.has_mangled(a);
              if (b && this.refs[b.rev_mangled[a]] === b) continue;
              b = this.has(a);
              if (b && b !== this && this.refs[a] === b && !b.has_mangled(a))
                continue;
              if (J(this.refs, a) && this.refs[a] == null) continue;
              if (!I(a)) continue;
              return a;
            }
          },
          set_mangle: function (a, b) {
            return (this.rev_mangled[b] = a), (this.mangled[a] = b);
          },
          get_mangled: function (a, b) {
            if (this.uses_eval || this.uses_with) return a;
            var c = this.has(a);
            return c
              ? J(c.mangled, a)
                ? c.mangled[a]
                : b
                ? c.set_mangle(a, c.next_mangled())
                : a
              : a;
          },
          references: function (a) {
            return (
              (a && !this.parent) ||
              this.uses_with ||
              this.uses_eval ||
              this.refs[a]
            );
          },
          define: function (a, b) {
            if (a != null) {
              if (b == "var" || !J(this.names, a)) this.names[a] = b || "var";
              return a;
            }
          },
        };
        var n = function () {},
          u = (function () {
            function b(c) {
              switch (c[0]) {
                case "string":
                case "num":
                  return c[1];
                case "name":
                case "atom":
                  switch (c[1]) {
                    case "true":
                      return !0;
                    case "false":
                      return !1;
                    case "null":
                      return null;
                  }
                  break;
                case "unary-prefix":
                  switch (c[1]) {
                    case "!":
                      return !b(c[2]);
                    case "typeof":
                      return typeof b(c[2]);
                    case "~":
                      return ~b(c[2]);
                    case "-":
                      return -b(c[2]);
                    case "+":
                      return +b(c[2]);
                  }
                  break;
                case "binary":
                  var d = c[2],
                    e = c[3];
                  switch (c[1]) {
                    case "&&":
                      return b(d) && b(e);
                    case "||":
                      return b(d) || b(e);
                    case "|":
                      return b(d) | b(e);
                    case "&":
                      return b(d) & b(e);
                    case "^":
                      return b(d) ^ b(e);
                    case "+":
                      return b(d) + b(e);
                    case "*":
                      return b(d) * b(e);
                    case "/":
                      return b(d) / b(e);
                    case "%":
                      return b(d) % b(e);
                    case "-":
                      return b(d) - b(e);
                    case "<<":
                      return b(d) << b(e);
                    case ">>":
                      return b(d) >> b(e);
                    case ">>>":
                      return b(d) >>> b(e);
                    case "==":
                      return b(d) == b(e);
                    case "===":
                      return b(d) === b(e);
                    case "!=":
                      return b(d) != b(e);
                    case "!==":
                      return b(d) !== b(e);
                    case "<":
                      return b(d) < b(e);
                    case "<=":
                      return b(d) <= b(e);
                    case ">":
                      return b(d) > b(e);
                    case ">=":
                      return b(d) >= b(e);
                    case "in":
                      return b(d) in b(e);
                    case "instanceof":
                      return b(d) instanceof b(e);
                  }
              }
              throw a;
            }
            var a = {};
            return function (c, d, e) {
              try {
                var f = b(c),
                  g;
                switch (typeof f) {
                  case "string":
                    g = ["string", f];
                    break;
                  case "number":
                    g = ["num", f];
                    break;
                  case "boolean":
                    g = ["name", String(f)];
                    break;
                  default:
                    throw new Error(
                      "Can't handle constant of type: " + typeof f
                    );
                }
                return d.call(c, g, f);
              } catch (h) {
                if (h === a) {
                  if (
                    c[0] != "binary" ||
                    (c[1] != "===" && c[1] != "!==") ||
                    !((t(c[2]) && t(c[3])) || (r(c[2]) && r(c[3])))
                  ) {
                    if (e && c[0] == "binary" && (c[1] == "||" || c[1] == "&&"))
                      try {
                        var i = b(c[2]);
                        c =
                          (c[1] == "&&" && (i ? c[3] : i)) ||
                          (c[1] == "||" && (i ? i : c[3])) ||
                          c;
                      } catch (j) {}
                  } else c[1] = c[1].substr(0, 2);
                  return e ? e.call(c, c) : null;
                }
                throw h;
              }
            };
          })(),
          A = d.array_to_hash([
            "name",
            "array",
            "object",
            "string",
            "dot",
            "sub",
            "call",
            "regexp",
            "defun",
          ]),
          D = d.array_to_hash(["if", "while", "do", "for", "for-in", "with"]),
          K;
        (function () {
          function b(a) {
            this.v = a;
          }
          function c(a) {
            this.v = a;
          }
          (K = function (d, e, f) {
            function j() {
              var j = e.call(f, d[i], i);
              j instanceof b
                ? ((j = j.v), j instanceof c ? h.push.apply(h, j.v) : h.push(j))
                : j != a && (j instanceof c ? g.push.apply(g, j.v) : g.push(j));
            }
            var g = [],
              h = [],
              i;
            if (d instanceof Array) for (i = 0; i < d.length; ++i) j();
            else for (i in d) J(d, i) && j();
            return h.concat(g);
          }),
            (K.at_top = function (a) {
              return new b(a);
            }),
            (K.splice = function (a) {
              return new c(a);
            });
          var a = (K.skip = {});
        })(),
          (b.ast_walker = i),
          (b.ast_mangle = m),
          (b.ast_squeeze = z),
          (b.ast_lift_variables = y),
          (b.gen_code = E),
          (b.ast_add_scope = l),
          (b.set_logger = function (a) {
            n = a;
          }),
          (b.make_string = B),
          (b.split_lines = F),
          (b.MAP = K);
      }
    ),
    f(
      "uglify-js",
      ["require", "exports", "module", "./lib/parse-js", "./lib/process"],
      function (a, b, c) {
        function d(a, b) {
          b || (b = {});
          var c = d.parser,
            e = d.uglify,
            f = c.parse(a, b.strict_semicolons);
          (f = e.ast_mangle(f, b.mangle_options)),
            (f = e.ast_squeeze(f, b.squeeze_options));
          var g = e.gen_code(f, b.gen_options);
          return g;
        }
        (d.parser = a("./lib/parse-js")),
          (d.uglify = a("./lib/process")),
          (c.exports = d);
      }
    ),
    f(
      "lib/squeeze-more",
      ["require", "exports", "module", "./parse-js", "./process"],
      function (a, b, c) {
        function l(a) {
          function f(a, b) {
            var c = d,
              e;
            return (d = a), (e = b()), (d = c), e;
          }
          function g(a, b, d) {
            return [this[0], a, b, f(d.scope, h(i, d, c))];
          }
          var b = e.ast_walker(),
            c = b.walk,
            d;
          return b.with_walkers(
            {
              toplevel: function (a) {
                return [this[0], f(this.scope, h(i, a, c))];
              },
              function: g,
              defun: g,
              new: function (a, b) {
                if (a[0] == "name" && a[1] == "Array" && !d.has("Array"))
                  return b.length != 1
                    ? ["array", b]
                    : c(["call", ["name", "Array"], b]);
              },
              call: function (a, b) {
                if (a[0] == "dot" && a[2] == "toString" && b.length == 0)
                  return ["binary", "+", a[1], ["string", ""]];
                if (
                  a[0] == "name" &&
                  a[1] == "Array" &&
                  b.length != 1 &&
                  !d.has("Array")
                )
                  return ["array", b];
              },
            },
            function () {
              return c(e.ast_add_scope(a));
            }
          );
        }
        var d = a("./parse-js"),
          e = a("./process"),
          f = d.slice,
          g = d.member,
          h = d.curry,
          i = e.MAP,
          j = d.PRECEDENCE,
          k = d.OPERATORS;
        b.ast_squeeze_more = l;
      }
    );
  if (!this.uglify) {
    var g = this;
    e(
      ["uglify-js", "lib/process", "lib/squeeze-more"],
      function (a, b, c) {
        (b.ast_squeeze_more = c.ast_squeeze_more), (g.uglify = a);
        var d = g.define;
        typeof d == "function" &&
          d.amd &&
          d("uglifyweb", function () {
            return a;
          });
      },
      null,
      !0
    );
  }
})();
