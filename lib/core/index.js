'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = require('../lib/util');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var assign = require('es6-object-assign').assign;

var defaults = {
  channel: 'youtube',
  youtube: {
    autoplay: 1,
    cc_load_policy: 1,
    color: null,
    controls: 1,
    disablekb: 0,
    enablejsapi: 0,
    end: null,
    fs: 1,
    h1: null,
    iv_load_policy: 1,
    list: null,
    listType: null,
    loop: 0,
    modestbranding: null,
    origin: null,
    playlist: null,
    playsinline: null,
    rel: 0,
    showinfo: 1,
    start: 0,
    wmode: 'transparent',
    theme: 'dark'
  },
  ratio: '16:9',
  vimeo: {
    api: false,
    autopause: true,
    autoplay: true,
    byline: true,
    callback: null,
    color: null,
    height: null,
    loop: false,
    maxheight: null,
    maxwidth: null,
    player_id: null,
    portrait: true,
    title: true,
    width: null,
    xhtml: false
  },
  allowFullScreen: true,
  animationSpeed: 300,
  classNames: {
    modalVideo: 'modal-video',
    modalVideoClose: 'modal-video-close',
    modalVideoBody: 'modal-video-body',
    modalVideoInner: 'modal-video-inner',
    modalVideoIframeWrap: 'modal-video-movie-wrap',
    modalVideoCloseBtn: 'modal-video-close-btn'
  },
  aria: {
    openMessage: 'You just openned the modal video',
    dismissBtnMessage: 'Close the modal by clicking here'
  }
};

var ModalVideo = function () {
  function ModalVideo(ele, option) {
    var _this = this;

    _classCallCheck(this, ModalVideo);

    var opt = assign({}, defaults, option);
    var selectors = typeof ele === 'string' ? document.querySelectorAll(ele) : ele;
    var body = document.querySelector('body');
    var classNames = opt.classNames;
    var speed = opt.animationSpeed;
    [].forEach.call(selectors, function (selector) {
      selector.addEventListener('click', function () {
        var videoId = selector.dataset.videoId;
        var id = (0, _util.getUniqId)();
        var html = _this.getHtml(opt, videoId, id);
        (0, _util.append)(body, html);
        var modal = document.querySelector('#' + id);
        var btn = modal.querySelector('.js-modal-video-dismiss-btn');
        modal.focus();
        modal.addEventListener('click', function () {
          (0, _util.addClass)(modal, classNames.modalVideoClose);
          setTimeout(function () {
            (0, _util.remove)(modal);
            selector.focus();
          }, speed);
        });
        modal.addEventListener('keydown', function (e) {
          if (e.which === 9) {
            e.preventDefault();
            if (document.activeElement === modal) {
              btn.focus();
            } else {
              modal.setAttribute('aria-label', '');
              modal.focus();
            }
          }
        });
        btn.addEventListener('click', function () {
          (0, _util.triggerEvent)(modal, 'click');
        });
      });
    });
  }

  _createClass(ModalVideo, [{
    key: 'getPadding',
    value: function getPadding(ratio) {
      var arr = ratio.split(':');
      var width = Number(arr[0]);
      var height = Number(arr[1]);
      var padding = height * 100 / width;
      return padding + '%';
    }
  }, {
    key: 'getQueryString',
    value: function getQueryString(obj) {
      var url = '';
      Object.keys(obj).forEach(function (key) {
        url += key + '=' + obj[key] + '&';
      });
      return url.substr(0, url.length - 1);
    }
  }, {
    key: 'getVideoUrl',
    value: function getVideoUrl(opt, videoId) {
      if (opt.channel === 'youtube') {
        return this.getYoutubeUrl(opt.youtube, videoId);
      } else if (opt.channel === 'vimeo') {
        return this.getVimeoUrl(opt.vimeo, videoId);
      }
      return '';
    }
  }, {
    key: 'getVimeoUrl',
    value: function getVimeoUrl(vimeo, videoId) {
      var query = this.getQueryString(vimeo);
      return '//player.vimeo.com/video/' + videoId + '?' + query;
    }
  }, {
    key: 'getYoutubeUrl',
    value: function getYoutubeUrl(youtube, videoId) {
      var query = this.getQueryString(youtube);
      return '//www.youtube.com/embed/' + videoId + '?' + query;
    }
  }, {
    key: 'getHtml',
    value: function getHtml(opt, videoId, id) {
      var videoUrl = this.getVideoUrl(opt, videoId);
      var padding = this.getPadding(opt.ratio);
      var classNames = opt.classNames;
      return '\n      <div class="' + classNames.modalVideo + '" tabindex="-1" role="dialog" aria-label="' + opt.aria.openMessage + '" id="' + id + '">\n        <div class="' + classNames.modalVideoBody + '">\n          <div class="' + classNames.modalVideoInner + '">\n            <div class="' + classNames.modalVideoIframeWrap + '" style="padding-bottom:' + padding + '">\n              <button class="' + classNames.modalVideoCloseBtn + ' js-modal-video-dismiss-btn" aria-label="' + opt.aria.dismissBtnMessage + '"></button>\n              <iframe width=\'460\' height=\'230\' src="' + videoUrl + '" frameborder=\'0\' allowfullscreen=' + opt.allowFullScreen + ' tabindex="-1"/>\n            </div>\n          </div>\n        </div>\n      </div>\n    ';
    }
  }]);

  return ModalVideo;
}();

exports.default = ModalVideo;
module.exports = exports['default'];