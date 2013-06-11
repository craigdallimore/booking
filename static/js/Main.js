(function(App, $) {

    function init() {

        var bookingCollection = new App.Collection(),
            bookingStore =      new App.DataStore('booking'),
            partyModel =        new App.PartyModel(),

            formView = new App.FormView({
                el: $('#booking form'),
                model: partyModel
            }),

            tabsView = new App.TabsView({
                el: $('#tabs')
            }),

            listView = new App.ListView({
                el: $('#listings tbody'),
                collection: bookingCollection,
                itemView: App.BookingItemView
            });

        partyModel.set({
            'fields': {
                'first_name':   { required: true },
                'last_name':    { required: true },
                'dining_date':  { required: true, type: 'date' },
                'num_covers':   { required: true, type: 'number' },
                'phone':        { required: true },
                'email':        { required: true, type: 'email' },
            }
        });

        formView.bindErrors();
        formView.el.find('#dining_date').datepicker();

        bookingStore.getItems().forEach(addBooking);

        function addBooking(attrs) {
            listView.add(new App.BookingModel(attrs));
        }

        function onNewParty(_, attrs) {
            formView.resetForm();
            bookingStore.add(attrs);
            addBooking(attrs);
        }

        function onStatusUpdate() {
            var items = [];
            bookingCollection.forEach(function(bookingView) {
                items.push(bookingView.model.toJSON());
            });
            bookingStore.setItems(items);
        }

        App.subscribe('newParty', onNewParty);
        App.subscribe('status:update', onStatusUpdate);
    }

    App.init = init;

} (App, jQuery));

$('document').ready(function() {
    App.init();
});
