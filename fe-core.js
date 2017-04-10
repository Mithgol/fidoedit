/*global window, $, nw, autosize, twemoji */
var fs = nw.require('fs');
var os = nw.require('os');
var async = nw.require('async');
var escapeHTML = nw.require('lodash.escape');
var fiunis = nw.require('fiunis');
var iconv = nw.require('iconv-lite');

var FidoHTML = nw.require('fidohtml')({
   dataMode: true,
   URLPrefixes: {
      '*': '', // default
      fs: IPFSURL => IPFSURL.replace( /^fs:\/*/g, 'https://ipfs.io/' ),
      ipfs: IPFSURL => IPFSURL.replace( /^ipfs:\/*/g, 'https://ipfs.io/' )
   }
});

var emojify = $container => {
   if( twemoji ) twemoji.parse( $container[0] );
};

$.fn.extend({
   animateCSS: function(animationName, onFinish){
      var animationEnd = 'animationend';
      this.addClass('animated ' + animationName).one(animationEnd, function(){
         $(this).removeClass('animated ' + animationName);
         if( typeof onFinish === 'function' ) onFinish.call(this);
      });
   }
});

var msDelay = 500;

var errorCLI = errHTML => $('.purposeMain').html([
   '<div class="alert alert-danger" role="alert">',
   errHTML, '</div>'
].join(''));

var previewClickHandler = function(){
   var safeSchemes = [
      'http',
      'https',
      'ftp',
      'mailto',
      'ed2k',
      'facetime',
      'feed',
      'geo',
      'irc',
      'ircs',
      'magnet',
      'news',
      'nntp',
      'sip',
      'sips',
      'skype',
      'sms',
      'ssh',
      'tel',
      'telnet',
      'tftp',
      'xmpp'
   ];

   var $this = $(this);
   var URL = $this.data('href');

   var separatorPosition = URL.indexOf(':');
   if( separatorPosition < 0 ) return false;

   var schemeLC = URL.slice(0, separatorPosition).toLowerCase();
   if( safeSchemes.includes(schemeLC) ){
      nw.Shell.openExternal(URL);
   }

   return false;
};

var convertFileToText = (filePath, fileDone) => async.waterfall([
   callback => fs.readFile(filePath, callback),
   (fileBuf, callback) => callback(null,
      fiunis.decode( iconv.decode(fileBuf, 'cp866') )
   )
], fileDone);

var convertTextareaToFile = ($textarea, filePath, fileDone) => fs.writeFile(
   filePath,
   fiunis.encode( $textarea.val().replace(/\n/g, os.EOL), 'cp866' ),
   fileDone
);

var textareaGoToLine = ($textarea, lineNum) => {
   var prevCharCount = $textarea.val().split( /(\n)/ ).reduce(
      (prevCnt, nextItem, idx) => (
         idx < (lineNum - 1 ) * 2
      ) ? prevCnt + nextItem.length : prevCnt,
      0
   );
   $textarea.focus()[0].setSelectionRange(prevCharCount, prevCharCount);
};

$(() => {
   $('.purposeFastQuit').on('click', () => void process.exit());

   var paramsCLI = nw.App.argv;

   var addrIPFS = paramsCLI.find( param => param.startsWith('--ipfs=') );
   if( typeof addrIPFS !== 'undefined') addrIPFS.slice( '--ipfs='.length );

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
   if( ! /^\d+$/.test(''+lineNum) || lineNum < 1 ) lineNum = 1;

   convertFileToText(msgFilePath, (err, fileText) => {
      if( err ) return errorCLI(
         `Error reading «${ escapeHTML(msgFilePath) }».`
      );

      nw.Window.get().maximize();

      $('.purposeMain').html(
        `<textarea>${fileText}</textarea><div class="previewArea"></div>`
      );

      var $textarea = $('.purposeMain textarea');
      var $preview = $('.purposeMain .previewArea');

      autosize($textarea);
      textareaGoToLine($textarea, lineNum);

      nw.Window.get().on('close', function(){
         var thisWin = this;
         thisWin.hide(); // imitate closing, prevent futher `close` events
         convertTextareaToFile(
            $('.purposeMain textarea'),
            msgFilePath,
            ( /* err */ ) => thisWin.close(true) // ignore `err`, force close
         );
      });

      $('.tabPreview').on('click', function(){
         var $this = $(this);
         $('.tabWrite').data(
            'scrolltop', $(window).scrollTop()
         ).removeClass('active');
         $this.addClass('active');

         $textarea.animateCSS('fadeOutUp', function(){
            $textarea.hide();
            $preview.empty().show().html(
               FidoHTML.fromText( $textarea.val() )
            ).find('img').each(function(){ // possible TODO: image filtering
               var $this = $(this);
               $this.attr('src', $this.data('src'));
            });
            emojify($preview);
            $.scrollTo($this.data('scrolltop'), {
               duration: msDelay,
               axis: 'y'
            });
         });
      });

      $('.tabWrite').on('click', function(){
         var $this = $(this);
         $('.tabPreview').data(
            'scrolltop', $(window).scrollTop()
         ).removeClass('active');
         $this.addClass('active');

         $preview.animateCSS('fadeOutUp', function(){
            $preview.hide().empty();
            $textarea.show();
            autosize.update($textarea);
            $textarea.focus();
            $.scrollTo($this.data('scrolltop'), {
               duration: msDelay,
               axis: 'y'
            });
         });
      });

      $preview.on('click', 'a[data-href]', previewClickHandler);
   });
});
