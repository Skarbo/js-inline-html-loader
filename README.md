# JavaScript Inline HTML Loader

A webpack loader for loading HTML modules inline in JS.

Can be used to reduce number of modules that are imported.

```
import exampleImport from 'example.html';

const exampleRequire = require( './example.html' );
```

becomes

```
var exampleImport = "<div> <h1 class=\"test long class\">HTML</h1> <div> Should 'be' \"inlined\" </div> </div>";
var exampleRequire = "<div> <h1 class=\"test long class\">HTML</h1> <div> Should 'be' \"inlined\" </div> </div>";
```

## Usage

**Install**

`npm install --save js-inline-html-loader`

**webpack.config.js**
```
module: {
    rules: [
        {
            test: /.js$/,
            exclude: /(node_modules)/,
            loader: 'js-inline-html-loader',
            enforce: 'pre', // enforce pre to do the inline before babel-loader
            options: { // use html-loader options
                minimize: true,
                removeComments: true,
                exportAsEs6Default: true,
                collapseWhitespace: true,
            },
        },
        // ...
    ],
    // ...
}
```

## html-loader

Loader uses [html-loader](https://github.com/webpack-contrib/html-loader) to prepare HTML files.

Pass `html-loader` options into `js-inline-html-loader` options.

## Example

Se `example/` folder for example.

Run `npm run webpack` to build a `example/example.bundle.js` bundle file.