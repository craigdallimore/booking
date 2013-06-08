(function(App) {

    function FormView(opts) {
        var view = new App.View(opts),
            el = view.el;

            el.on('submit', function(e) {
                e.preventDefault();

                console.log('submit prevented');

            });
        return view;
    }

    App.FormView = FormView;

} (App));
