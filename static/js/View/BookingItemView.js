(function(App) {

    function BookingItemView(config) {

        config.template = App.Template.BookingItem;
        config.tagName = 'li';

        return new App.View(config);


    }

    App.BookingItemView = BookingItemView;

} (App));
