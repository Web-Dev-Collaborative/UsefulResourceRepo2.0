! function ( e, t ) {
  for ( var n in t ) e[ n ] = t[ n ]
}( exports, function ( e ) {
  var t = {};

  function n( o ) {
    if ( t[ o ] ) return t[ o ].exports;
    var r = t[ o ] = {
      i: o,
      l: !1,
      exports: {}
    };
    return e[ o ].call( r.exports, r, r.exports, n ), r.l = !0, r.exports
  }
  return n.m = e, n.c = t, n.d = function ( e, t, o ) {
    n.o( e, t ) || Object.defineProperty( e, t, {
      enumerable: !0,
      get: o
    } )
  }, n.r = function ( e ) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty( e, Symbol.toStringTag, {
      value: "Module"
    } ), Object.defineProperty( e, "__esModule", {
      value: !0
    } )
  }, n.t = function ( e, t ) {
    if ( 1 & t && ( e = n( e ) ), 8 & t ) return e;
    if ( 4 & t && "object" == typeof e && e && e.__esModule ) return e;
    var o = Object.create( null );
    if ( n.r( o ), Object.defineProperty( o, "default", {
        enumerable: !0,
        value: e
      } ), 2 & t && "string" != typeof e )
      for ( var r in e ) n.d( o, r, function ( t ) {
        return e[ t ]
      }.bind( null, r ) );
    return o
  }, n.n = function ( e ) {
    var t = e && e.__esModule ? function () {
      return e.default
    } : function () {
      return e
    };
    return n.d( t, "a", t ), t
  }, n.o = function ( e, t ) {
    return Object.prototype.hasOwnProperty.call( e, t )
  }, n.p = "", n( n.s = 3 )
}( [ function ( e, t ) {
  e.exports = require( "path" )
}, function ( e, t ) {
  e.exports = require( "vscode" )
}, function ( e, t, n ) {
  "use strict";
  Object.defineProperty( t, "__esModule", {
    value: !0
  } );
  var o, r, i, s, a, l, c = n( 0 ),
    u = n( 4 ),
    d = Object.prototype.toString;

  function f( e ) {
    return void 0 !== e
  }

  function p( e ) {
    return "[object Number]" === d.call( e )
  }

  function g( e ) {
    return "[object String]" === d.call( e )
  }

  function v( e ) {
    return JSON.parse( u.readFileSync( e, "utf8" ) )
  }

  function h( e, t ) {
    return l && ( e = "［" + e.replace( /[aouei]/g, "$&$&" ) + "］" ), 0 === t.length ? e : e.replace( /\{(\d+)\}/g, ( function ( e, n ) {
      var o = n[ 0 ],
        r = t[ o ],
        i = e;
      return "string" == typeof r ? i = r : "number" != typeof r && "boolean" != typeof r && null != r || ( i = String( r ) ), i
    } ) )
  }

  function w( e ) {
    return function ( t, n ) {
      for ( var o = [], r = 2; r < arguments.length; r++ ) o[ r - 2 ] = arguments[ r ];
      return p( t ) ? t >= e.length ? void console.error( "Broken localize call found. Index out of bounds. Stacktrace is\n: " + new Error( "" ).stack ) : h( e[ t ], o ) : g( n ) ? ( console.warn( "Message " + n + " didn't get externalized correctly." ), h( n, o ) ) : void console.error( "Broken localize call found. Stacktrace is\n: " + new Error( "" ).stack )
    }
  }

  function b( e, t ) {
    for ( var n = [], o = 2; o < arguments.length; o++ ) n[ o - 2 ] = arguments[ o ];
    return h( t, n )
  }

  function m( e, t ) {
    return s[ e ] = t, t
  }

  function y( e, t ) {
    var n, o, r, i = c.join( a.cacheRoot, e.id + "-" + e.hash + ".json" ),
      s = !1,
      l = !1;
    try {
      return n = JSON.parse( u.readFileSync( i, {
        encoding: "utf8",
        flag: "r"
      } ) ), o = i, r = new Date, u.utimes( o, r, r, ( function () {} ) ), n
    } catch ( e ) {
      if ( "ENOENT" === e.code ) l = !0;
      else {
        if ( !( e instanceof SyntaxError ) ) throw e;
        console.log( "Syntax error parsing message bundle: " + e.message + "." ), u.unlink( i, ( function ( e ) {
          e && console.error( "Deleting corrupted bundle " + i + " failed." )
        } ) ), s = !0
      }
    }
    if ( !( n = function ( e, t ) {
        var n = a.translationsConfig[ e.id ];
        if ( n ) {
          var o = v( n ).contents,
            r = v( c.join( t, "nls.metadata.json" ) ),
            i = Object.create( null );
          for ( var s in r ) {
            var l = r[ s ],
              u = o[ e.outDir + "/" + s ];
            if ( u ) {
              for ( var d = [], f = 0; f < l.keys.length; f++ ) {
                var p = l.keys[ f ],
                  h = u[ g( p ) ? p : p.key ];
                void 0 === h && ( h = l.messages[ f ] ), d.push( h )
              }
              i[ s ] = d
            } else i[ s ] = l.messages
          }
          return i
        }
      }( e, t ) ) || s ) return n;
    if ( l ) try {
      u.writeFileSync( i, JSON.stringify( n ), {
        encoding: "utf8",
        flag: "wx"
      } )
    } catch ( e ) {
      if ( "EEXIST" === e.code ) return n;
      throw e
    }
    return n
  }

  function _( e ) {
    try {
      return function ( e ) {
        var t = v( c.join( e, "nls.metadata.json" ) ),
          n = Object.create( null );
        for ( var o in t ) {
          var r = t[ o ];
          n[ o ] = r.messages
        }
        return n
      }( e )
    } catch ( e ) {
      return void console.log( "Generating default bundle from meta data failed.", e )
    }
  }

  function S( e, t ) {
    var n;
    if ( !0 === a.languagePackSupport && void 0 !== a.cacheRoot && void 0 !== a.languagePackId && void 0 !== a.translationsConfigFile && void 0 !== a.translationsConfig ) try {
      n = y( e, t )
    } catch ( e ) {
      console.log( "Load or create bundle failed ", e )
    }
    if ( !n ) {
      if ( a.languagePackSupport ) return _( t );
      var o = function ( e ) {
        for ( var t = a.language; t; ) {
          var n = c.join( e, "nls.bundle." + t + ".json" );
          if ( u.existsSync( n ) ) return n;
          var o = t.lastIndexOf( "-" );
          t = o > 0 ? t.substring( 0, o ) : void 0
        }
        if ( void 0 === t ) {
          n = c.join( e, "nls.bundle.json" );
          if ( u.existsSync( n ) ) return n
        }
      }( t );
      if ( o ) try {
        return v( o )
      } catch ( e ) {
        console.log( "Loading in the box message bundle failed.", e )
      }
      n = _( t )
    }
    return n
  }

  function x( e ) {
    if ( !e ) return b;
    var t = c.extname( e );
    if ( t && ( e = e.substr( 0, e.length - t.length ) ), a.messageFormat === o.both || a.messageFormat === o.bundle ) {
      var n = function ( e ) {
        for ( var t, n = c.dirname( e ); t = c.join( n, "nls.metadata.header.json" ), !u.existsSync( t ); ) {
          var o = c.dirname( n );
          if ( o === n ) {
            t = void 0;
            break
          }
          n = o
        }
        return t
      }( e );
      if ( n ) {
        var r = c.dirname( n ),
          i = s[ r ];
        if ( void 0 === i ) try {
          var d = JSON.parse( u.readFileSync( n, "utf8" ) );
          try {
            var p = S( d, r );
            i = m( r, p ? {
              header: d,
              nlsBundle: p
            } : null )
          } catch ( e ) {
            console.error( "Failed to load nls bundle", e ), i = m( r, null )
          }
        } catch ( e ) {
          console.error( "Failed to read header file", e ), i = m( r, null )
        }
        if ( i ) {
          var g = e.substr( r.length + 1 ).replace( /\\/g, "/" ),
            h = i.nlsBundle[ g ];
          return void 0 === h ? ( console.error( "Messages for file " + e + " not found. See console for details." ), function () {
            return "Messages not found."
          } ) : w( h )
        }
      }
    }
    if ( a.messageFormat === o.both || a.messageFormat === o.file ) try {
      var y = v( function ( e ) {
        var t;
        if ( a.cacheLanguageResolution && t ) t = t;
        else {
          if ( l || !a.language ) t = ".nls.json";
          else
            for ( var n = a.language; n; ) {
              var o = ".nls." + n + ".json";
              if ( u.existsSync( e + o ) ) {
                t = o;
                break
              }
              var r = n.lastIndexOf( "-" );
              r > 0 ? n = n.substring( 0, r ) : ( t = ".nls.json", n = null )
            }
          a.cacheLanguageResolution && ( t = t )
        }
        return e + t
      }( e ) );
      return Array.isArray( y ) ? w( y ) : f( y.messages ) && f( y.keys ) ? w( y.messages ) : ( console.error( "String bundle '" + e + "' uses an unsupported format." ), function () {
        return "File bundle has unsupported format. See console for details"
      } )
    } catch ( e ) {
      "ENOENT" !== e.code && console.error( "Failed to load single file bundle", e )
    }
    return console.error( "Failed to load message bundle for file " + e ),
      function () {
        return "Failed to load message bundle. See console for details."
      }
  }! function ( e ) {
    e.file = "file", e.bundle = "bundle", e.both = "both"
  }( o = t.MessageFormat || ( t.MessageFormat = {} ) ),
  function ( e ) {
    e.standalone = "standalone", e.languagePack = "languagePack"
  }( r = t.BundleFormat || ( t.BundleFormat = {} ) ),
  function ( e ) {
    e.is = function ( e ) {
      var t = e;
      return t && f( t.key ) && f( t.comment )
    }
  }( i || ( i = {} ) ),
  function () {
    if ( a = {
        locale: void 0,
        language: void 0,
        languagePackSupport: !1,
        cacheLanguageResolution: !0,
        messageFormat: o.bundle
      }, g( process.env.VSCODE_NLS_CONFIG ) ) try {
      var e = JSON.parse( process.env.VSCODE_NLS_CONFIG ),
        t = void 0;
      if ( e.availableLanguages ) {
        var n = e.availableLanguages[ "*" ];
        g( n ) && ( t = n )
      }
      if ( g( e.locale ) && ( a.locale = e.locale.toLowerCase() ), void 0 === t ? a.language = a.locale : "en" !== t && ( a.language = t ), function ( e ) {
          return !0 === e || !1 === e
        }( e._languagePackSupport ) && ( a.languagePackSupport = e._languagePackSupport ), g( e._cacheRoot ) && ( a.cacheRoot = e._cacheRoot ), g( e._languagePackId ) && ( a.languagePackId = e._languagePackId ), g( e._translationsConfigFile ) ) {
        a.translationsConfigFile = e._translationsConfigFile;
        try {
          a.translationsConfig = v( a.translationsConfigFile )
        } catch ( t ) {
          if ( e._corruptedFile ) {
            var r = c.dirname( e._corruptedFile );
            u.exists( r, ( function ( t ) {
              t && u.writeFile( e._corruptedFile, "corrupted", "utf8", ( function ( e ) {
                console.error( e )
              } ) )
            } ) )
          }
        }
      }
    } catch ( e ) {}
    l = "pseudo" === a.locale, void 0, s = Object.create( null )
  }(), t.loadMessageBundle = x, t.config = function ( e ) {
    return e && ( g( e.locale ) && ( a.locale = e.locale.toLowerCase(), a.language = a.locale, void 0, s = Object.create( null ) ), void 0 !== e.messageFormat && ( a.messageFormat = e.messageFormat ), e.bundleFormat === r.standalone && !0 === a.languagePackSupport && ( a.languagePackSupport = !1 ) ), l = "pseudo" === a.locale, x
  }
}, function ( e, t, n ) {
  "use strict";
  Object.defineProperty( t, "__esModule", {
    value: !0
  } ), t.activate = void 0;
  const o = n( 1 ),
    r = n( 2 ),
    i = n( 5 ),
    s = r.loadMessageBundle( n( 0 ).join( __dirname, "extension.ts" ) ),
    a = new Set( [ "localhost", "127.0.0.1", "0:0:0:0:0:0:0:1", "::1", "0.0.0.0", "0:0:0:0:0:0:0:0", "::" ] );
  t.activate = function ( e ) {
    const t = new i.SimpleBrowserManager( e.extensionUri );
    e.subscriptions.push( t ), e.subscriptions.push( o.commands.registerCommand( "simpleBrowser.show", async e => {
      e || ( e = await o.window.showInputBox( {
        placeHolder: s( 0, null ),
        prompt: s( 1, null )
      } ) ), e && t.show( e )
    } ) ), e.subscriptions.push( o.commands.registerCommand( "simpleBrowser.api.open", ( e, n ) => {
      t.show( e.toString(), n )
    } ) ), e.subscriptions.push( o.window.registerExternalUriOpener( "simpleBrowser.open", {
      canOpenExternalUri( e ) {
        const t = new URL( e.toString() );
        return a.has( t.hostname ) ? "undefined" != typeof navigator && o.env.uiKind === o.UIKind.Web ? o.ExternalUriOpenerPriority.Default : o.ExternalUriOpenerPriority.Option : o.ExternalUriOpenerPriority.None
      },
      openExternalUri: e => t.show( e.toString(), {
        viewColumn: o.window.activeTextEditor ? o.ViewColumn.Beside : o.ViewColumn.Active
      } )
    }, {
      schemes: [ "http", "https" ],
      label: s( 2, null )
    } ) )
  }
}, function ( e, t ) {
  e.exports = require( "fs" )
}, function ( e, t, n ) {
  "use strict";
  Object.defineProperty( t, "__esModule", {
    value: !0
  } ), t.SimpleBrowserManager = void 0;
  const o = n( 6 );
  t.SimpleBrowserManager = class {
    constructor( e ) {
      this.extensionUri = e
    }
    dispose() {
      var e;
      null === ( e = this._activeView ) || void 0 === e || e.dispose(), this._activeView = void 0
    }
    show( e, t ) {
      if ( this._activeView ) this._activeView.show( e, t );
      else {
        const n = new o.SimpleBrowserView( this.extensionUri, e, t );
        n.onDispose( () => {
          this._activeView === n && ( this._activeView = void 0 )
        } ), this._activeView = n
      }
    }
  }
}, function ( e, t, n ) {
  "use strict";
  Object.defineProperty( t, "__esModule", {
    value: !0
  } ), t.SimpleBrowserView = void 0;
  const o = n( 1 ),
    r = n( 2 ),
    i = n( 7 ),
    s = r.loadMessageBundle( n( 0 ).join( __dirname, "simpleBrowserView.ts" ) );
  class a extends i.Disposable {
    constructor( e, t, n ) {
      var r;
      super(), this.extensionUri = e, this._onDidDispose = this._register( new o.EventEmitter ), this.onDispose = this._onDidDispose.event, this._webviewPanel = this._register( o.window.createWebviewPanel( a.viewType, a.title, {
        viewColumn: null !== ( r = null == n ? void 0 : n.viewColumn ) && void 0 !== r ? r : o.ViewColumn.Active,
        preserveFocus: null == n ? void 0 : n.preserveFocus
      }, {
        enableScripts: !0,
        retainContextWhenHidden: !0,
        localResourceRoots: [ o.Uri.joinPath( e, "media" ) ]
      } ) ), this._register( this._webviewPanel.webview.onDidReceiveMessage( e => {
        switch ( e.type ) {
          case "openExternal":
            try {
              const t = o.Uri.parse( e.url );
              o.env.openExternal( t )
            } catch ( e ) {}
        }
      } ) ), this._register( this._webviewPanel.onDidDispose( () => {
        this.dispose()
      } ) ), this._register( o.workspace.onDidChangeConfiguration( e => {
        if ( e.affectsConfiguration( "simpleBrowser.focusLockIndicator.enabled" ) ) {
          const e = o.workspace.getConfiguration( "simpleBrowser" );
          this._webviewPanel.webview.postMessage( {
            type: "didChangeFocusLockIndicatorEnabled",
            focusLockEnabled: e.get( "focusLockIndicator.enabled", !0 )
          } )
        }
      } ) ), this.show( t )
    }
    dispose() {
      this._onDidDispose.fire(), super.dispose()
    }
    show( e, t ) {
      this._webviewPanel.webview.html = this.getHtml( e ), this._webviewPanel.reveal( null == t ? void 0 : t.viewColumn, null == t ? void 0 : t.preserveFocus )
    }
    getHtml( e ) {
      const t = o.workspace.getConfiguration( "simpleBrowser" ),
        n = ( new Date ).getTime() + "" + ( new Date ).getMilliseconds(),
        r = this.extensionResourceUrl( "media", "index.js" ),
        i = this.extensionResourceUrl( "media", "main.css" ),
        a = this.extensionResourceUrl( "media", "codicon.css" );
      return `<!DOCTYPE html>\n\t\t\t<html>\n\t\t\t<head>\n\t\t\t\t<meta http-equiv="Content-type" content="text/html;charset=UTF-8">\n\t\t\t\t<meta http-equiv="Content-Security-Policy" content="\n\t\t\t\t\tdefault-src 'none';\n\t\t\t\t\tfont-src ${ this._webviewPanel.webview.cspSource };\n\t\t\t\t\tstyle-src ${ this._webviewPanel.webview.cspSource };\n\t\t\t\t\tscript-src 'nonce-${ n }';\n\t\t\t\t\tframe-src *;\n\t\t\t\t\t">\n\t\t\t\t<meta id="simple-browser-settings" data-settings="${ l = JSON.stringify( { url: e, focusLockEnabled: t.get( "focusLockIndicator.enabled", !0 ) } ), l.toString().replace( /"/g, "&quot;" ) }">\n\t\t\t\t<link rel="stylesheet" type="text/css" href="${ i }">\n\t\t\t\t<link rel="stylesheet" type="text/css" href="${ a }">\n\t\t\t</head>\n\t\t\t<body>\n\t\t\t\t<header class="header">\n\t\t\t\t\t<nav class="controls">\n\t\t\t\t\t\t<button\n\t\t\t\t\t\t\ttitle="${ s( 0, null ) }"\n\t\t\t\t\t\t\tclass="back-button icon"><i class="codicon codicon-arrow-left"></i></button>\n\t\t\t\t\t\t<button\n\t\t\t\t\t\t\ttitle="${ s( 1, null ) }"\n\t\t\t\t\t\t\tclass="forward-button icon"><i class="codicon codicon-arrow-right"></i></button>\n\t\t\t\t\t\t<button\n\t\t\t\t\t\t\ttitle="${ s( 2, null ) }"\n\t\t\t\t\t\t\tclass="reload-button icon"><i class="codicon codicon-refresh"></i></button>\n\t\t\t\t\t</nav>\n\t\t\t\t\t<input class="url-input" type="text">\n\t\t\t\t\t<nav class="controls">\n\t\t\t\t\t\t<button\n\t\t\t\t\t\t\ttitle="${ s( 3, null ) }"\n\t\t\t\t\t\t\tclass="open-external-button icon"><i class="codicon codicon-link-external"></i></button>\n\t\t\t\t\t</nav>\n\t\t\t\t</header>\n\t\t\t\t<div class="content">\n\t\t\t\t\t<div class="iframe-focused-alert">${ s( 4, null ) }</div>\n\t\t\t\t\t<iframe sandbox="allow-scripts allow-forms allow-same-origin"></iframe>\n\t\t\t\t</div>\n\t\t\t\t<script src="${ r }" nonce="${ n }"><\/script>\n\t\t\t</body>\n\t\t\t</html>`;
      var l
    }
    extensionResourceUrl( ...e ) {
      return this._webviewPanel.webview.asWebviewUri( o.Uri.joinPath( this.extensionUri, ...e ) )
    }
  }
  t.SimpleBrowserView = a, a.viewType = "simpleBrowser.view", a.title = s( 5, null )
}, function ( e, t, n ) {
  "use strict";

  function o( e ) {
    for ( ; e.length; ) {
      const t = e.pop();
      t && t.dispose()
    }
  }
  Object.defineProperty( t, "__esModule", {
    value: !0
  } ), t.Disposable = t.disposeAll = void 0, t.disposeAll = o;
  t.Disposable = class {
    constructor() {
      this._isDisposed = !1, this._disposables = []
    }
    dispose() {
      this._isDisposed || ( this._isDisposed = !0, o( this._disposables ) )
    }
    _register( e ) {
      return this._isDisposed ? e.dispose() : this._disposables.push( e ), e
    }
    get isDisposed() {
      return this._isDisposed
    }
  }
} ] ) );
//# sourceMappingURL=https://ticino.blob.core.windows.net/sourcemaps/054a9295330880ed74ceaedda236253b4f39a335/extensions/simple-browser/dist/extension.js.map
