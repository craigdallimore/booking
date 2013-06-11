(function(App) {

    var Template = {
        BookingItem: function(JSON) {
            var frag = document.createDocumentFragment(),
                span = document.createElement('span');
                span.textContent = JSON.first_name + ' ' + JSON.last_name;
                frag.appendChild(span);
            return frag;
        }
    };

    App.Template = Template;

} (App));
