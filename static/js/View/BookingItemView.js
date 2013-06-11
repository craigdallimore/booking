(function(App) {

    function BookingItemView(config) {

        config.template =   App.Template.BookingItem;
        config.tagName =    'tr';

        var view =  new App.View(config),
            model = view.model;

        view.bindControls = function bindControls() {

            var select = view.el.querySelector('select');

            $(select).on('change', function() {
                model.set({ 'status': select.value });
                App.publish('status:update');
            });

        };

        return view;

    }

    App.BookingItemView = BookingItemView;

} (App));
