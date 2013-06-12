(function(App) {

    function TabsView(opts) {

        var view =  new App.View(opts),
            model = view.model,
            el =    view.el;

            view.bindTabs = function bindTabs() {
                view.el.find('li').each(view.bindTab);
            };

            view.bindTab = function bindTab(_, tabEl) {
                $(tabEl).on('click', view.onTabClick);
            };

            view.onTabClick = function onTabClick(e) {
                e.preventDefault();
                var id = e.target.href.split('#')[1];
                App.publish('tab:click', [id]);
            };

            view.refreshTabs = function refreshTabs() {

                var tabs = model.get('tabs'),
                    tabEl = '';

                $('.current').removeClass();
                $('.newItem').removeClass();

                for (var tab in tabs) {

                    tabEl = document.getElementById(tab);

                    if (tabs[tab] === 'visible') {
                        tabEl.style.display = 'block';
                        $('a[href$="' + tab + '"]').addClass('current');
                    } else {
                        tabEl.style.display = 'none';
                    }

                }
            };

            view.indicateNewItem = function indicateNewItem() {
                view.el.find('a[href$="#listings"]').parent('li').addClass('newItem');
            };

        return view;
    }

    App.TabsView = TabsView;

} (App));



