// *************************************
//
//   Application
//   -> Global scripts
//
// *************************************

// -------------------------------------
//   Namespace
// -------------------------------------

// ----- JavaScript.com ----- //

var JS = {};

JS.Globals  = {},
JS.Classes  = {},
JS.Helpers  = {},
JS.Modules  = {},
JS.Pages    = {},
JS.Services = {},
JS.Inbox    = {};

// -------------------------------------
//   Globals
// -------------------------------------

JS.Globals = {
  homepageChallengeAnswer : /^['"][A-z-\.\s]*['"](;)?/
};

// -------------------------------------
//   Document Ready
// -------------------------------------

jQuery(function($) {

  // ----- Dispatcher ----- //

  new JS.Classes.Dispatcher({
    events: [
      { page  : 'home',      run : function() { JS.Pages.Home(); } },
      { match : 'news',      run : function() { JS.Pages.News(); } },
      { page  : 'news:new',  run : function() { JS.Pages.News.New(); } },
      { page  : 'news:show', run : function() { JS.Pages.News.Show(); } }
    ]
  });

});

// -------------------------------------
//   Inbox
// -------------------------------------

$('a:contains("Next Challenge")').on('click', function() {
  var name = $('.js-inlineConsole-input').val().replace(/['";]/g, '');

  document.cookie = 'try_name=' + name;
});

jQuery(function($) {
  $('.js-courseLayout-toggle').on('click', function(event) {
    $('.js-courseLayout').toggleClass('is-active')
  });
});
