/*global $, emojify: true, nw, twemoji */

/* var; TODO: use it */ emojify = () => {
   if( twemoji ) twemoji.parse( $('body')[0] );
};

var errorCLI = errHTML => $('.purposeMain').html([
   '<div class="alert alert-danger" role="alert">',
   errHTML, '</div>'
].join(''));

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

   $('.purposeMain').html(
      `File «<b>${msgFilePath}</b>», line <b>${lineNum}.</b>`
   );
});
