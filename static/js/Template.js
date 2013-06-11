(function(App) {

    var Template = {
        BookingItem: function(JSON) {

            function createTD(textContent) {
                var td = document.createElement('td');
                td.textContent = textContent;
                return td;
            }

            var frag =          document.createDocumentFragment();
            var select =        document.createElement('select');
            var optNotArrived = document.createElement('option');
            var optSeated =     document.createElement('option');
            var selTD =         document.createElement('td');
            optNotArrived.value = optNotArrived.textContent = 'Not Arrived';
            optSeated.value = optSeated.textContent = 'Seated';

            select.appendChild(optNotArrived);
            select.appendChild(optSeated);

            select.value = JSON.status;

            selTD.appendChild(select);

            frag.appendChild(selTD);
            frag.appendChild(createTD(JSON.first_name));
            frag.appendChild(createTD(JSON.last_name));
            frag.appendChild(createTD(JSON.dining_date));
            frag.appendChild(createTD(JSON.num_covers));
            frag.appendChild(createTD(JSON.phone));
            frag.appendChild(createTD(JSON.email));

            return frag;
        }
    };

    App.Template = Template;

} (App));
