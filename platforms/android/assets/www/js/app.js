'use strict';
var module = angular.module('app', ['onsen']);

window.addEventListener("statusTap", function() {
  alert("status tap");
  window.plugins.socialsharing.share('Stuvo Nieuws: ', null, null, 'TESTTT');
});