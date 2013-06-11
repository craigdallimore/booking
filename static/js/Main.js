(function(App, $) {

    function init() {

        var bookingCollection = new App.BookingCollection(),
            partyModel =        new App.PartyModel(),

            formView = new App.FormView({
                el: $('#booking form'),
                model: partyModel
            }),

            tabsView = new App.TabsView({
                el: $('#tabs')
            }),

            listView = new App.ListView({
                el: $('#listings ul'),
                collection: bookingCollection,
                itemView: App.BookingItemView
            });

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

        if (Modernizr.localstorage && localStorage.getItem('bookings')) {
            JSON.parse(localStorage.getItem('bookings')).forEach(function(attrs) {
                bookingCollection.push(new App.BookingModel(attrs));
            });
        }

        function addBooking(_, attrs) {
            console.log('add booking', attrs);
            listView.add(new App.BookingModel(attrs));
        }

        App.subscribe('newParty', addBooking);
    }

    App.init = init;

} (App, jQuery));

$('document').ready(function() {
    App.init();
});
