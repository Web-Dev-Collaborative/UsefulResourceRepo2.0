# Concepts | webpack

> webpack is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser, yet it is also capable of transforming, bundling, or packaging just about any resource or asset.

At its core, **webpack** is a _static module bundler_ for modern JavaScript applications. When webpack processes your application, it internally builds a [dependency graph](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/concepts/dependency-graph/) which maps every module your project needs and generates one or more _bundles_.

Since version 4.0.0, **webpack does not require a configuration file** to bundle your project. Nevertheless, it is [incredibly configurable](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/configuration) to better fit your needs.

To get started you only need to understand its **Core Concepts**:

- [Entry](#entry)
- [Output](#output)
- [Loaders](#loaders)
- [Plugins](#plugins)
- [Mode](#mode)
- [Browser Compatibility](#browser-compatibility)

This document is intended to give a **high-level** overview of these concepts, while providing links to detailed concept-specific use cases.

For a better understanding of the ideas behind module bundlers and how they work under the hood, consult these resources:

- [Manually Bundling an Application](https://www.youtube.com/watch?v=UNMkLHzofQI)
- [Live Coding a Simple Module Bundler](https://www.youtube.com/watch?v=Gc9-7PBqOC8)
- [Detailed Explanation of a Simple Module Bundler](https://github.com/ronami/minipack)

## Entry

An **entry point** indicates which module webpack should use to begin building out its internal [dependency graph](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/concepts/dependency-graph/). webpack will figure out which other modules and libraries that entry point depends on (directly and indirectly).

By default its value is `./src/index.js`, but you can specify a different (or multiple entry points) by setting an [`entry` property in the webpack configuration](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/configuration/entry-context/#entry). For example:

**webpack.config.js**

    module.exports = {
      entry: './path/to/my/entry/file.js',
    };

## Output

The **output** property tells webpack where to emit the _bundles_ it creates and how to name these files. It defaults to `./dist/main.js` for the main output file and to the `./dist` folder for any other generated file.

You can configure this part of the process by specifying an `output` field in your configuration:

**webpack.config.js**

    const path = require('path');

    module.exports = {
      entry: './path/to/my/entry/file.js',
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'my-first-webpack.bundle.js',
      },
    };

In the example above, we use the `output.filename` and the `output.path` properties to tell webpack the name of our bundle and where we want it to be emitted to. In case you're wondering about the path module being imported at the top, it is a core [Node.js module](https://nodejs.org/api/modules.html) that gets used to manipulate file paths.

## Loaders

Out of the box, webpack only understands JavaScript and JSON files. **Loaders** allow webpack to process other types of files and convert them into valid [modules](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/concepts/modules) that can be consumed by your application and added to the dependency graph.

At a high level, **loaders** have two properties in your webpack configuration:

1.  The `test` property identifies which file or files should be transformed.
2.  The `use` property indicates which loader should be used to do the transforming.

**webpack.config.js**

    const path = require('path');

    module.exports = {
      output: {
        filename: 'my-first-webpack.bundle.js',
      },
      module: {
        rules: [{ test: /\.txt$/, use: 'raw-loader' }],
      },
    };

The configuration above has defined a `rules` property for a single module with two required properties: `test` and `use`. This tells webpack's compiler the following:

> "Hey webpack compiler, when you come across a path that resolves to a '.txt' file inside of a `require()`/`import` statement, **use** the `raw-loader` to transform it before you add it to the bundle."

You can check further customization when including loaders in the [loaders section](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/concepts/loaders).

## Plugins

While loaders are used to transform certain types of modules, plugins can be leveraged to perform a wider range of tasks like bundle optimization, asset management and injection of environment variables.

In order to use a plugin, you need to `require()` it and add it to the `plugins` array. Most plugins are customizable through options. Since you can use a plugin multiple times in a configuration for different purposes, you need to create an instance of it by calling it with the `new` operator.

**webpack.config.js**

    const HtmlWebpackPlugin = require('html-webpack-plugin');
    const webpack = require('webpack');

    module.exports = {
      module: {
        rules: [{ test: /\.txt$/, use: 'raw-loader' }],
      },
      plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
    };

In the example above, the `html-webpack-plugin` generates an HTML file for your application by injecting automatically all your generated bundles.

Using plugins in your webpack configuration is straightforward. However, there are many use cases that are worth further exploration. [Learn more about them here](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/concepts/plugins).

## Mode

By setting the `mode` parameter to either `development`, `production` or `none`, you can enable webpack's built-in optimizations that correspond to each environment. The default value is `production`.

    module.exports = {
      mode: 'production',
    };

Learn more about the [mode configuration here](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/configuration/mode) and what optimizations take place on each value.

## Browser Compatibility

webpack supports all browsers that are [ES5-compliant](https://kangax.github.io/compat-table/es5/) (IE8 and below are not supported). webpack needs `Promise` for [`import()` and `require.ensure()`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/guides/code-splitting/#dynamic-imports). If you want to support older browsers, you will need to [load a polyfill](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/guides/shimming/) before using these expressions.

## Environment

webpack 5 runs on Node.js version 10.13.0+.

[Source](https://webpack.js.org/concepts/#entry)
