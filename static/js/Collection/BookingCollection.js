(function(App) {

    function BookingCollection(items) {
        var collection = new App.Collection(items);

        return collection;
    }

    App.BookingCollection = BookingCollection;

} (App));
