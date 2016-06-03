var $ = document.querySelectorAll.bind(document)
var $$ = document.querySelector.bind(document)
Element.prototype.on = Element.prototype.addEventListener;
Element.prototype.hasClassName = function (a) {
    return new RegExp("(?:^|\\s+)" + a + "(?:\\s+|$)").test(this.className);
};

Element.prototype.addClassName = function (a) {
    if (!this.hasClassName(a)) {
        this.className = [this.className, a].join(" ");
    }
};

Element.prototype.removeClassName = function (b) {
    if (this.hasClassName(b)) {
        var a = this.className;
        this.className = a.replace(new RegExp("(?:^|\\s+)" + b + "(?:\\s+|$)", "g"), " ");
    }
};

Element.prototype.toggleClassName = function (a) {
  this[this.hasClassName(a) ? "removeClassName" : "addClassName"](a);
};
NodeList.prototype.on = function (event, fn) {
    []['forEach'].call(this, function (el) {
        el.on(event, fn);
    });
    return this;
};
NodeList.prototype.remove = function () {
    []['forEach'].call(this, function (el) {
        el.outerHTML = ''
    });
    return this;
};

function request(type, url, opts, callback) {
  var xhr = new XMLHttpRequest();
  if (typeof opts === 'function') {
    callback = opts;
    opts = null;
  }
  xhr.open(type, url);
  var fd = new FormData();
  if (type === 'POST' && opts) {
    for (var key in opts) {
      fd.append(key, JSON.stringify(opts[key]));
    }
  }
  xhr.onload = function () {
    callback && callback(JSON.parse(xhr.response));
  };
  xhr.send(opts ? fd : null);
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var get = request.bind(this, 'GET');
var post = request.bind(this, 'POST');

export {$, $$, get, post, getParameterByName}