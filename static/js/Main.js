(function(App, $) {

    function init() {

        var bookingCollection = new App.Collection(),
            bookingStore =      new App.DataStore('booking'),
            partyModel =        new App.PartyModel(),
            tabsModel =         new App.TabsModel(),

            formView = new App.FormView({
                el: $('#booking form'),
                model: partyModel
            }),

            tabsView = new App.TabsView({
                el: $('#tabs'),
                model: tabsModel
            }),

            listView = new App.ListView({
                el: $('#listings tbody'),
                collection: bookingCollection,
                itemView: App.BookingItemView
            });

        // Config

        tabsModel.set({
            'tabs': {
                'booking': 'visible',
                'listings': 'hidden'
            }
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
        tabsView.bindTabs();
        tabsView.refreshTabs();
        bookingStore.getItems().forEach(addBooking);

        // Mediation

        function addBooking(attrs) {
            listView.add(new App.BookingModel(attrs));
        }

        function onNewParty(_, attrs) {
            formView.resetForm();
            tabsView.indicateNewItem();
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

        function onTabClick(_, tabName) {
            tabsModel.changeTab(tabName);
        }

        function onTabChange() {
            tabsView.refreshTabs();
        }

        App.subscribe('newParty', onNewParty);
        App.subscribe('status:update', onStatusUpdate);
        App.subscribe('tab:click', onTabClick);
        App.subscribe('tab:change', onTabChange);
    }

    App.init = init;

} (App, jQuery));

$('document').ready(function() {
    App.init();
});
