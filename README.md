[![(a histogram of downloads)](https://nodei.co/npm-dl/fidoedit.png?height=3)](https://npmjs.org/package/fidoedit)

This application (**FidoEdit**) is a FGHI-compatible editor of Fidonet messages.

It is designed to be called by a GoldED-compatible editor (such as GoldED+ or GoldED-NSF) when it calls an external editor.

This application is written in JavaScript and requires [Node.js](http://nodejs.org/) to run.

This application is currently in an early phase of its development and thus does not have the desired level of feature completeness.

## Installing FidoEdit

[![(npm package version)](https://nodei.co/npm/fidoedit.png?downloads=true&downloadRank=true)](https://npmjs.org/package/fidoedit)

* Latest packaged version: `npm install fidoedit`

* Latest githubbed version: `npm install https://github.com/Mithgol/fidoedit/tarball/master`

You may visit https://github.com/Mithgol/fidoedit#readme occasionally to read the latest `README` because the package's version is not planned to grow after changes when they happen in `README` only. (And `npm publish --force` is [forbidden](http://blog.npmjs.org/post/77758351673/no-more-npm-publish-f) nowadays.)

## Testing FidoEdit

It is necessary to install [JSHint](http://jshint.com/) for testing.

* You may install JSHint globally (`npm install jshint -g`) or locally (`npm install jshint` in the directory of FidoEdit).

After that you may run `npm test` (in the directory of FidoEdit). Only the JS code errors are caught; the code's behaviour is not tested.

## License

MIT license (see the `LICENSE` file).
