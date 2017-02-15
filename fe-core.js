﻿/*global $, emojify: true, nw, autosize, twemoji */
var fs = nw.require('fs');
var os = nw.require('os');
var async = nw.require('async');
var escapeHTML = nw.require('lodash.escape');
var fiunis = nw.require('fiunis');
var iconv = nw.require('iconv-lite');

/* var; TODO: use it */ emojify = () => {
   if( twemoji ) twemoji.parse( $('body')[0] );
};

var errorCLI = errHTML => $('.purposeMain').html([
   '<div class="alert alert-danger" role="alert">',
   errHTML, '</div>'
].join(''));

var convertFileToText = (filePath, fileDone) => async.waterfall([
   callback => fs.readFile(filePath, callback),
   (fileBuf, callback) => callback(null,
      iconv.decode(fileBuf, 'cp866')
   )
], fileDone);

var convertTextareaToFile = ($textarea, filePath, fileDone) => fs.writeFile(
   filePath,
   fiunis.encode( $textarea.val().replace(/\n/g, os.EOL), 'cp866' ),
   fileDone
);

$(() => {
   var paramsCLI = nw.App.argv;

   var msgFilePath = paramsCLI.find( param => param.startsWith('--file=') );
   if( typeof msgFilePath === 'undefined') return errorCLI(
      'Filename has not been given.'
   );
   msgFilePath = msgFilePath.slice( '--file='.length );

   var lineNum = paramsCLI.find( param => param.startsWith('--line=') );
   if( typeof lineNum === 'undefined') return errorCLI(
      'Line number has not been given.'
   );
   lineNum = lineNum.slice( '--line='.length );

   convertFileToText(msgFilePath, (err, fileText) => {
      if( err ) return errorCLI(
         `Error reading «${ escapeHTML(msgFilePath) }».`
      );

      nw.Window.get().maximize();

      $('.purposeMain').html(`<textarea>${fileText}</textarea>`);
      autosize($('.purposeMain textarea'));
      $('.purposeMain textarea').focus();

      nw.Window.get().on('close', function(){
         var thisWin = this;
         thisWin.hide(); // imitate closing, prevent futher `close` events
         convertTextareaToFile(
            $('.purposeMain textarea'),
            msgFilePath,
            ( /* err */ ) => thisWin.close(true) // ignore `err`, force close
         );
      });
   });
});
