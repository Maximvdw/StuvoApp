'use strict';
var module = angular.module('app', ['onsen']);

window.addEventListener("statusTap", function() {
    var target = $("#scroller");

    //disable touch scroll
    target.css({
        '-webkit-overflow-scrolling' : 'auto',
        'overflow-y' : 'hidden'
    });

    //animate
    target.animate({ scrollTop: 0}, 300, "swing", function(){

        //re-enable touch scrolling
        target.css({
            '-webkit-overflow-scrolling' : 'touch',
            'overflow-y' : 'scroll'
        });
    });
});