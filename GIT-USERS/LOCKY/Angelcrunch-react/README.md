# Angelcrunch-react
Example Javascript ES6 project with React, React Router, jQuery, Flux (Alt) and webpack.

This example is a medium complexity single-page application, I’ll be assuming you’re familiar with Webpack, React, alt, CommonJS. I hope the example will give you some inspiration.

Another simpler,  more detailed tutorial，[here](https://underthehood.myob.com/changing-of-the-guard-in-web-technologies/).

## Feature
* Single page Application
* Modular design
* Asynchronously loading file 
* ES6
* React
* Flux

## Requirements
Make sure you have installed NodeJS and NPM first and that you can run them from the command line.

* Run `npm install` first to install dependencies

## Build
### Development
    
Start the Webpack dev server. The server setting in `webpack.config.js`.

    npm run watch

Open url `http://localhost:9090/`.

### Publishing
Build the project.

    npm run dist
Start the Webpack dev server. The server setting in `server.js`.

    npm run server
Open url `http://localhost:19010/`.



## Use
* [React](https://facebook.github.io/react/)
* [Babel](http://babeljs.io)
* [React Router](https://github.com/rackt/react-router)
* [jQuery](http://jquery.com)
* [Flux(Alt)](http://alt.js.org)
* [webpack](http://webpack.github.io)

## Server
* webpack-dev-server (Development)
* [pushstate-server](https://github.com/scottcorgan/pushstate-server) (Publishing)


## THE STRUCTURE
node_modules/ + 

src/ +  

—— | app/

—— | actions/

—— | components/

—— | stores/

—— | utils/

—— index.html

—— module.js

—— routes.js

## webpack.config.js

    var webpack         = require('webpack'),
    HtmlWebpackPlugin   = require('html-webpack-plugin'),
    path                = require('path'),
    staticResourcePath  = path.join(__dirname, 'static'),
    srcPath             = path.join(__dirname, 'src'),
    nodeModulesPath     = path.join(__dirname, 'node_modules');
    var isProduction = function () {
        return process.env.NODE_ENV === 'production';
    }

    var modulePath = {...
        },
        moduleAlias = isProduction() ?
                      { // production
                        ...
                        } :
                      { // dev
                          ... },
        noParse = isProduction() ?
                      [modulePath.React,
                        modulePath.alt,
                        modulePath.jquery,
                        modulePath.showdown,
                        modulePath.React_addons,
                        'react-mixin'
                      ] : [];

`moduleAlias` will using the full path instead of the `alias` when the project is published, webpack will use smaller libraries to build project.

[`noParse`](http://webpack.github.io/docs/configuration.html#module-noparse) matched against the full resolved request. This can boost the performance when ignoring big libraries and speed up compilation.


    // Project config
    var page = {
      settings: {
        AjaxDomain: 'mobile.' + 'tonghs.me'
      }
    };
    
    var defineStatePlugin = new webpack.DefinePlugin({
        __DEV__: JSON.stringify(JSON.parse(process.env.NODE_ENV === 'production' ? 'false' : 'true')),
        __AjaxDomain: JSON.stringify(page.settings.AjaxDomain)
    });

Write project configuration in `WebPack.config.js` , or you can to distinguish the development mode and release mode in this file. That you can...

    // src/utils/ajaxMapping.js
    var Domain = __AjaxDomain;
    
    export const Ajax={...

--------


    // webpack.config.js
    module.exports = {
        target: 'web',
        cache: true,
        entry: {
                ...
                common  : ['jquery', 'react', 'react-router', 'alt', 'react-mixin', 'utils/titleHelper']
        },
        resolve: {
            ...
        },
        output: {
            ...
        },
    
        module: {
                ...
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin('common', 'common.js'),
            new HtmlWebpackPlugin({
                inject: true,
                excludeChunks: ['test'],
                template: 'src/index.html'
            }),
            ...
            defineStatePlugin
        ],
        debug: isProduction() ? false : true,
        devtool: isProduction() ? '' 
                                : 'eval-cheap-module-source-map',
        devServer: {
            ...
        }
    };

These configurations you can click [here](http://webpack.github.io/docs/configuration.html) to view them, [Plugins](http://webpack.github.io/docs/list-of-plugins.html), [Loaders](http://webpack.github.io/docs/list-of-loaders.html).

`CommonsChunkPlugin` is specifically for bundling our separate dependencies together in one common bundle.

`HtmlWebpackPlugin` will take our index.html as a template and automatically inject the scripts tags to load our common.js and module.js bundles.

[`devtool`](http://webpack.github.io/docs/configuration.html#devtool) You can choose a developer tool to enhance debugging. `eval-cheap-module-source-map` allows you to get the source code to debug,  close `devtool` in publishing, you will get the smallest js files.


## How requests are processed?
1.  The server(React-router) receives a request: `http://localhost:19010/items`.
2.  `src/routes.js` find `projectList` app.
3.  `app/project/list.js` asynchronously loading of style sheets and component.
4.  In `components/project/list`,  send Ajax in `componentDidMount` after the initial rendering, the data will receive and save data through `ListInfoAction`, render this page.