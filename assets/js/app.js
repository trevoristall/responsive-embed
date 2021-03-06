(function(window, document, undefined) {
  'use strict';

  // Determine support for calc(). (Works in the same way that modernizr does, without the bloat)
  function cssCalc() {
    var el = document.createElement('a');
    el.setAttribute('style', 'width: calc(10px);');
    return !!el.getAttribute('style').length;
  }

  // forEach method, could be shipped as part of an Object Literal/Module
  var forEach = function (arr, callback, scope) {
    for (var i = 0; i < arr.length; i++) {
      callback(i, arr[i]);
    }
  };

  // Supports YouTube, Vimeo, Kickstarter, CollegeHumor, Hulu, Flickr, Vine, VideoPress, DailyMotion, and all other elements with superembed-force class
  var supportedURLs = [
    'youtube.com/embed',
    'player.vimeo.com/video',
    'kickstarter.com/projects',
    'players.brightcove.net',
    'hulu.com/embed',
    'flickr.com/apps/video',
    'vine.co/v/',
    'videopress.com/embed',
    'dailymotion.com/embed'
  ];

  var embeds = document.querySelectorAll('iframe')
  var filtered = [];

  forEach(embeds, function(i, item) {
    if (item.getAttribute('src').indexOf(supportedURLs)) {
      filtered.push(item);
    }
  });

  // If css calc() is supported, use that instead of injecting DIVs
  if (cssCalc()) {
    forEach(filtered, function(i, iframe) {
      if (!iframe.classList.contains('embed-ignore')) {
        iframe.setAttribute('style', 'width: 100%; top: 5px; margin-bottom: -5px; height: calc(100vw * (9/16));');
      }
    });
    // If calc() is NOT supported, inject parent div and apply styles to both the parent and child embed
  } else {
    forEach(filtered, function(i, iframe) {
      if (!(iframe.classList.contains('embed-ignore'))) {
        // Add parent element
        var parent = iframe.parentNode;
        var wrapper = document.createElement('div');

        wrapper.setAttribute('style', 'position: relative; padding-bottom: 53%; /* 16:9 */ padding-top: 25px; height: 0;');
        parent.replaceChild(wrapper, iframe);
        wrapper.appendChild(iframe);
        iframe.setAttribute('style', 'position: absolute; top: 0; left: 0; width: 100%; height: 100%;');
      }
    });
  }
})(window, document, undefined);
