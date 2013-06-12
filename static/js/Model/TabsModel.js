(function(App) {

    function TabsModel(opts) {
        var model = new App.Model(opts);

        model.changeTab = function changeTab(tabName) {
            var tabs = model.get('tabs');

            console.log('change tab', tabName);

            for (var tab in tabs) {
                tabs[tab] = (tab === tabName) ? 'visible' : 'hidden';
            }

            App.publish('tab:change');

        };

        return model;
    }

    App.TabsModel = TabsModel;





} (App));
