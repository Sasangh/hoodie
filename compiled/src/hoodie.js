// Generated by CoffeeScript 1.3.3
var Hoodie,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Hoodie = (function(_super) {

  __extends(Hoodie, _super);

  Hoodie.modules = {
    store: 'LocalStore',
    config: 'Config',
    account: 'Account',
    remote: 'AccountRemote'
  };

  Hoodie.extensions = {
    user: 'User',
    global: 'Global',
    email: 'Email',
    share: 'Share'
  };

  Hoodie.extend = function(name, Module) {
    return this.extensions[name] = Module;
  };

  function Hoodie(baseUrl) {
    this.baseUrl = baseUrl != null ? baseUrl : '';
    this.baseUrl = this.baseUrl.replace(/\/+$/, '');
    this._loadModules(this.constructor.modules);
    this._loadModules(this.constructor.extensions);
  }

  Hoodie.prototype.request = function(type, path, options) {
    var defaults;
    if (options == null) {
      options = {};
    }
    defaults = {
      type: type,
      url: "" + this.baseUrl + path,
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
      dataType: 'json'
    };
    return $.ajax($.extend(defaults, options));
  };

  Hoodie.prototype.open = function(store_name, options) {
    if (options == null) {
      options = {};
    }
    $.extend(options, {
      name: store_name
    });
    return new Hoodie.RemoteStore(this, options);
  };

  Hoodie.prototype.defer = $.Deferred;

  Hoodie.prototype.uuid = function(len) {
    var chars, i, radix;
    if (len == null) {
      len = 7;
    }
    chars = '0123456789abcdefghijklmnopqrstuvwxyz'.split('');
    radix = chars.length;
    return ((function() {
      var _i, _results;
      _results = [];
      for (i = _i = 0; 0 <= len ? _i < len : _i > len; i = 0 <= len ? ++_i : --_i) {
        _results.push(chars[0 | Math.random() * radix]);
      }
      return _results;
    })()).join('');
  };

  Hoodie.prototype.isPromise = function(obj) {
    return typeof (obj != null ? obj.done : void 0) === 'function' && typeof obj.resolve === 'undefined';
  };

  Hoodie.prototype._loadModules = function(modules, context) {
    var instanceName, moduleName, namespace, _results;
    if (modules == null) {
      modules = this.constructor.modules;
    }
    if (context == null) {
      context = this;
    }
    _results = [];
    for (instanceName in modules) {
      moduleName = modules[instanceName];
      switch (typeof moduleName) {
        case 'string':
          _results.push(context[instanceName] = new Hoodie[moduleName](this));
          break;
        case 'function':
          _results.push(context[instanceName] = new moduleName(this));
          break;
        default:
          namespace = instanceName;
          context[namespace] || (context[namespace] = {});
          _results.push(this._loadModules(modules[namespace], context[namespace]));
      }
    }
    return _results;
  };

  return Hoodie;

})(Events);
