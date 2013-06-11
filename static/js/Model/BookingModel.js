(function(App) {

    function BookingModel(attrs) {
        attrs.status = attrs.status || 'Not arrived';
        return new App.Model(attrs);
    }

    App.BookingModel = BookingModel;

} (App));

