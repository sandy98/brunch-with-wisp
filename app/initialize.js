var utils = require('lib/utils');

;$(function () { 
  // alert("Barebones Brunch with a touch of Wisp utils.\nUtils version " + utils.version);
  $('form').on('submit', function(ev) {
    if (ev && ev.preventDefault) {ev.preventDefault();}
    $('#result').text(utils.factorial(parseInt($('#txt-n').val())));
    return false;
  });
});
  
  
  
  