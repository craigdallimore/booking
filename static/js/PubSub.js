/* jQuery Tiny Pub/Sub - v0.7 - 10/27/2011
 * * http://benalman.com/
 * * Copyright (c) 2011 "Cowboy" Ben Alman; Licensed MIT, GPL */

(function(App, $) {

    var o = $({});

    App.subscribe = function() {
        o.on.apply(o, arguments);
    };

    App.unsubscribe = function() {
        o.off.apply(o, arguments);
    };

    App.publish = function() {
        o.trigger.apply(o, arguments);
    };

} (App, jQuery));
