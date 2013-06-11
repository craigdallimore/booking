(function(App) {

    function DataStore(storeName) {
        this.storeName = storeName;
    }

    DataStore.prototype.add = function set(item) {

        var storeName = this.storeName;

        if (Modernizr.localstorage) {

            var items = localStorage.getItem(storeName) ? JSON.parse(localStorage.getItem(storeName))  :  [];
            items.push(item);
            localStorage.setItem(storeName, JSON.stringify(items));

            return items;
        }

        return [];

    };

    DataStore.prototype.setItems = function setItems(items) {

        var storeName = this.storeName;

        if (Modernizr.localstorage) {
            localStorage.setItem(storeName, JSON.stringify(items));
            return items;
        }

        return [];
    };

    DataStore.prototype.getItems = function getItems() {

        var storeName = this.storeName;

        if (Modernizr.localstorage && localStorage.getItem(storeName)) {
            return JSON.parse(localStorage.getItem(storeName));
        }

        return [];

    };

    App.DataStore = DataStore;

} (App));
