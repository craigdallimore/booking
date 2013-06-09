(function(App, $) {

    function init() {

        var partyModel = new App.PartyModel();

        partyModel.set({
            'fields': {
                'first_name':   { required: true },
                'last_name':    { required: true },
                'dining_date':  { required: true },
                'num_covers':   { required: true },
                'phone':        { required: true },
                'email':        { required: true },
            }
        });

        var formView = new App.FormView({ el: $('#booking form'), model: partyModel });
        var tabsView = new App.TabsView({ el: $('#tabs') });
        var listView = new App.ListView({ el: $('#listings ul') });

        formView.bindErrors();
    }


    App.init = init;

} (App, jQuery));

$('document').ready(function() {
    App.init();
});
