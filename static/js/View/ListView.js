(function(App) {

    function ListView(opts) {

        var view =          new App.View({ el: opts.el }),
            collection =    opts.collection,
            ItemView =      opts.itemView,
            el =            view.el;

        view.add = function add(model) {

            var itemView = new ItemView({ model: model });

            collection.push(itemView);
            el.append(itemView.render().el);
            itemView.bindControls();

        };

        return view;
    }

    App.ListView = ListView;

} (App));

