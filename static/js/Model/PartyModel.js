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

            if (!valid) {
                App.publish('validationError');
            }

            return valid;

        };

        model.validateField = function validateField(field, value) {

            var fields = model.get('fields'),
                valid = true;

            if (!fields[field]) return false;

            if (fields[field].required && !value) {
                App.publish('validationError:' + field, 'This field is required but empty' );
                valid = false;
            }

            if (fields[field].type) {

                switch(fields[field].type) {

                    case 'number':
                        if (! /^\d+$/.test(value)) {
                            App.publish('validationError:' + field, 'This field expects a number');
                            valid = false;
                        }
                        break;

                    case 'date':
                        if (! /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(value)) {
                            App.publish('validationError:' + field, 'This field expects a date in this format: dd/mm/yyyy');
                            valid = false;
                        }
                        break;

                    case 'email':
                        // http://davidcel.is/blog/2012/09/06/stop-validating-email-addresses-with-regex/
                        if (! /@/.test(value)) {
                            App.publish('validationError:' + field, 'This field expects an email address');
                            valid = false;
                        }
                        break;
                }
            }

            return valid;

        };

        App.subscribe('submit:party', model.save);

        return model;

    }

    App.PartyModel = PartyModel;

} (App));
