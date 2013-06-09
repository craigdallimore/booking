(function(App) {

    function FormView(opts) {

        var view = new App.View(opts),
            model = view.model,
            el = view.el;

            view.getFieldValues = function getFieldValues() {

                var fields = model.get('fields'),
                    values = {};

                for(var field in fields) {
                    values[field] = el.find('#' + field).val();
                }

                return values;

            };

            view.bindErrors = function bindErrors() {

                var fields = model.get('fields');

                for(var field in fields) {
                    var $field = el.find('#' + field);
                    view.bindError(field, $field);
                }

            };

            view.bindError = function bindError(field, $field) {

                App.subscribe('validationError:' + field, function(_, errorMessage) {

                    var $errMsg = $('<span>', { 'class': 'fieldError' });
                    $errMsg.text(errorMessage);

                    $field.addClass('error').after($errMsg);
                });

            };

            view.clearErrors = function clearErrors() {
                el.find('.error').removeClass('error');
                el.find('.fieldError').remove();
            };

            el.on('submit', function(e) {
                e.preventDefault();
                var values = view.getFieldValues();
                view.clearErrors();
                App.publish('submit:party', [values]);
            });

            el.attr('novalidate', true);

        return view;
    }

    App.FormView = FormView;

} (App));
