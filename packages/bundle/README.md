# Bundle
This project contains the bundling scripts to package browser and node projects using [webpack](https://webpack.js.org/).

## Browser bundling

The browser bundling configuration supports both bundling for production and running a hot-realoding development server using react.

## Plugins used

Each bundle configuration uses several plugins. This table contains a brief explanation of what it does and why it is used.

Name|client.dev|client.prod|server.prod|Description
-|-|-|-|-
[`fork-ts-checker-webpack-plugin`](https://github.com/TypeStrong/fork-ts-checker-webpack-plugin)|✅|✅|✅|Because Babel does not do type-checking when transpiling typescript we need a separate mechanism for this. This plugin handles type-checking in a separate process which speeds it up.
