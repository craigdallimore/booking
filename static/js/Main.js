(function(App, $) {

    function init() {
        var formView = new App.FormView({ el: $('#booking form') });
        var tabsView = new App.TabsView({ el: $('#tabs') });
        var listView = new App.ListView({ el: $('#listings ul') });
    }


    App.init = init;

} (App, jQuery));

$('document').ready(function() {
    App.init();
});
