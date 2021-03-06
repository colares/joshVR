var xhr = new XMLHttpRequest;

function post (content) {
  xhr.open('post', 'https://api.github.com/gists');
  xhr.onload = function () {
    var rateLimit = getRateLimitInfoFromHeaders(xhr);
    info(xhr.response.html_url, rateLimit.left, rateLimit.total);
  };
  xhr.responseType = 'json';
  xhr.send(JSON.stringify({
    "description": "joshVR snapshot",
    "public": true,
    "files": {
      "joshVR.xml": {
        "content": content,
      }
    }
  }));
};

function getRateLimitInfoFromHeaders (xhr) {
  return {
    total: xhr.getResponseHeader('X-RateLimit-Limit'),
    left: xhr.getResponseHeader('X-RateLimit-Remaining'),
    reset: xhr.getResponseHeader('X-RateLimit-Reset'),
  };
};

function createLoadShareButtons (onLoad, onShare) {
  var div = document.createElement('div');
  div.id = 'share';
  var load = document.createElement('button');
  load.textContent = 'load';
  load.addEventListener('click', onLoad);
  div.appendChild(load);
  var share = document.createElement('button');
  share.textContent = 'share'
  share.addEventListener('click', onShare);
  div.appendChild(share);
  var a = document.createElement('a');
  a.href = 'https://gist.github.com/search?utf8=%E2%9C%93&q=joshVR+filename%3AjoshVR.xml+anon%3Atrue+language%3Axml';
  a.textContent = 'Search for more'
  div.appendChild(a);
  var p = document.createElement('p');
  p.textContent = '. ';
  div.appendChild(p);
  document.body.appendChild(div);
};

function findOrCreateById (tag, id) {
  var ele = document.getElementById(id);
  if (!ele) {
    ele = document.createElement(tag);
    ele.id = id;
  }
  return ele;
};

function info (url, rateLimit, rateLimitTotal) {
  var share = document.getElementById('share');
  var p = findOrCreateById('p', 'shareInfo');
  p.innerHTML = '';
  var a = document.createElement('a');
  a.href = url;
  a.textContent = url;
  p.appendChild(a);
  p.appendChild(document.createTextNode(', ' + rateLimit + ' / ' + rateLimitTotal +
    ' shares left this hour. '));
  share.appendChild(p);
};

module.exports = {
  post: post,
  createLoadShareButtons: createLoadShareButtons,
};

