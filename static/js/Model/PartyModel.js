(function(App) {

    function PartyModel() {

        var model = new App.Model();

        model.save = function save(_, attrs) {

            if (!model.validate(attrs)) return;
            App.publish('newParty', [attrs]);

        };

        model.validate = function validate(attrs) {

            var fields = model.get('fields'),
                valid = true;

            for (var field in fields) {
                if(! model.validateField(field, attrs[field])) {
                    valid = false;
                }
            }

            return valid;

        };

        model.validateField = function validateField(field, value) {

            var fields = model.get('fields');

            if (!fields[field]) return false;

            if (fields[field].required && !value) {
                App.publish('validationError:' + field, field + ' is required but empty' );
                return false;
            }

            return true;

        };

        App.subscribe('submit:party', model.save);

        return model;

    }

    App.PartyModel = PartyModel;

} (App));
