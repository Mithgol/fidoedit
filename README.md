[![(a histogram of downloads)](https://nodei.co/npm-dl/fidoedit.png?height=3)](https://npmjs.org/package/fidoedit)

This application (**FidoEdit**) is a FGHI-compatible editor of Fidonet messages.

FidoEdit is designed to be called by a GoldED-compatible editor (such as GoldED+ or GoldED-NSF) as an external editor.

This application is currently in an early phase of its development and thus does not have the desired level of feature completeness.

## Requirements

* FidoEdit is written in HTML5 + CSS + JavaScript and uses the latest [nw.js](https://github.com/nwjs/nw.js) engine to run. A system supported by nw.js (such as Windows, or Linux, or Mac OS X) is required.

* FidoEdit currently requires **Node.js** and **npm** to be present (installed) on your system; the version of **npm** must be 3.0.0 or greater. (Usually [Node.js installers](https://nodejs.org/en/download/) install both Node.js and npm.)

* FidoEdit currently uses ParaType's fonts of three font families: PT Sans, PT Serif, PT Mono. These families were released by ParaType with an open user license; use the corresponding ParaType's web page ([in English](http://www.paratype.com/public/) or [in Russian](http://www.paratype.ru/public/)) to download these fonts and install them on your system.

## Installing FidoEdit

[![(npm package version)](https://nodei.co/npm/fidoedit.png?downloads=true&downloadRank=true)](https://npmjs.org/package/fidoedit)

### Global installation

* Latest packaged version: `npm install -g fidoedit`

* Latest githubbed version: `npm install -g https://github.com/Mithgol/fidoedit/tarball/master`

The application becomes installed globally (for example, in `node_modules/fidoedit` subdirectory in your Node's directory) and appears in your `PATH`.

You may use `fidoedit` command to run the application.

### Local installation

Instead of the above, download the [ZIP-packed](https://github.com/Mithgol/fidoedit/archive/master.zip) source code of FidoEdit and unpack it to some directory. Then run `npm install --production` in that directory.

Unlike the global installation (`npm -g`), the application does not appear in the `PATH`, and thus you'll have to run it directly from the application's directory. You'll also have to run `node fidoedit` instead of `fidoedit`.

#### Portability of a local installation

If you install FidoEdit in a directory on a portable drive (such as [a USB flash drive](https://en.wikipedia.org/wiki/USB_flash_drive)), you may move it to a different system and run FidoEdit there if the following requirements are met:

* The platform has to be the same (i.e. move from Linux to Linux, or from Windows to Windows, or from Mac OS X to Max OS X).

* The architecture has to be the same (i.e. move from a 32-bit system to 32-bit or from 64-bit system to 64-bit).

* It is also possible to run FidoEdit on a 64-bit Windows if FidoEdit was originally installed on a 32-bit Windows, but not vice versa.

* Node.js has to be installed on the target system.

## Testing FidoEdit

[![(build testing status)](https://img.shields.io/travis/Mithgol/fidoedit/master.svg?style=plastic)](https://travis-ci.org/Mithgol/fidoedit)

It is necessary to install [JSHint](http://jshint.com/) for testing.

* You may install JSHint globally (`npm install jshint -g`) or locally (`npm install jshint` in the directory of FidoEdit).

After that you may run `npm test` (in the directory of FidoEdit). Only the JS code errors are caught; the code's behaviour is not tested.

## License

MIT license (see the `LICENSE` file).
