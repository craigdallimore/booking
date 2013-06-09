(function(App, $) {

    function init() {

        var items = [];

        if (Modernizr.localstorage && localStorage.getItem('bookings')) {
            items = JSON.parse(localStorage.getItem('bookings'));
        }

        var bookingCollection = new App.BookingCollection(items),
            partyModel = new App.PartyModel(),
            formView = new App.FormView({ el: $('#booking form'), model: partyModel }),
            tabsView = new App.TabsView({ el: $('#tabs') }),
            listView = new App.ListView({ el: $('#listings ul') });

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

        formView.bindErrors();
    }

    function saveBookings(_, bookings) {
        if (Modernizr.localstorage && localStorage.getItem('bookings')) {
            items = JSON.parse(localStorage.getItem('bookings'));
        }
    }

    App.subscribe('saveBookings', saveBookings);

    App.init = init;

} (App, jQuery));

$('document').ready(function() {
    App.init();
});
